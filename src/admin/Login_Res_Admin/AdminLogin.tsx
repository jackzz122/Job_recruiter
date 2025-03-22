import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
export const AdminLogin = () => {
  return (
    <>
      <Container
        maxWidth="xs"
        sx={{
          border: "1px solid black",
          height: "30rem",
          transform: "translateY(25%)",
        }}
      >
        <Typography textAlign="center" sx={{ marginTop: "2rem" }} variant="h5">
          Login For Admin
        </Typography>
        <form action="">
          <TextField fullWidth sx={{ marginBlock: "1rem" }} label="userId" />
          <TextField fullWidth sx={{ marginBlock: "1rem" }} label="password" />
        </form>
      </Container>
    </>
  );
};
