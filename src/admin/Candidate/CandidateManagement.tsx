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
import { useMemo } from "react";
import { colorButtonOrange } from "../../themeContext";
import { CandidateItem } from "./CandidateItem";
import { useGetAllUsersQuery } from "../../redux/feature/user/userApiSlice";
import { RoleName } from "../../types/UserType";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useSearchParams } from "react-router-dom";

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
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 0;
  const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 10;
  const searchTerm = searchParams.get("search") || "";
  const selectedRole = searchParams.get("role") || "all";
  const selectedStatus = searchParams.get("status") || "all";

  const { data: user } = useGetAllUsersQuery();

  const filteredUsers = useMemo(() => {
    if (!user?.data) return [];

    return user.data.filter((candidate) => {
      // Filter out admin users
      if (candidate.role === RoleName.ADMIN) return false;

      // Search term filter
      const matchesSearch =
        searchTerm === "" ||
        candidate.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.phone?.toLowerCase().includes(searchTerm.toLowerCase());

      // Role filter
      const matchesRole =
        selectedRole === "all" || candidate.role === selectedRole;

      // Status filter
      const matchesStatus =
        selectedStatus === "all" || candidate.statusAccount === selectedStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [user?.data, searchTerm, selectedRole, selectedStatus]);

  const paginatedUsers = useMemo(() => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredUsers.slice(start, end);
  }, [filteredUsers, page, rowsPerPage]);

  const listOfUser = paginatedUsers.map((user) => (
    <CandidateItem key={user._id} candidate={user} />
  ));

  const handlePageChange = (_: unknown, newPage: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", newPage.toString());
    setSearchParams(newParams);
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("rowsPerPage", e.target.value);
    newParams.set("page", "0");
    setSearchParams(newParams);
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
          placeholder="Search by name, email, or phone..."
          size="small"
          value={searchTerm}
          onChange={(e) => {
            const newParams = new URLSearchParams(searchParams.toString());
            newParams.set("search", e.target.value);
            newParams.set("page", "0");
            setSearchParams(newParams);
          }}
          sx={{ width: 300 }}
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Role</InputLabel>
          <Select
            value={selectedRole}
            label="Role"
            onChange={(e) => {
              const newParams = new URLSearchParams(searchParams.toString());
              newParams.set("role", e.target.value);
              setSearchParams(newParams);
            }}
          >
            <MenuItem value="all">All Roles</MenuItem>
            <MenuItem value={RoleName.GUEST}>Candidate</MenuItem>
            <MenuItem value={RoleName.RECRUIT}>Recruiter</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={selectedStatus}
            label="Status"
            onChange={(e) => {
              const newParams = new URLSearchParams(searchParams.toString());
              newParams.set("status", e.target.value);
              setSearchParams(newParams);
            }}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="approve">Approve</MenuItem>
            <MenuItem value="blocked">Blocked</MenuItem>
          </Select>
        </FormControl>
      </Stack>

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
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{listOfUser}</TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </TableContainer>
    </Box>
  );
};
