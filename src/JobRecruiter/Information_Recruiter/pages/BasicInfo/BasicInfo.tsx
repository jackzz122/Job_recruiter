import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { colorButtonOrange } from "../../../../themeContext";
import { Grid2, InputAdornment } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import { TextFieldStartIcons } from "../../components/TextFieldStartIcons";

export const BasicInfo = () => {
  const inputFieldUpdating: {
    label: string;
    name: string;
    value: string;
    listenChange: () => void;
    icons: React.ReactNode;
  }[] = [
    {
      label: "Company Name",
      name: "CompanyName",
      value: "",
      listenChange: () => {},
      icons: (
        <InputAdornment position="start">
          <BusinessIcon sx={{ color: colorButtonOrange }} />
        </InputAdornment>
      ),
    },
    {
      label: "Email",
      name: "Email",
      value: "",
      listenChange: () => {},
      icons: (
        <InputAdornment position="start">
          <EmailIcon sx={{ color: colorButtonOrange }} />
        </InputAdornment>
      ),
    },
    {
      label: "Phone",
      name: "Phone",
      value: "",
      listenChange: () => {},
      icons: (
        <InputAdornment position="start">
          <PhoneIcon sx={{ color: colorButtonOrange }} />
        </InputAdornment>
      ),
    },
    {
      label: "Established Date",
      name: "established",
      value: "",
      listenChange: () => {},
      icons: (
        <InputAdornment position="start">
          <CalendarTodayIcon sx={{ color: colorButtonOrange }} />
        </InputAdornment>
      ),
    },
    {
      label: "Address",
      name: "address",
      value: "",
      listenChange: () => {},
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
        return (
          <Grid2 key={index} size={{ xs: 12, md: 6 }}>
            <TextFieldStartIcons
              label={input.label}
              name={input.name}
              value={input.value}
              listenChange={input.listenChange}
            >
              {input.icons}
            </TextFieldStartIcons>
          </Grid2>
        );
      })}
    </>
  );
};
