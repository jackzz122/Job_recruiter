import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useState } from "react";

const speciality_lists = ["Java", "Javascript", "Dotnet"];
export const Company_Intro = () => {
  const [speciality_list, setspeciality_list] = useState<string[]>([]);
  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setspeciality_list(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <>
      <form action="">
        <TextField
          label="Introduction"
          defaultValue="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam consectetur fugiat reprehenderit obcaecati quo alias veniam maiores iste hic. Veritatis, culpa eaque. Ipsam voluptas dolore veritatis vero mollitia accusamus omnis."
          multiline
          rows={3}
          fullWidth
        />
        {/* <FormControl>
          <InputLabel id="speciality">Our speciality</InputLabel>
          <Select
            fullWidth
            multiple
            input={<OutlinedInput label="speciality" />}
            onChange={handleChange}
            labelId="speciality"
          >
            {speciality_list.map((speciality, index) => (
              <MenuItem key={index} value={speciality}>
                {speciality}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
      </form>
    </>
  );
};
