import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { DialogDelete } from "../../components/Dialog/DialogDelete";
import { DialogReviewRecruiterJob } from "../../components/Dialog/DialogReviewRecruiterJob";
import { DialogCreateJobRecruiter } from "../../components/Dialog/DialogCreateJobRecruiter";
import { colorButtonOrange } from "../../themeContext";
import { ContainerBox } from "../../components/ContainerRecruiter/ContainerBox";

const job_list = ["Java", "JavaScript", "C++", "C#"];
const job_level_list = ["Fresher", "Junior", "Senior", "PM", "TechLead"];
const places = ["HaNoi", "TpHCM", "DaNang"];
export const RecruiterCompany = () => {
  const [filter_job, setfilterJob] = useState<string>("");
  const [job_level, setJobLevel] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const handleChange = (event: SelectChangeEvent) => {
    setfilterJob(event.target.value);
  };
  const handleChangeJobLevel = (event: SelectChangeEvent) => {
    setJobLevel(event.target.value);
  };
  const handleChangePlace = (event: SelectChangeEvent) => {
    setPlace(event.target.value);
  };

  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openReviewDialog, setopenReviewDialog] = useState<boolean>(false);
  const [openCreateDialog, setCreateOpenDialog] = useState<boolean>(false);
  return (
    <ContainerBox>
      <Box>
        <form action="" className="flex items-center gap-3">
          <TextField fullWidth label="Search company recruiter blog" />
          <Button
            variant="contained"
            sx={{ padding: "0.98rem", backgroundColor: colorButtonOrange }}
          >
            Search
          </Button>
        </form>
      </Box>
      <Box className="filter" marginBlock={3}>
        <form action="" className="flex items-center gap-3">
          <FormControl sx={{ width: "200px" }}>
            <InputLabel id="job_filter">Job Filter</InputLabel>
            <Select
              value={filter_job}
              onChange={handleChange}
              labelId="job_filter"
              id="job_filter"
              label="Job Filter"
            >
              {job_list.map((items, index) => {
                return (
                  <MenuItem key={index} value={items}>
                    {items}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "200px" }}>
            <InputLabel id="job_level">Job Level</InputLabel>
            <Select
              value={job_level}
              onChange={handleChangeJobLevel}
              labelId="job_level"
              id="job_level"
              label="Job Level"
            >
              {job_level_list.map((items, index) => {
                return (
                  <MenuItem key={index} value={items}>
                    {items}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "200px" }}>
            <InputLabel id="place">Place</InputLabel>
            <Select
              value={place}
              onChange={handleChangePlace}
              labelId="place"
              id="place"
              label="Job Place"
            >
              {places.map((items, index) => {
                return (
                  <MenuItem key={index} value={items}>
                    {items}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button variant="contained">Apply</Button>
        </form>
      </Box>
      <Box marginBlock={2}>
        <Button onClick={() => setCreateOpenDialog(true)} variant="contained">
          Create
        </Button>
        <DialogCreateJobRecruiter
          handleClose={() => setCreateOpenDialog(false)}
          open={openCreateDialog}
        />
      </Box>
      <Grid2 container>
        <Grid2 size={4}>
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
          <CardActions>
            <Button
              onClick={() => setopenReviewDialog(true)}
              variant="contained"
              sx={{ flexGrow: 1 }}
            >
              Details
            </Button>
            <DialogReviewRecruiterJob
              handleClose={() => setopenReviewDialog(false)}
              open={openReviewDialog}
            />
            <Button variant="contained" sx={{ flexGrow: 1 }}>
              Edit
            </Button>
            <Button
              onClick={() => setOpenDeleteDialog(true)}
              variant="contained"
              sx={{ flexGrow: 1 }}
            >
              Delete
            </Button>
            <DialogDelete
              handleClose={() => setOpenDeleteDialog(false)}
              open={openDeleteDialog}
            />
          </CardActions>
        </Grid2>
      </Grid2>
    </ContainerBox>
  );
};
