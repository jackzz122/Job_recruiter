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
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";

// Icons
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";
import FlagIcon from "@mui/icons-material/Flag";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";

interface Report {
  id: string;
  type: "job" | "user" | "company" | "comment";
  reportedBy: {
    name: string;
    avatar?: string;
  };
  targetName: string;
  reason: string;
  date: string;
  status: "pending" | "resolved" | "rejected";
  priority: "high" | "medium" | "low";
}

export const ReportsManagement = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  //   const getPriorityColor = (priority: string) => {
  //     switch (priority) {
  //       case 'high':
  //         return 'error';
  //       case 'medium':
  //         return 'warning';
  //       case 'low':
  //         return 'info';
  //       default:
  //         return 'default';
  //     }
  //   };

  //   const getStatusColor = (status: string) => {
  //     switch (status) {
  //       case 'resolved':
  //         return 'success';
  //       case 'rejected':
  //         return 'error';
  //       default:
  //         return 'warning';
  //     }
  //   };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Reports Management
      </Typography>

      {/* Tabs */}
      <Tabs
        value={tabValue}
        onChange={(_, newValue) => setTabValue(newValue)}
        sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}
      >
        <Tab label="All Reports" />
        <Tab label="Job Reports" />
        <Tab label="User Reports" />
        <Tab label="Company Reports" />
        <Tab label="Comment Reports" />
      </Tabs>

      {/* Filters */}
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <TextField
          placeholder="Search reports..."
          size="small"
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
            displayEmpty
            defaultValue="all"
            startAdornment={<FilterListIcon sx={{ mr: 1 }} />}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="resolved">Resolved</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            displayEmpty
            defaultValue="all"
            startAdornment={<WarningAmberIcon sx={{ mr: 1 }} />}
          >
            <MenuItem value="all">All Priority</MenuItem>
            <MenuItem value="high">High Priority</MenuItem>
            <MenuItem value="medium">Medium Priority</MenuItem>
            <MenuItem value="low">Low Priority</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Reports Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Reported By</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Target</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover>
              <TableCell>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar src="/path-to-avatar.jpg" />
                  <Typography>John Doe</Typography>
                </Stack>
              </TableCell>
              <TableCell>
                <Chip
                  icon={<FlagIcon />}
                  label="Job Post"
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </TableCell>
              <TableCell>Frontend Developer Position</TableCell>
              <TableCell>
                <Typography noWrap sx={{ maxWidth: 200 }}>
                  Inappropriate content in job description
                </Typography>
              </TableCell>
              <TableCell>2024-03-15</TableCell>
              <TableCell>
                <Chip label="High" size="small" color="error" />
              </TableCell>
              <TableCell>
                <Chip label="Pending" size="small" color="warning" />
              </TableCell>
              <TableCell align="right">
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => {
                      setSelectedReport(null); // Add actual report data
                      setOpenDialog(true);
                    }}
                  >
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={100}
          rowsPerPage={10}
          page={0}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />
      </TableContainer>

      {/* Report Detail Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Report Details</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} sx={{ pt: 1 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Report Type
              </Typography>
              <Chip
                icon={<FlagIcon />}
                label="Job Post"
                color="primary"
                variant="outlined"
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Reported By
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src="/path-to-avatar.jpg" />
                <Box>
                  <Typography>John Doe</Typography>
                  <Typography variant="body2" color="text.secondary">
                    john@example.com
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Reported Item
              </Typography>
              <Typography>Frontend Developer Position</Typography>
              <Typography variant="body2" color="text.secondary">
                Posted by: Tech Company Inc.
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Reason for Report
              </Typography>
              <Typography>Inappropriate content in job description</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Additional Details
              </Typography>
              <Typography>
                The job posting contains discriminatory language...
              </Typography>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<BlockIcon />}
            onClick={() => setOpenDialog(false)}
          >
            Reject Report
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<CheckCircleIcon />}
            onClick={() => setOpenDialog(false)}
          >
            Take Action
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
