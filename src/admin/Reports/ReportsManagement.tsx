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
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import { colorButtonOrange } from "../../themeContext";
import { ReportItem } from "./components/ReportItem";
import { useGetReportsQuery } from "../../redux/feature/report/reportApiSlice";
import { CircularProgress } from "@mui/material";

export const ReportsManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [reportType, setReportType] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleReportTypeChange = (event: SelectChangeEvent) => {
    setReportType(event.target.value);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
  };

  const { data: reportList, isLoading, isError } = useGetReportsQuery();
  return (
    <Box sx={{ p: 3 }}>
      <Typography
        sx={{ color: colorButtonOrange }}
        variant="h5"
        fontWeight="bold"
        gutterBottom
      >
        Reports Management
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <TextField
          placeholder="Search reports..."
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ width: 300 }}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <Select
            value={reportType}
            onChange={handleReportTypeChange}
            startAdornment={<FilterListIcon sx={{ mr: 1 }} />}
          >
            <MenuItem value="all">All Reports</MenuItem>
            <MenuItem value="job">Job Reports</MenuItem>
            <MenuItem value="company">Company Reports</MenuItem>
            <MenuItem value="comment">Comment Reports</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <Select
            value={statusFilter}
            onChange={handleStatusChange}
            startAdornment={<FilterListIcon sx={{ mr: 1 }} />}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="resolved">Resolved</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Reports Table */}
      {isError && <Typography>Error fetching reports</Typography>}
      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Reported By</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Target</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportList?.data?.map((report) => {
                return <ReportItem key={report._id} report={report} />;
              })}
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
      )}
    </Box>
  );
};
