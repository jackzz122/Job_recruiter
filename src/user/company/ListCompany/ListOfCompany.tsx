import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Grid2";
import { CardItemCompanyList } from "../../job/components/Card/CardItemCompanyList";
import { useGetCompanyQuery } from "../../../redux/feature/company/companyApiSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import { alpha } from "@mui/material";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import BusinessIcon from "@mui/icons-material/Business";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState, useMemo } from "react";
import { colorButtonOrange } from "../../../themeContext";
import { PendingStatus } from "../../../types/PendingStatus";
import { useSearchParams } from "react-router-dom";
import { useGetMajorsQuery } from "../../../redux/feature/major/majorApiSlice";

const COMPANY_SIZES = [
  { label: "All Sizes", value: "" },
  { label: "1-10 employees", value: "1-10" },
  { label: "11-50 employees", value: "11-50" },
  { label: "51-200 employees", value: "51-200" },
  { label: "201-500 employees", value: "201-500" },
  { label: "500+ employees", value: "500+" },
];

export const ListOfCompany = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: companyList, isLoading } = useGetCompanyQuery();
  const { data: majors } = useGetMajorsQuery();
  const [showFilters, setShowFilters] = useState(false);

  // Get values from URL params with defaults
  const searchQuery = searchParams.get("search") || "";
  const selectedSize = searchParams.get("size") || "";
  const selectedTechnology = searchParams.get("technology") || "";
  const selectedOvertime = searchParams.get("overtime") || "";

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

  const handleSizeChange = (value: string) => {
    setSearchParams((prev) => {
      if (value) {
        prev.set("size", value);
      } else {
        prev.delete("size");
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

  const handleOvertimeChange = (value: string) => {
    setSearchParams((prev) => {
      if (value) {
        prev.set("overtime", value);
      } else {
        prev.delete("overtime");
      }
      return prev;
    });
  };

  const handleClearFilters = () => {
    setSearchParams({});
    setShowFilters(true);
  };

  const filteredCompanies = useMemo(() => {
    if (!companyList?.data) return [];

    return companyList.data.filter((company) => {
      // Basic status filter
      if (company.status !== PendingStatus.APPROVED) return false;

      // Search term filter
      const searchTermLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        company.companyName.toLowerCase().includes(searchTermLower) ||
        company.address.toLowerCase().includes(searchTermLower) ||
        company.keySkills.some((skill) =>
          skill.value.toLowerCase().includes(searchTermLower)
        );

      // Company size filter
      const matchesSize =
        selectedSize === "" ||
        (() => {
          const companySizeStr = company.description?.[0]?.companySize;
          if (!companySizeStr) return false;

          // Get the first number from the string (e.g., "51" from "51 - 200 employees")
          const companySize = parseInt(
            companySizeStr.toString().split("-")[0].trim()
          );
          if (isNaN(companySize)) return false;

          const [min, max] = selectedSize.split("-").map(Number);
          if (selectedSize === "500+") return companySize >= 500;
          return companySize >= min && companySize <= max;
        })();

      // Technology filter
      const matchesTechnology =
        selectedTechnology === "" ||
        company.keySkills.some((skill) => skill.value === selectedTechnology);

      // Overtime filter
      const matchesOvertime =
        selectedOvertime === "" ||
        (selectedOvertime === "yes" && company.overTime) ||
        (selectedOvertime === "no" && !company.overTime);

      return (
        matchesSearch && matchesSize && matchesTechnology && matchesOvertime
      );
    });
  }, [
    companyList,
    searchQuery,
    selectedSize,
    selectedTechnology,
    selectedOvertime,
  ]);

  const listOfCompany = filteredCompanies.map((company) => (
    <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={company._id}>
      <CardItemCompanyList company={company} />
    </Grid2>
  ));

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <BusinessIcon sx={{ fontSize: 32, color: colorButtonOrange }} />
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colorButtonOrange }}
          >
            Companies
          </Typography>
        </Stack>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          Discover and connect with top companies in your industry
        </Typography>

        {/* Search and Filter Section */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
            borderRadius: 2,
          }}
        >
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "white",
                    height: 48,
                    "&:hover fieldset": {
                      borderColor: "primary.main",
                    },
                  },
                }}
              />
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={() => setShowFilters(!showFilters)}
                sx={{
                  height: 48,
                  borderColor: colorButtonOrange,
                  color: colorButtonOrange,
                  "&:hover": {
                    borderColor: colorButtonOrange,
                    backgroundColor: "rgba(255, 152, 0, 0.04)",
                  },
                }}
              >
                Filters
              </Button>
            </Stack>

            {/* Filter Options */}
            {showFilters && (
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel>Company Size</InputLabel>
                  <Select
                    value={selectedSize}
                    label="Company Size"
                    onChange={(e) => handleSizeChange(e.target.value)}
                  >
                    {COMPANY_SIZES.map((size) => (
                      <MenuItem key={size.value} value={size.value}>
                        {size.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 200 }}>
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

                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel>Overtime</InputLabel>
                  <Select
                    value={selectedOvertime}
                    label="Overtime"
                    onChange={(e) => handleOvertimeChange(e.target.value)}
                  >
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </FormControl>

                {(searchQuery ||
                  selectedSize ||
                  selectedTechnology ||
                  selectedOvertime) && (
                  <Button
                    variant="outlined"
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
                    Clear Filters
                  </Button>
                )}
              </Stack>
            )}
          </Stack>
        </Paper>
      </Box>

      {/* Companies Grid */}
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
          }}
        >
          <CircularProgress size={60} thickness={4} />
        </Box>
      ) : (
        <Grid2 container spacing={2}>
          {listOfCompany}
        </Grid2>
      )}

      {/* No Results State */}
      {!isLoading && listOfCompany.length === 0 && (
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
          <BusinessIcon
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
            No Companies Found
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
            {searchQuery ||
            selectedSize ||
            selectedTechnology ||
            selectedOvertime
              ? "We couldn't find any companies matching your criteria. Try adjusting your filters or search terms."
              : "There are no active company listings at the moment. Please check back later."}
          </Typography>
          {(searchQuery ||
            selectedSize ||
            selectedTechnology ||
            selectedOvertime) && (
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
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
    </Container>
  );
};
