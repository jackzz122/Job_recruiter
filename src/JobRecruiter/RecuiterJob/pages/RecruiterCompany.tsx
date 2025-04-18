import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Search as SearchIcon,
  Add as AddIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";
import { colorButtonOrange } from "../../../themeContext";
import { ContainerBox } from "../../component/ContainerBox";
import { SingleJobModel } from "../component/SingleJobModel";
import { useGetJobPostingsQuery } from "../../../redux/feature/job/jobApiSlice";
import { JobResponse } from "../../../types/JobType";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/feature/user/userSlice";
import { CompanyType } from "../../../types/CompanyType";
export const RecruiterCompany = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search logic here
  };

  const handleCreateJob = () => {
    navigate("/recruiter/job_management/create");
  };
  const user = useSelector(selectUser);
  const { data: jobs, isLoading } = useGetJobPostingsQuery(
    (user?.companyId as CompanyType)?._id || "",
    {
      skip: !user?.companyId,
    }
  );
  return (
    <ContainerBox>
      <Stack spacing={3}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, color: colorButtonOrange }}
          >
            Job Management
          </Typography>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={handleCreateJob}
            sx={{
              backgroundColor: colorButtonOrange,
              "&:hover": { backgroundColor: colorButtonOrange, opacity: 0.9 },
            }}
          >
            Create New Job
          </Button>
        </Box>

        {/* Search */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Paper
            elevation={0}
            sx={{
              flex: 1,
              p: 2,
              display: "flex",
              alignItems: "center",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
            }}
          >
            <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
            <TextField
              fullWidth
              placeholder="Search jobs..."
              variant="standard"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              sx={{ "& .MuiInputBase-root": { fontSize: "0.875rem" } }}
            />
          </Paper>
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            sx={{
              borderColor: "divider",
              color: "text.primary",
              "&:hover": { borderColor: "primary.main", color: "primary.main" },
            }}
          >
            Filters
          </Button>
        </Box>

        {/* Jobs Grid2 */}
        <Box>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (jobs?.data as JobResponse[])?.length === 0 ? (
            <Paper
              elevation={0}
              sx={{
                p: 4,
                textAlign: "center",
                border: "1px dashed",
                borderColor: "divider",
              }}
            >
              <Typography color="text.secondary">
                No jobs found. Create your first job posting!
              </Typography>
            </Paper>
          ) : (
            <Grid2 container spacing={3}>
              {(jobs?.data as JobResponse[])?.map((job) => (
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={job._id}>
                  <SingleJobModel jobs={job} />
                </Grid2>
              ))}
            </Grid2>
          )}
        </Box>
      </Stack>
    </ContainerBox>
  );
};
