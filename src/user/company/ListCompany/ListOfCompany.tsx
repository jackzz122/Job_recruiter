import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Grid2";
import { CardItemCompanyList } from "../../job/components/Card/CardItemCompanyList";
import { useGetCompanyQuery } from "../../../redux/feature/company/companyApiSlice";
import { CircularProgress, InputAdornment, Paper, alpha } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BusinessIcon from "@mui/icons-material/Business";
import { useState } from "react";
import { colorButtonOrange } from "../../../themeContext";

export const ListOfCompany = () => {
  const { data: companyList, isLoading } = useGetCompanyQuery();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCompanies = companyList?.data.filter((company) =>
    company.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const listOfCompany = filteredCompanies?.map((company) => (
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

        {/* Search Section */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
            borderRadius: 2,
          }}
        >
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
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
              variant="contained"
              sx={{
                px: 3,
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              Search
            </Button>
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
      {!isLoading && filteredCompanies?.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            py: 6,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No companies found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Try adjusting your search criteria
          </Typography>
        </Box>
      )}
    </Container>
  );
};
