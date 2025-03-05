import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { NavLink, Outlet } from "react-router-dom";
import Stack from "@mui/material/Stack";
export const CompanyInfo = () => {
  return (
    <Container maxWidth="lg">
      <Stack
        direction="column"
        justifyItems="center"
        alignItems="center"
        spacing={2}
      >
        <Avatar sx={{ width: "100px", height: "100px" }} />

        <Typography variant="h5">Your company name</Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <NavLink to=".">Introduction</NavLink>
        <NavLink to="reviews">Reviews</NavLink>
      </Stack>
      <br />
      <Outlet />
    </Container>
  );
};
