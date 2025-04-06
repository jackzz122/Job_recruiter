import { colorButtonOrange } from "../../../../themeContext";
import PeopleIcon from "@mui/icons-material/People";
import PublicIcon from "@mui/icons-material/Public";
import { Grid2, InputAdornment } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import WorkIcon from "@mui/icons-material/Work";
const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Retail",
  "Media",
  "Other",
];

const companySizes = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1000 employees",
  "1000+ employees",
];

const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "China",
  "India",
  "Vietnam",
];

export const CompanyDetailst = () => {
  return (
    <>
      <Grid2 size={{ xs: 12 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            color: colorButtonOrange,
            mb: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <WorkIcon /> Company Details
        </Typography>
        <Divider sx={{ mb: 3 }} />
      </Grid2>

      <Grid2 size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Industry</InputLabel>
          <Select
            name="industry"
            label="Industry"
            startAdornment={
              <InputAdornment position="start">
                <WorkIcon sx={{ color: colorButtonOrange }} />
              </InputAdornment>
            }
          >
            {industries.map((industry) => (
              <MenuItem key={industry} value={industry}>
                {industry}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid2>

      <Grid2 size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Company Size</InputLabel>
          <Select
            name="size"
            label="Company Size"
            startAdornment={
              <InputAdornment position="start">
                <PeopleIcon sx={{ color: colorButtonOrange }} />
              </InputAdornment>
            }
          >
            {companySizes.map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid2>

      <Grid2 size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Country</InputLabel>
          <Select
            name="country"
            label="Country"
            startAdornment={
              <InputAdornment position="start">
                <PublicIcon sx={{ color: colorButtonOrange }} />
              </InputAdornment>
            }
          >
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid2>

      <Grid2 size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Working Days"
          name="workingDays"
          variant="outlined"
          sx={{ mb: 3 }}
        />
      </Grid2>

      <Grid2 size={{ xs: 12 }}>
        <TextField
          fullWidth
          label="Overtime Policy"
          name="overtimePolicy"
          variant="outlined"
          sx={{ mb: 3 }}
        />
      </Grid2>
    </>
  );
};
