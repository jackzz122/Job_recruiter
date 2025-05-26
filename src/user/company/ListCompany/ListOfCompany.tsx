import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Grid2";
import { CardItemCompanyList } from "../../job/components/Card/CardItemCompanyList";
import { useGetCompanyQuery } from "../../../redux/feature/company/companyApiSlice";
import {
  CircularProgress,
  InputAdornment,
  Paper,
  alpha,
  Card,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BusinessIcon from "@mui/icons-material/Business";
import { useState } from "react";
import { colorButtonOrange } from "../../../themeContext";
import { PendingStatus } from "../../../types/PendingStatus";

export const ListOfCompany = () => {
  const { data: companyList, isLoading } = useGetCompanyQuery();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCompanies = companyList?.data.filter((company) =>
    company.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const listOfCompany = filteredCompanies
    ?.filter((company) => company.status === PendingStatus.APPROVED)
    .map((company) => (
      <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={company._id}>
        <CardItemCompanyList company={company} />
      </Grid2>
    ));

  console.log("companyList", companyList);

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
      {!isLoading && listOfCompany?.length === 0 && (
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
            We couldn't find any companies matching your search. Try adjusting
            your search terms or browse all companies.
          </Typography>
          <Button
            variant="outlined"
            startIcon={<SearchIcon />}
            onClick={() => setSearchQuery("")}
            sx={{
              borderColor: colorButtonOrange,
              color: colorButtonOrange,
              "&:hover": {
                borderColor: colorButtonOrange,
                backgroundColor: "rgba(255, 152, 0, 0.04)",
              },
            }}
          >
            Clear Search
          </Button>
        </Card>
      )}
    </Container>
  );
};
