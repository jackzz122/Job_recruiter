import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Grid2";
import { CardItemCompanyList } from "../../job/components/Card/CardItemCompanyList";
import { useGetCompanyQuery } from "../../../redux/feature/company/companyApiSlice";
import { CircularProgress } from "@mui/material";
export const ListOfCompany = () => {
  const { data: companyList, isLoading } = useGetCompanyQuery();
  const listOfCompany = companyList?.data.map((company) => {
    return (
      <Grid2 size={3} key={company._id}>
        <CardItemCompanyList company={company} />
      </Grid2>
    );
  });
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
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid2 spacing={2} container>
          {listOfCompany}
        </Grid2>
      )}
    </Container>
  );
};
