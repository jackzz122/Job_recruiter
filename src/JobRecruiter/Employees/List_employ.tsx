import { useState, useMemo, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";

import { colorButtonOrange, styleButton } from "../../themeContext";

import { ContainerBox } from "../component/ContainerBox";
import { EmployeeItem } from "./EmployeeItem";
import { useGetCandidateJobPosingListQuery } from "../../redux/feature/job/jobApiSlice";
import { selectUser } from "../../redux/feature/user/userSlice";
import { useSelector } from "react-redux";
import { CompanyType } from "../../types/CompanyType";

const ITEMS_PER_PAGE = 5;

const List_employ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const user = useSelector(selectUser);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const {
    data: jobPosingInfo,
    isLoading,
    refetch,
  } = useGetCandidateJobPosingListQuery(
    (user?.companyId as CompanyType)?._id || "",
    {
      skip: !user?.companyId,
    }
  );

  useEffect(() => {
    if (user?.companyId) {
      refetch();
    }
  }, [user?.companyId, refetch]);

  const filteredJobPostings = useMemo(() => {
    if (!jobPosingInfo?.data) return [];

    return jobPosingInfo.data
      .filter(
        (job) =>
          job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.listAccount.some((account) =>
            account.fullname?.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
      .sort((a, b) => {
        const dateA = new Date(a.listAccount[0]?.appliedAt || 0).getTime();
        const dateB = new Date(b.listAccount[0]?.appliedAt || 0).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
  }, [jobPosingInfo?.data, searchQuery, sortOrder]);

  // Calculate paginated items
  const paginatedJobPostings = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return filteredJobPostings.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredJobPostings, page]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <ContainerBox>
      <Stack spacing={2}>
        {/* Search and Sort */}
        <Stack direction="row" spacing={2}>
          <TextField
            label="Search"
            fullWidth
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by job title or candidate name..."
          />
          <Button
            sx={{
              backgroundColor: colorButtonOrange,
              color: "white",
              border: "none",
              minWidth: "120px",
            }}
            variant="contained"
          >
            Search
          </Button>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Button
            sx={styleButton}
            variant="outlined"
            onClick={handleSort}
            startIcon={<SortByAlphaIcon />}
          >
            Sort {sortOrder === "asc" ? "Oldest First" : "Newest First"}
          </Button>
        </Stack>

        {/* Loading State */}
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        ) : !filteredJobPostings.length ? (
          <Box sx={{ textAlign: "center", p: 4 }}>
            <Typography variant="h6">
              {searchQuery
                ? "No matching applications found"
                : "No candidate applications found"}
            </Typography>
          </Box>
        ) : (
          <>
            <Stack spacing={2}>
              {paginatedJobPostings.map((jobPosting, index) => (
                <Accordion key={jobPosting.jobId || index} defaultExpanded>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      backgroundColor: "rgba(255, 108, 48, 0.08)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 108, 48, 0.12)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <WorkOutlineIcon sx={{ color: colorButtonOrange }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {jobPosting.jobTitle}
                        </Typography>
                      </Box>
                      <Chip
                        label={`${jobPosting.listAccount.length} Applicants`}
                        size="small"
                        sx={{
                          bgcolor: "rgba(255, 108, 48, 0.1)",
                          color: colorButtonOrange,
                          fontWeight: 500,
                        }}
                      />
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 0 }}>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Application Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {jobPosting.listAccount.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={5} align="center">
                                <Typography variant="body2" sx={{ py: 2 }}>
                                  No applications for this job position yet
                                </Typography>
                              </TableCell>
                            </TableRow>
                          ) : (
                            jobPosting.listAccount.map(
                              (account, accountIndex) => (
                                <EmployeeItem
                                  key={account.accountId || accountIndex}
                                  jobId={jobPosting.jobId}
                                  account={account}
                                />
                              )
                            )
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>

            {/* Pagination */}
            {filteredJobPostings.length > ITEMS_PER_PAGE && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Pagination
                  count={Math.ceil(filteredJobPostings.length / ITEMS_PER_PAGE)}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: colorButtonOrange,
                    },
                    "& .Mui-selected": {
                      backgroundColor: `${colorButtonOrange} !important`,
                      color: "white !important",
                    },
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Stack>
    </ContainerBox>
  );
};

export default List_employ;
