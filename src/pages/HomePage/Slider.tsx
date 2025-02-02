import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
const places: string[] = ["Ha Noi", "Ho Chi Minh", "Da Nang", "Others"];
const suggestions: string[] = ["javascript", "C++", "Java", ".Net"];
export default function Slider() {
  const [place, setPlace] = useState<string>("Ha Noi");
  const handleChange = (e: SelectChangeEvent) => {
    setPlace(e.target.value);
  };
  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #000000, #5b0e0e) !important",
        color: "white",
        padding: "2.5rem",
      }}
    >
      <Container className="slider">
        <Box sx={{ paddingTop: 4 }}>
          <Typography sx={{ color: "white", fontWeight: "bold", fontSize: 30 }}>
            729 Việc Làm IT "Chất" Dành Cho Vương Đức Lương
          </Typography>
        </Box>
        <br />
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margintTop: "1rem",
            gap: "0.5rem",
          }}
        >
          <FormControl sx={{ minWidth: "8.75rem" }}>
            <InputLabel sx={{ color: "white" }} id="place">
              Địa điểm
            </InputLabel>
            <Select
              value={place}
              label="Địa Điểm"
              onChange={handleChange}
              labelId="place"
              sx={{
                color: "white",
                border: "0.063rem solid white",
              }}
            >
              {places.map((place) => {
                return (
                  <MenuItem key={place} value={place}>
                    {place}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            sx={{ flexGrow: 1, border: "0.063rem solid white" }}
            multiline
            placeholder="Nhập từ khóa theo kỹ năng, chức vụ, công ty..."
            variant="filled"
          />
          <Button
            sx={{
              height: "3.5rem",
              border: "0.063rem solid red",
              backgroundColor: "red",
              color: "white",
              flexGrow: 0.25,
            }}
            variant="contained"
          >
            Tìm kiếm
          </Button>
        </Box>
        <Box
          sx={{
            paddingBottom: 4,
            marginTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Typography>Gợi ý cho bạn: </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            {suggestions.map((suggest) => {
              return (
                <Chip
                  key={suggest}
                  label={suggest}
                  sx={{ color: "white", backgroundColor: "gray" }}
                />
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
