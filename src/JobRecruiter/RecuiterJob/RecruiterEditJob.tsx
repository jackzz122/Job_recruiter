import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
export const RecruiterEditJob = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/recruiter/dashboard">
            Dashboard
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/recruiter/recruiter_job"
          >
            Recruiter Page
          </Link>
          <Typography sx={{ color: "text.primary" }}>
            Create a Job Recruiter
          </Typography>
        </Breadcrumbs>
        <Typography variant="h5" sx={{ marginBlock: "1rem" }}>
          Title: Fresher Frontend About React/Nodejs
        </Typography>
        <form action="">
          <Typography variant="h6" className="hr_chat">
            Description
          </Typography>
          <TextField
            label="Job description"
            sx={{ marginTop: "1rem" }}
            fullWidth
          />
          <TextField
            label="Job requirements"
            sx={{ marginTop: "1rem" }}
            fullWidth
          />
          <TextField
            label="Reason why they choose this job"
            sx={{ marginTop: "1rem" }}
            fullWidth
          />
          <Box
            sx={{
              width: "10rem",
              height: "10rem",
              border: "1px solid black",
              marginTop: "2rem",
            }}
          ></Box>
          <Button sx={{ marginTop: "1rem" }} variant="contained">
            Upload Image
          </Button>
        </form>
      </Container>
    </>
  );
};
