import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { grayLight } from "../../utils/color";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
export const LayoutListComp = () => {
  return (
    <>
      <Box className="companyColor" sx={{ color: "white" }}></Box>
      <br />
      <Container maxWidth="xl" sx={{ minHeight: "100vh" }}>
        <Typography variant="h6">
          2 việc làm <span className="text-red-500">ReactJS</span> tại Hà Nội
        </Typography>
        <br />
        <Stack
          sx={{
            border: `1px solid ${grayLight}`,
            padding: "1rem",
            borderRadius: "0.75rem",
          }}
          direction="row"
          spacing={2}
        >
          <form className="grow ">
            <FormControl sx={{ width: "10%" }}>
              <InputLabel id="level">Cấp bậc</InputLabel>
              <Select labelId="level" value="fresher" label="Cấp bậc">
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: "10%", marginLeft: "1rem" }}>
              <InputLabel id="level">Quận/huyện</InputLabel>
              <Select labelId="level" value="fresher" label="Quận/huyện">
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: "10%", marginLeft: "1rem" }}>
              <InputLabel id="level">Hình thức làm việc</InputLabel>
              <Select
                labelId="level"
                value="fresher"
                label="Hình thức làm việc"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: "10%", marginLeft: "1rem" }}>
              <InputLabel id="level">Mức lương</InputLabel>
              <Select labelId="level" value="fresher" label="Mức lương">
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: "10%", marginLeft: "1rem" }}>
              <InputLabel id="level">Lĩnh vực</InputLabel>
              <Select labelId="level" value="fresher" label="Lĩnh vực">
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </form>
          <Button sx={{ color: "gray", border: "1px solid gray" }}>
            {" "}
            <FilterAltIcon /> Bộ lọc
          </Button>
        </Stack>
        <br />
        <Outlet />
      </Container>
    </>
  );
};
