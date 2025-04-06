import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { colorButtonOrange } from "../../themeContext";

export const RecruiterManagement = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

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
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
        <TextField
          placeholder="Search recruiters..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300 }}
        />
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `text-white font-bold p-2 border border-orange-500 bg-orange-500 rounded-lg`
              : `text-gray`
          }
          end
          to="."
        >
          Pending
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `text-white font-bold p-2 border border-orange-500 bg-orange-500 rounded-lg`
              : `text-gray`
          }
          to="approved"
        >
          Approved
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `text-white font-bold p-2 border border-orange-500 bg-orange-500 rounded-lg  `
              : `text-gray`
          }
          to="blocked"
        >
          Blocked
        </NavLink>
      </Stack>

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
          <Outlet />
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
    </Box>
  );
};
