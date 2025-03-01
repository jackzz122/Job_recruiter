import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Grid2";
import { CardItemCompanyList } from "../../components/Card/CardItemCompanyList";
export const ListOfCompany = () => {
  return (
    <Container maxWidth="xl" sx={{ padding: "2rem" }}>
      <Box>
        <form action="">
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              name="list_company"
              label="Search company name"
            />
            <Button
              variant="contained"
              sx={{ color: "white", backgroundColor: "red" }}
            >
              Search
            </Button>
          </Stack>
        </form>
      </Box>
      <Typography marginTop={2} variant="h5" marginBottom={2} fontWeight="bold">
        List Of Company
      </Typography>
      <Grid2 spacing={2} container>
        <Grid2 size={3}>
          <CardItemCompanyList />
        </Grid2>
        <Grid2 size={3}>
          <CardItemCompanyList />
        </Grid2>
        <Grid2 size={3}>
          <CardItemCompanyList />
        </Grid2>
        <Grid2 size={3}>
          <CardItemCompanyList />
        </Grid2>
      </Grid2>
    </Container>
  );
};
