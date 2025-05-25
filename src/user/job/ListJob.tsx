import { useState } from "react";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Grid2 from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { CardJob } from "./components/Card/CardJob";
import { useGetAllJobsQuery } from "../../redux/feature/job/jobApiSlice";
import { colorButtonOrange } from "../../themeContext";
import { statusCompany, statusJob } from "../../types/JobType";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { CompanyType } from "../../types/CompanyType";

const LOCATIONS = ["Remote", "New York, NY", "San Francisco, CA", "Boston, MA"];
const EXPERIENCE_LEVELS = ["Entry Level", "Mid Level", "Senior Level"];
const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

export const ListJob = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedExperience, setSelectedExperience] = useState<string>("");
  const [selectedJobType, setSelectedJobType] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  const { data: jobList, isLoading, isError } = useGetAllJobsQuery();
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography
          variant="h4"
          component="h1"
          fontWeight="bold"
          sx={{ color: colorButtonOrange }}
          gutterBottom
        >
          Find Your Dream Job
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Discover opportunities that match your skills and career goals
        </Typography>
      </Box>

      {/* Search and Filter Bar */}
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Grid2 container spacing={2}>
            {/* Search */}
            <Grid2 size={{ xs: 12, md: 9 }}>
              <TextField
                fullWidth
                placeholder="Search jobs by title, skill or company"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid2>

            {/* Filter Button */}
            <Grid2 size={{ xs: 12, md: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                startIcon={<FilterIcon />}
                onClick={() => setShowFilters(!showFilters)}
                sx={{
                  height: "100%",
                  border: `1px solid ${colorButtonOrange}`,
                  color: colorButtonOrange,
                }}
              >
                Filters
              </Button>
            </Grid2>
          </Grid2>

          {/* Filter Options */}
          {showFilters && (
            <Box mt={3}>
              <Grid2 container spacing={3}>
                {/* Location Filter */}
                <Grid2 size={{ xs: 12, md: 4 }}>
                  <FormControl fullWidth>
                    <InputLabel id="location-select-label">Location</InputLabel>
                    <Select
                      labelId="location-select-label"
                      value={selectedLocation}
                      label="Location"
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                      <MenuItem value="">All Locations</MenuItem>
                      {LOCATIONS.map((location) => (
                        <MenuItem key={location} value={location}>
                          {location}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid2>

                {/* Experience Level Filter */}
                <Grid2 size={{ xs: 12, md: 4 }}>
                  <FormControl fullWidth>
                    <InputLabel id="experience-select-label">
                      Experience Level
                    </InputLabel>
                    <Select
                      labelId="experience-select-label"
                      value={selectedExperience}
                      label="Experience Level"
                      onChange={(e) => setSelectedExperience(e.target.value)}
                    >
                      <MenuItem value="">All Experience Levels</MenuItem>
                      {EXPERIENCE_LEVELS.map((level) => (
                        <MenuItem key={level} value={level}>
                          {level}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid2>

                {/* Job Type Filter */}
                <Grid2 size={{ xs: 12, md: 4 }}>
                  <FormControl fullWidth>
                    <InputLabel id="job-type-select-label">Job Type</InputLabel>
                    <Select
                      labelId="job-type-select-label"
                      value={selectedJobType}
                      label="Job Type"
                      onChange={(e) => setSelectedJobType(e.target.value)}
                    >
                      <MenuItem value="">All Job Types</MenuItem>
                      {JOB_TYPES.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid2>
              </Grid2>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Job Listings */}
      {isError && <Typography>Error</Typography>}
      {isLoading && <Typography>Loading</Typography>}
      {jobList && (
        <Stack spacing={3}>
          {jobList.data.filter(
            (job) =>
              job.status === statusJob.OnGoing &&
              (job.companyId as CompanyType).status === statusCompany.APPROVED
          ).length > 0 ? (
            jobList.data
              .filter(
                (job) =>
                  job.status === statusJob.OnGoing &&
                  (job.companyId as CompanyType).status ===
                    statusCompany.APPROVED
              )
              .map((job) => <CardJob key={job._id} job={job} />)
          ) : (
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 8,
                px: 2,
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                minHeight: "400px",
              }}
            >
              <WorkOutlineIcon
                sx={{
                  fontSize: 80,
                  color: colorButtonOrange,
                  opacity: 0.5,
                  mb: 3,
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  color: "text.primary",
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                No Jobs Found
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  textAlign: "center",
                  maxWidth: "400px",
                  mb: 3,
                }}
              >
                We couldn't find any jobs matching your criteria. Try adjusting
                your filters or search terms.
              </Typography>
              <Button
                variant="outlined"
                startIcon={<FilterIcon />}
                onClick={() => setShowFilters(true)}
                sx={{
                  borderColor: colorButtonOrange,
                  color: colorButtonOrange,
                  "&:hover": {
                    borderColor: colorButtonOrange,
                    backgroundColor: "rgba(255, 152, 0, 0.04)",
                  },
                }}
              >
                Adjust Filters
              </Button>
            </Card>
          )}
        </Stack>
      )}

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={10}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};
