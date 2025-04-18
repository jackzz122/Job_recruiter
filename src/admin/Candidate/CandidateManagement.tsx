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
import { useState } from "react";
import { colorButtonOrange } from "../../themeContext";
import { CandidateItem } from "./CandidateItem";
import { useGetAllUsersQuery } from "../../redux/feature/user/userApiSlice";

export type Candidate = {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdDate: string;

  avatar?: string;
  role: string;
};

export const CandidateManagement = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: user } = useGetAllUsersQuery();
  const listOfUser = user?.data.map((user) => {
    return <CandidateItem key={user._id} candidate={user} />;
  });
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
      <form>
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
            sx={{ width: 300 }}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: colorButtonOrange }}
          >
            Search
          </Button>
        </Stack>
      </form>

      {/* Table */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>PhoneNumber</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{listOfUser}</TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={user?.data.length || 0}
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
