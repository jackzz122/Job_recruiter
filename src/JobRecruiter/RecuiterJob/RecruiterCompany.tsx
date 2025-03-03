import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardAction from "@mui/material/CardAction";
import Typography from "@mui/material/Typography";
export const RecruiterCompany = () => {
  return (
    <>
      <Box>
        <form action="" className="flex items-center gap-3">
          <TextField fullWidth label="Search company recruiter blog" />
          <Button variant="contained" sx={{ padding: "0.98rem" }}>
            Search
          </Button>
        </form>
      </Box>
      <Grid2 container>
        <Grid2>
          <Card>
            <CardContent>
              <Typography variant="h6">Frontend Developer</Typography>
              <Typography variant="body2" fontStyle="italic">
                Date: 12/02/2024
              </Typography>
              <Typography variant="body2">Amount of employees: 12</Typography>
              <Typography variant="body2">Status: Going</Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </>
  );
};
