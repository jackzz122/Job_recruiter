import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { DialogContruct } from "./DialogContruct";
export const DialogCreateCV = ({
  handleClose,
  open,
}: {
  handleClose: () => void;
  open: boolean;
}) => {
  const navigate = useNavigate();
  const [lang, setLang] = useState("vietnamese");
  const handleChange = (e: SelectChangeEvent) => {
    setLang(e.target.value as string);
  };
  return (
    <DialogContruct
      name="Create a standard Developer CV on TopDev"
      handleClose={handleClose}
      open={open}
    >
      <Box sx={{ width: "250px", display: "flex", justifyItems: "center" }}>
        <Typography textAlign="center">
          Create your Developer CV right away, we will suggest the most suitable
          IT jobs for you.
        </Typography>
      </Box>
      <form action="">
        <TextField sx={{ marginBlock: "1rem" }} fullWidth label="CV name" />
        <FormControl fullWidth>
          <InputLabel id="languages">Languages</InputLabel>
          <Select
            labelId="languages"
            id="languages"
            value={lang}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="vietnamese">Vietnamese</MenuItem>
            <MenuItem value="english">English</MenuItem>
          </Select>
        </FormControl>
      </form>
      <br />
      <Stack
        sx={{ paddingInline: "2rem", marginBottom: "1rem" }}
        direction="row"
        spacing={2}
      >
        <Button
          variant="outlined"
          sx={{ border: "1px solid red", color: "red" }}
          fullWidth
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "red", color: "white" }}
          fullWidth
          onClick={() => navigate("/CV/edit/:123123123")}
        >
          Create
        </Button>
      </Stack>
    </DialogContruct>
  );
};
