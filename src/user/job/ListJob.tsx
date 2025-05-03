import { useState } from "react";
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  FilterList as FilterIcon,
  BookmarkBorder as BookmarkIcon,
  People as PeopleIcon,
} from "@mui/icons-material";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Grid2,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Avatar,
  IconButton,
  InputAdornment,
  Pagination,
  Stack,
} from "@mui/material";

// Sample data - replace with actual data fetching
const SAMPLE_JOBS = [
  {
    _id: "1",
    title: "Senior Frontend Developer",
    location: "New York, NY",
    experience: 3,
    startDate: "2023-12-01",
    companyId: {
      companyName: "Tech Innovations Inc.",
      logo: "https://ui-avatars.com/api/?name=Tech+Innovations&background=0D8ABC&color=fff",
    },
    minRange: 80000,
    maxRange: 120000,
    description: {
      summary:
        "We're looking for an experienced frontend developer to join our team.",
    },
    majorId: [{ value: "Computer Science" }, { value: "Web Development" }],
    sizingPeople: 5,
    applicationDeadline: "2023-12-31",
  },
  {
    _id: "2",
    title: "UX/UI Designer",
    location: "Remote",
    experience: 2,
    startDate: "2023-11-15",
    companyId: {
      companyName: "Creative Solutions",
      logo: "https://ui-avatars.com/api/?name=Creative+Solutions&background=6B34BA&color=fff",
    },
    minRange: 60000,
    maxRange: 90000,
    description: {
      summary:
        "Join our design team to create beautiful and intuitive user experiences.",
    },
    majorId: [{ value: "Design" }, { value: "HCI" }],
    sizingPeople: 3,
    applicationDeadline: "2023-12-15",
  },
  {
    _id: "3",
    title: "Full Stack Developer",
    location: "San Francisco, CA",
    experience: 4,
    startDate: "2023-11-20",
    companyId: {
      companyName: "Cloud Systems",
      logo: "https://ui-avatars.com/api/?name=Cloud+Systems&background=349B34&color=fff",
    },
    minRange: 90000,
    maxRange: 140000,
    description: {
      summary:
        "Build robust full-stack applications for our growing client base.",
    },
    majorId: [{ value: "Computer Science" }, { value: "Software Engineering" }],
    sizingPeople: 8,
    applicationDeadline: "2023-12-25",
  },
];

// Filter options
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

  // Filter logic would go here if implementing actual filtering
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
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
                sx={{ height: "100%" }}
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
      <Stack spacing={3}>
        {SAMPLE_JOBS.map((job) => (
          <Card
            key={job._id}
            variant="outlined"
            sx={{ "&:hover": { boxShadow: 3 }, transition: "box-shadow 0.3s" }}
          >
            <CardContent>
              <Grid2 container>
                {/* Company Logo */}
                <Grid2
                  size={{ xs: 12, md: 1.5, sm: 2 }}
                  sx={{ pr: 2, display: "flex", alignItems: "flex-start" }}
                >
                  <Avatar
                    src={job.companyId.logo}
                    alt={`${job.companyId.companyName} logo`}
                    variant="rounded"
                    sx={{ width: 64, height: 64 }}
                  />
                </Grid2>

                {/* Job Details */}
                <Grid2 size={{ xs: 12, md: 10.5, sm: 10 }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Box>
                      <Typography variant="h6" component="h2" fontWeight="bold">
                        {job.title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        gutterBottom
                      >
                        {job.companyId.companyName}
                      </Typography>
                    </Box>
                    <IconButton aria-label="Save job">
                      <BookmarkIcon />
                    </IconButton>
                  </Box>

                  <Typography variant="body2" paragraph>
                    {job.description.summary}
                  </Typography>

                  {/* Job Metadata */}
                  <Grid2 container spacing={2} sx={{ mb: 2 }}>
                    <Grid2 size={{ sm: 4, md: 3, lg: 2, xs: 6 }}>
                      <Box display="flex" alignItems="center">
                        <LocationIcon
                          fontSize="small"
                          color="action"
                          sx={{ mr: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {job.location}
                        </Typography>
                      </Box>
                    </Grid2>

                    <Grid2 size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
                      <Box display="flex" alignItems="center">
                        <WorkIcon
                          fontSize="small"
                          color="action"
                          sx={{ mr: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {job.experience}+ years
                        </Typography>
                      </Box>
                    </Grid2>

                    <Grid2 size={{ xs: 6, sm: 4, md: 3, lg: 3 }}>
                      <Box display="flex" alignItems="center">
                        <MoneyIcon
                          fontSize="small"
                          color="action"
                          sx={{ mr: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          ${job.minRange.toLocaleString()} - $
                          {job.maxRange.toLocaleString()}
                        </Typography>
                      </Box>
                    </Grid2>

                    <Grid2 size={{ xs: 6, sm: 4, md: 3, lg: 3 }}>
                      <Box display="flex" alignItems="center">
                        <CalendarIcon
                          fontSize="small"
                          color="action"
                          sx={{ mr: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          Deadline:{" "}
                          {new Date(
                            job.applicationDeadline
                          ).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Grid2>

                    <Grid2 size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
                      <Box display="flex" alignItems="center">
                        <PeopleIcon
                          fontSize="small"
                          color="action"
                          sx={{ mr: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          Hiring {job.sizingPeople} people
                        </Typography>
                      </Box>
                    </Grid2>
                  </Grid2>

                  {/* Skills/Majors */}
                  <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                    {job.majorId.map((major, index) => (
                      <Chip
                        key={index}
                        label={major.value}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>

                  {/* Apply Button */}
                  <Box display="flex" justifyContent="flex-end">
                    <Button variant="contained" color="primary">
                      View Details
                    </Button>
                  </Box>
                </Grid2>
              </Grid2>
            </CardContent>
          </Card>
        ))}
      </Stack>

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
