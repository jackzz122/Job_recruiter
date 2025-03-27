import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { DialogCreateJobRecruiter } from "../../components/Dialog/DialogCreateJobRecruiter";
import { colorButtonOrange } from "../../themeContext";
import { ContainerBox } from "../../components/ContainerRecruiter/ContainerBox";
import { SingleJobModel } from "./SingleJobModel";

const job_list = ["Java", "JavaScript", "C++", "C#"];
const job_level_list = ["Fresher", "Junior", "Senior", "PM", "TechLead"];
const statusJob = ["All", "OnGoing", "Stop", "Close"];
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
          <FormControl sx={{ width: "200px" }}>
            <InputLabel id="place">Job Status</InputLabel>
            <Select
              value={place}
              onChange={handleChangePlace}
              labelId="place"
              id="place"
              defaultValue="All"
              label="Job Place"
            >
              {statusJob.map((items, index) => {
                return (
                  <MenuItem key={index} value={items}>
                    {items}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button
            sx={{
              padding: "0.98rem",
              backgroundColor: colorButtonOrange,
              color: "white",
            }}
            variant="contained"
          >
            Apply
          </Button>
        </form>
      </Box>
      <Box marginBlock={2}>
        <Button
          sx={{ backgroundColor: colorButtonOrange, color: "white" }}
          onClick={() => setCreateOpenDialog(true)}
          variant="contained"
        >
          Create
        </Button>
        <DialogCreateJobRecruiter
          handleClose={() => setCreateOpenDialog(false)}
          open={openCreateDialog}
        />
      </Box>

      <Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableCell>Tiêu đề</TableCell>
              <TableCell>Phòng ban</TableCell>
              <TableCell>Địa điểm</TableCell>
              <TableCell>Ngày đăng</TableCell>
              <TableCell>Hạn nộp</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Ứng viên</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableHead>
            <TableBody>
              <TableRow>
                <SingleJobModel />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ContainerBox>
  );
};
