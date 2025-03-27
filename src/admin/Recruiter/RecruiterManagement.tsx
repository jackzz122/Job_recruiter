import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// Icons
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FilterListIcon from "@mui/icons-material/FilterList";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import BusinessIcon from "@mui/icons-material/Business";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useState } from "react";
import { colorButtonOrange } from "../../themeContext";

// interface Recruiter {
//   id: string;
//   name: string;
//   company: string;
//   email: string;
//   phone: string;
//   joinDate: string;
//   status: "active" | "pending" | "blocked";
//   jobsPosted: number;
//   verified: boolean;
//   avatar?: string;
// }

export const RecruiterManagement = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRecruiter, setSelectedRecruiter] = useState<string | null>(
    null
  );

  const handleActionClick = (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRecruiter(id);
  };

  const handleActionClose = () => {
    setAnchorEl(null);
    setSelectedRecruiter(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "blocked":
        return "error";
      default:
        return "warning";
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography
          variant="h5"
          sx={{ color: colorButtonOrange }}
          fontWeight="bold"
        >
          Recruiter Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<VerifiedIcon />}
        >
          Verify Selected
        </Button>
      </Stack>

      {/* Filters */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
        <TextField
          placeholder="Search recruiters..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ width: 300 }}
        />

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            displayEmpty
            startAdornment={<FilterListIcon sx={{ mr: 1 }} />}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="blocked">Blocked</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Recruiter</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Join Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Jobs Posted</TableCell>
              <TableCell>Verification</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Example row */}
            <TableRow hover>
              <TableCell>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar src="/path-to-avatar.jpg" />
                  <Box>
                    <Typography variant="subtitle2">John Doe</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ID: REC123
                    </Typography>
                  </Box>
                </Stack>
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={1} alignItems="center">
                  <BusinessIcon color="action" fontSize="small" />
                  <Typography>Tech Corp</Typography>
                </Stack>
              </TableCell>
              <TableCell>
                <Box>
                  <Typography variant="body2">john@techcorp.com</Typography>
                  <Typography variant="body2" color="text.secondary">
                    +1234567890
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>2024-03-15</TableCell>
              <TableCell>
                <Chip label="Active" color="success" size="small" />
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight="medium">
                  15 Jobs
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  icon={<VerifiedIcon />}
                  label="Verified"
                  color="primary"
                  size="small"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right">
                <IconButton
                  size="small"
                  onClick={(e) => handleActionClick(e, "REC123")}
                >
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={100} // Replace with actual count
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleActionClose}
      >
        <MenuItem onClick={handleActionClose}>
          <CheckCircleIcon sx={{ mr: 1 }} color="success" />
          Verify Recruiter
        </MenuItem>
        <MenuItem onClick={handleActionClose}>
          <BlockIcon sx={{ mr: 1 }} color="warning" />
          Block Account
        </MenuItem>
        <MenuItem onClick={handleActionClose}>
          <DeleteIcon sx={{ mr: 1 }} color="error" />
          Delete Account
        </MenuItem>
      </Menu>
    </Box>
  );
};
