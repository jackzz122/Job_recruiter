import { Outlet, useParams } from "react-router-dom";
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
  const params = useParams();
  const nameJob = params.name;
  // const nameComp = params.nameComp;
  return (
    <>
      <Box className="companyColor" sx={{ color: "white" }}></Box>
      <br />
      <Container maxWidth="xl" sx={{ minHeight: "100vh" }}>
        <Typography variant="h6">
          2 việc làm <span className="text-red-500">{nameJob}</span> tại Hà Nội
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
              <Select labelId="level" value="Fresher" label="Cấp bậc">
                <MenuItem value="Fresher">Fresher</MenuItem>
                <MenuItem value="Junior">Junior</MenuItem>
                <MenuItem value="Senior">Senior</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: "10%", marginLeft: "1rem" }}>
              <InputLabel id="District">Quận/huyện</InputLabel>
              <Select labelId="District" value="BaDing" label="Quận/huyện">
                <MenuItem value="BaDing">Ba Đình</MenuItem>
                <MenuItem value="HCM">HCM</MenuItem>
                <MenuItem value="DaNang">Đà Nẵng</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: "10%", marginLeft: "1rem" }}>
              <InputLabel id="typeOfWork">Hình thức làm việc</InputLabel>
              <Select
                labelId="typeOfWork"
                value="office"
                label="Hình thức làm việc"
              >
                <MenuItem value="office">Tại văn phòng</MenuItem>
                <MenuItem value="remote">Làm từ xa</MenuItem>
                <MenuItem value="flexible">Linh hoạt</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: "10%", marginLeft: "1rem" }}>
              <InputLabel id="salary">Mức lương</InputLabel>
              <Select labelId="salary" value="1000" label="Mức lương">
                <MenuItem value="1000">100</MenuItem>
                <MenuItem value="2000">200</MenuItem>
                <MenuItem value="3000">300</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: "10%", marginLeft: "1rem" }}>
              <InputLabel id="industry">Lĩnh vực</InputLabel>
              <Select labelId="industry" value="beauty" label="Lĩnh vực">
                <MenuItem value="beauty">Ten</MenuItem>
                <MenuItem value="network">Twenty</MenuItem>
                <MenuItem value="bus">Thirty</MenuItem>
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
