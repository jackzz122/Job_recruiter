import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
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
import { statusCompany, statusJob, JobResponse } from "../../types/JobType";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { CompanyType } from "../../types/CompanyType";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetMajorsQuery } from "../../redux/feature/major/majorApiSlice";

const EXPERIENCE_LEVELS = [
  { label: "All Experience Levels", value: "" },
  { label: "Entry Level (0-2 years)", value: "0-2" },
  { label: "Mid Level (2-5 years)", value: "2-5" },
  { label: "Senior Level (5+ years)", value: "5+" },
];

const SALARY_RANGES = [
  { label: "All Salary Ranges", value: "" },
  { label: "Under $50,000", value: "0-50000" },
  { label: "$50,000 - $100,000", value: "50000-100000" },
  { label: "$100,000 - $150,000", value: "100000-150000" },
  { label: "Over $150,000", value: "150000+" },
];

const PEOPLE_HIRING = [
  { label: "All Sizes", value: "" },
  { label: "1-5 people", value: "1-5" },
  { label: "6-10 people", value: "6-10" },
  { label: "11-20 people", value: "11-20" },
  { label: "20+ people", value: "20+" },
];

const JobStatus = [
  {
    label: "On Going",
    value: "ongoing",
  },
  {
    label: "Stop",
    value: "stop",
  },
];

export const ListJob = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const page = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 5;
  const searchTerm = searchParams.get("search") || "";
  const selectedExperience = searchParams.get("experience") || "";
  const selectedSalary = searchParams.get("salary") || "";
  const selectedPeople = searchParams.get("people") || "";
  const jobActive = searchParams.get("jobStatus") || "ongoing";
  const selectedTechnology = searchParams.get("technology") || "";
  const { data: majors } = useGetMajorsQuery();
  const { data: jobList, isLoading, isError } = useGetAllJobsQuery();
  const handleSearchChange = (value: string) => {
    setSearchParams((prev) => {
      if (value) {
        prev.set("search", value);
      } else {
        prev.delete("search");
      }
      return prev;
    });
  };

  const handleExperienceChange = async (value: string) => {
    setSearchParams((prev) => {
      if (value) {
        prev.set("experience", value);
      } else {
        prev.delete("experience");
      }
      return prev;
    });
  };
  const handleTechnologyChange = (value: string) => {
    setSearchParams((prev) => {
      if (value) {
        prev.set("technology", value);
      } else {
        prev.delete("technology");
      }
      return prev;
    });
  };

  const handleSalaryChange = (value: string) => {
    setSearchParams((prev) => {
      if (value) {
        prev.set("salary", value);
      } else {
        prev.delete("salary");
      }
      return prev;
    });
  };

  const handlePeopleChange = (value: string) => {
    setSearchParams((prev) => {
      if (value) {
        prev.set("people", value);
      } else {
        prev.delete("people");
      }
      return prev;
    });
  };

  const handleChangeStatus = (value: string) => {
    setSearchParams((prev) => {
      if (value) {
        prev.set("jobStatus", value);
      } else {
        prev.delete("jobStatus");
      }
      return prev;
    });
  };
  const handleClearFilters = () => {
    setSearchParams({});
    setShowFilters(true);
  };

  const filteredJobs = useMemo(() => {
    if (!jobList?.data) return [];

    return jobList.data.filter((job: JobResponse) => {
      const companyData = job.companyId as CompanyType;
      const isApprovedCompany = companyData.status === statusCompany.APPROVED;

      if (!isApprovedCompany) return false;

      // Search term filter
      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearch =
        searchTerm === "" ||
        job.title.toLowerCase().includes(searchTermLower) ||
        companyData.companyName.toLowerCase().includes(searchTermLower);

      // Experience filter
      const matchesExperience =
        selectedExperience === "" ||
        (() => {
          const exp = job.experience;
          const [min, max] = selectedExperience.split("-").map(Number);
          if (selectedExperience === "5+") return exp >= 5;
          return exp >= min && exp <= max;
        })();

      // Salary range filter
      const matchesSalary =
        selectedSalary === "" ||
        (() => {
          const avgSalary = (job.minRange + job.maxRange) / 2;
          const [min, max] = selectedSalary.split("-").map(Number);
          if (selectedSalary === "150000+") return avgSalary >= 150000;
          return avgSalary >= min && avgSalary <= max;
        })();

      // People hiring filter
      const matchesPeople =
        selectedPeople === "" ||
        (() => {
          const people = job.sizingPeople;
          const [min, max] = selectedPeople.split("-").map(Number);
          if (selectedPeople === "20+") return people >= 20;
          return people >= min && people <= max;
        })();

      const matchesTechnology =
        selectedTechnology === "" ||
        job.majorId.some((skill) => skill.value === selectedTechnology);
      //Search job Active
      const matchesJobActive =
        jobActive === "" ||
        (jobActive === "ongoing" && job.status === statusJob.OnGoing) ||
        (jobActive === "stop" && job.status === statusJob.Stop);

      return (
        matchesSearch &&
        matchesExperience &&
        matchesSalary &&
        matchesPeople &&
        matchesJobActive &&
        matchesTechnology
      );
    });
  }, [
    jobList,
    searchTerm,
    selectedExperience,
    selectedSalary,
    selectedPeople,
    jobActive,
    selectedTechnology,
  ]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setSearchParams((prev) => {
      prev.set("page", value.toString());
      return prev;
    });
  };

  const paginatedJobs = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredJobs.slice(startIndex, endIndex);
  }, [filteredJobs, page]);

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
                onChange={(e) => handleSearchChange(e.target.value)}
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
                {/* Experience Level Filter */}
                <Grid2 size={{ xs: 12, md: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel id="experience-select-label">
                      Experience Level
                    </InputLabel>
                    <Select
                      labelId="experience-select-label"
                      value={selectedExperience}
                      label="Experience Level"
                      onChange={(e) => handleExperienceChange(e.target.value)}
                    >
                      {EXPERIENCE_LEVELS.map((level) => (
                        <MenuItem key={level.value} value={level.value}>
                          {level.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid2>

                {/* Salary Range Filter */}
                <Grid2 size={{ xs: 12, md: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel id="salary-select-label">
                      Salary Range
                    </InputLabel>
                    <Select
                      labelId="salary-select-label"
                      value={selectedSalary}
                      label="Salary Range"
                      onChange={(e) => handleSalaryChange(e.target.value)}
                    >
                      {SALARY_RANGES.map((range) => (
                        <MenuItem key={range.value} value={range.value}>
                          {range.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid2>

                {/* People Hiring Filter */}
                <Grid2 size={{ xs: 12, md: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel id="people-select-label">
                      People Hiring
                    </InputLabel>
                    <Select
                      labelId="people-select-label"
                      value={selectedPeople}
                      label="People Hiring"
                      onChange={(e) => handlePeopleChange(e.target.value)}
                    >
                      {PEOPLE_HIRING.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel>Technology</InputLabel>
                    <Select
                      value={selectedTechnology}
                      label="Technology"
                      onChange={(e) => handleTechnologyChange(e.target.value)}
                    >
                      <MenuItem value="">All Technologies</MenuItem>
                      {majors?.data?.map((major) => (
                        <MenuItem key={major._id} value={major.name}>
                          {major.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel id="people-select-label">
                      Active Jobs
                    </InputLabel>
                    <Select
                      labelId="people-select-label"
                      value={jobActive}
                      label="People Hiring"
                      onChange={(e) => handleChangeStatus(e.target.value)}
                    >
                      {JobStatus.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
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
      {isError && (
        <Typography color="error" align="center" sx={{ py: 4 }}>
          Error loading jobs. Please try again later.
        </Typography>
      )}

      {isLoading && (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      )}

      {!isLoading && !isError && (
        <Stack spacing={3}>
          {filteredJobs.length > 0 ? (
            paginatedJobs.map((job) => <CardJob key={job._id} job={job} />)
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
                {searchTerm ||
                selectedExperience ||
                selectedSalary ||
                selectedPeople
                  ? "We couldn't find any jobs matching your criteria. Try adjusting your filters or search terms."
                  : "There are no active job listings at the moment. Please check back later."}
              </Typography>
              {(searchTerm ||
                selectedExperience ||
                selectedSalary ||
                selectedPeople) && (
                <Button
                  variant="outlined"
                  startIcon={<FilterIcon />}
                  onClick={handleClearFilters}
                  sx={{
                    borderColor: colorButtonOrange,
                    color: colorButtonOrange,
                    "&:hover": {
                      borderColor: colorButtonOrange,
                      backgroundColor: "rgba(255, 152, 0, 0.04)",
                    },
                  }}
                >
                  Clear All Filters
                </Button>
              )}
            </Card>
          )}
        </Stack>
      )}

      {/* Pagination */}
      {filteredJobs.length > 0 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={Math.ceil(filteredJobs.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
};
