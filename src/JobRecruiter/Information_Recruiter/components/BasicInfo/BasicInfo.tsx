import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { colorButtonOrange } from "../../../../themeContext";
import { Grid2, InputAdornment } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import { useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
import LanguageIcon from "@mui/icons-material/Language";

export const BasicInfo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const inputFieldUpdating: {
    label: string;
    name: string;
    type?: string;
    icons: React.ReactNode;
  }[] = [
    {
      label: "Company Name",
      name: "companyName",
      icons: (
        <InputAdornment position="start">
          <BusinessIcon sx={{ color: colorButtonOrange }} />
        </InputAdornment>
      ),
    },
    {
      label: "Email",
      name: "emailCompany",
      icons: (
        <InputAdornment position="start">
          <EmailIcon sx={{ color: colorButtonOrange }} />
        </InputAdornment>
      ),
    },
    {
      label: "Hotline",
      name: "phoneNumberCompany",
      icons: (
        <InputAdornment position="start">
          <PhoneIcon sx={{ color: colorButtonOrange }} />
        </InputAdornment>
      ),
    },
    {
      label: "Website URL",
      name: "websiteUrl",
      icons: (
        <InputAdornment position="start">
          <LanguageIcon sx={{ color: colorButtonOrange }} />
        </InputAdornment>
      ),
    },
    {
      label: "Years",
      name: "years",
      type: "date",
      icons: (
        <InputAdornment position="start">
          <CalendarTodayIcon sx={{ color: colorButtonOrange }} />
        </InputAdornment>
      ),
    },
    {
      label: "Address",
      name: "address",
      icons: (
        <InputAdornment position="start">
          <LocationOnIcon sx={{ color: colorButtonOrange }} />
        </InputAdornment>
      ),
    },
  ];

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
          <BusinessIcon /> Basic Information
        </Typography>
        <Divider sx={{ mb: 3 }} />
      </Grid2>
      {inputFieldUpdating.map((input, index) => {
        if (input.type === "date") {
          return (
            <Grid2 key={index} size={{ xs: 12, md: 6 }}>
              <TextField
                type="date"
                {...register(input.name)}
                sx={{ mb: 3 }}
                placeholder="YYYY-MM-DD"
                fullWidth
                label={input.label}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
              {errors[input.name]?.message && (
                <Typography variant="body2" color="error">
                  {errors[input.name]?.message as string}
                </Typography>
              )}
            </Grid2>
          );
        }

        return (
          <Grid2 key={index} size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label={input.label}
              variant="outlined"
              {...register(input.name, {
                required: "This field is required",
              })}
              error={!!errors[input.name]}
              helperText={errors[input.name]?.message as string}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: input.icons,
              }}
            />
          </Grid2>
        );
      })}
    </>
  );
};
