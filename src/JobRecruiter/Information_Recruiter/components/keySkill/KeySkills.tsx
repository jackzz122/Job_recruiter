import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { Controller } from "react-hook-form";
import { colorButtonOrange } from "../../../../themeContext";
import WorkIcon from "@mui/icons-material/Work";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useGetMajorbyNameQuery } from "../../../../redux/feature/major/majorApiSlice";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
export const KeySkills = () => {
  const { data: majors } = useGetMajorbyNameQuery();
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "keySkills",
  });
  return (
    <>
      <Grid2 size={{ xs: 12 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            color: colorButtonOrange,
            mb: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <WorkIcon /> Key Skills
        </Typography>
        <Divider sx={{ mb: 3 }} />
      </Grid2>

      <Grid2 size={{ xs: 12 }}>
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <Controller
            name="keySkills"
            control={control}
            render={({ field }) => {
              return (
                <Select fullWidth {...field} label="Key skills">
                  {majors?.data.map((major, index) => {
                    return (
                      <MenuItem key={index} value={major}>
                        {major}
                      </MenuItem>
                    );
                  })}
                </Select>
              );
            }}
          />
          <IconButton
            onClick={() => append({ value: "" })}
            sx={{ color: colorButtonOrange, ml: 1 }}
          >
            <AddIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {/* {formData.skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                deleteIcon={<DeleteIcon />}
                sx={{
                  backgroundColor: colorButtonOrange,
                  color: "white",
                  fontWeight: "bold",
                  px: 2,
                  py: 1,
                  fontSize: "0.9rem",
                  "& .MuiChip-deleteIcon": {
                    color: "white",
                    "&:hover": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                  },
                }}
              />
            ))} */}
        </Box>
      </Grid2>
    </>
  );
};
