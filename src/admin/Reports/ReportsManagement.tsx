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
import { useState, useMemo } from "react";
import { colorButtonOrange } from "../../themeContext";
import { ReportItem } from "./components/ReportItem";
import { useGetReportsQuery } from "../../redux/feature/report/reportApiSlice";
import { CircularProgress } from "@mui/material";
import { statusTypeReport } from "../../types/ReportType";

export const ReportsManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [reportType, setReportType] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data: reportList, isLoading, isError } = useGetReportsQuery();
  const filteredReports = useMemo(() => {
    if (!reportList?.data) return [];

    return reportList.data.filter((report) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        report.accountId?.fullname?.toLowerCase().includes(searchLower) ||
        report.accountId?.email?.toLowerCase().includes(searchLower) ||
        report.target_id?.email?.toLowerCase().includes(searchLower) ||
        report.reason.reasonTitle.toLowerCase().includes(searchLower);

      const matchesType =
        reportType === "all" ||
        (reportType === "job" && report.target_type === "jobPosting") ||
        (reportType === "company" && report.target_type === "companyInfo") ||
        (reportType === "comment" && report.target_type === "comment");

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "pending" &&
          report.status === statusTypeReport.PENDING) ||
        (statusFilter === "resolved" &&
          report.status === statusTypeReport.RESOLVED) ||
        (statusFilter === "rejected" &&
          report.status === statusTypeReport.REJECTED);

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [reportList?.data, searchQuery, reportType, statusFilter]);

  const paginatedReports = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredReports.slice(start, start + rowsPerPage);
  }, [filteredReports, page, rowsPerPage]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleReportTypeChange = (event: SelectChangeEvent) => {
    setReportType(event.target.value);
    setPage(0);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
    setPage(0);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
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
          placeholder="Search by name, email, or reason..."
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            },
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
        <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
          <CircularProgress />
        </Box>
      ) : filteredReports.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography color="text.secondary">
            {searchQuery || reportType !== "all" || statusFilter !== "all"
              ? "No reports found matching your filters"
              : "No reports found"}
          </Typography>
        </Paper>
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
              {paginatedReports.map((report) => (
                <ReportItem key={report._id} report={report} />
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredReports.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
    </Box>
  );
};
