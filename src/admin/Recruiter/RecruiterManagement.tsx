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
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FilterListIcon from "@mui/icons-material/FilterList";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useState } from "react";
import { colorButtonOrange } from "../../themeContext";
import { useGetPendingListQuery } from "../../redux/feature/pending/pendingApiSlice";
import { PendingItem } from "./PendingItem";
import { CircularProgress } from "@mui/material";

export const RecruiterManagement = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: pendingList, isLoading } = useGetPendingListQuery();
  const getPending = pendingList?.map((pending) => {
    return <PendingItem key={pending._id} {...pending} />;
  });

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

      <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
        <TextField
          placeholder="Search recruiters..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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

      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress size="3rem" />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Recruiter</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{getPending}</TableBody>
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
      )}
    </Box>
  );
};
