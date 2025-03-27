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
// import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FilterIcon from "@mui/icons-material/FilterList";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";

import { useState } from "react";
import { colorButtonOrange } from "../../themeContext";

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  appliedDate: string;
  status: "active" | "blocked" | "pending";
  position: string;
  experience: string;
  avatar?: string;
}

const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "0123456789",
    appliedDate: "2024-03-15",
    status: "active",
    position: "Frontend Developer",
    experience: "3 years",
    avatar: "https://mui.com/static/images/avatar/1.jpg",
  },

  // Add more mock data...
];

export const CandidateManagement = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(
    null
  );

  const handleActionClick = (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedCandidate(id);
  };

  const handleActionClose = () => {
    setAnchorEl(null);
    setSelectedCandidate(null);
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
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ color: colorButtonOrange }}
        gutterBottom
      >
        Candidate Management
      </Typography>

      {/* Filters and Search */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ mb: 3, mt: 2 }}
        alignItems="center"
      >
        <TextField
          placeholder="Search candidates..."
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
            startAdornment={<FilterIcon sx={{ mr: 1 }} />}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="blocked">Blocked</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Table */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Candidate</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Applied Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockCandidates.map((candidate) => (
              <TableRow key={candidate.id} hover>
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={candidate.avatar} />
                    <Box>
                      <Typography variant="subtitle2">
                        {candidate.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ID: {candidate.id}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>{candidate.position}</TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2">{candidate.email}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {candidate.phone}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{candidate.appliedDate}</TableCell>
                <TableCell>
                  <Chip
                    label={candidate.status}
                    color={getStatusColor(candidate.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{candidate.experience}</TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={(e) => handleActionClick(e, candidate.id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={mockCandidates.length}
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
          Approve
        </MenuItem>
        <MenuItem onClick={handleActionClose}>
          <BlockIcon sx={{ mr: 1 }} color="warning" />
          Block
        </MenuItem>
        <MenuItem onClick={handleActionClose}>
          <DeleteIcon sx={{ mr: 1 }} color="error" />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};
