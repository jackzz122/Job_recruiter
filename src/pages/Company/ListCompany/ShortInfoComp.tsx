import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Divider from "@mui/material/Divider";
export const ShortInfoComp = () => {
  return (
    <Box
      sx={{
        border: "1px solid black",
        padding: "1rem",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <img src="/bss_avatar.png" alt="" className="w-[13%] border" />
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Senior/Middle Front-end (ReactJS) Developer
          </Typography>
          <Typography variant="body2">Esoft Vietnam., Ltd</Typography>
          <Typography variant="body2" sx={{ color: "green" }}>
            <MonetizationOnIcon /> 1,500 - 2,500 USD
          </Typography>
        </Box>
      </Stack>
      <br />
      <Stack direction="row" spacing={2} marginBottom={2}>
        <Button
          sx={{
            flexGrow: 1,
            backgroundColor: "#e50000",
            color: "white",
            padding: "0.25rem",
          }}
          variant="contained"
        >
          Ứng tuyển
        </Button>
        <Button sx={{ flexGrow: 0, border: "1px solid red" }}>
          <FavoriteIcon sx={{ color: "#e50000" }} fontSize="large" />
        </Button>
      </Stack>
      <Divider />
    </Box>
  );
};

// #fff4ec
