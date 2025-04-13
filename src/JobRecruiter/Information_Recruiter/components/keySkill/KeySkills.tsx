import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Controller } from "react-hook-form";
import Divider from "@mui/material/Divider";
import { colorButtonOrange } from "../../../../themeContext";
import WorkIcon from "@mui/icons-material/Work";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useGetMajorbyNameQuery } from "../../../../redux/feature/major/majorApiSlice";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

interface FormValues {
  keySkills: Array<{ value: string }>;
}

export const KeySkills = () => {
  const { data: majors } = useGetMajorbyNameQuery();
  const { control } = useFormContext<FormValues>();
  const [selectedSkill, setSelectedSkill] = useState("");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "keySkills",
  });

  const handleAddSkill = () => {
    if (
      selectedSkill &&
      !fields.some((field) => field.value === selectedSkill)
    ) {
      append({ value: selectedSkill });
      setSelectedSkill("");
    }
  };

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
          <FormControl fullWidth>
            <InputLabel>Key Skills</InputLabel>
            <Controller
              name="keySkills"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  label="Key Skills"
                >
                  {majors?.data?.map((major, index) => (
                    <MenuItem key={index} value={major}>
                      {major}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
          <IconButton
            onClick={handleAddSkill}
            sx={{
              color: colorButtonOrange,
              ml: 1,
              "&:hover": {
                backgroundColor: "rgba(255, 107, 53, 0.1)",
              },
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {fields.map((field, index) => (
            <Chip
              key={field.id}
              label={field.value}
              onDelete={() => remove(index)}
              deleteIcon={<DeleteIcon />}
              sx={{
                backgroundColor: colorButtonOrange,
                color: "white",
                fontWeight: "bold",
                px: 2,
                py: 1,
                fontSize: "0.9rem",
                "&:hover": {
                  backgroundColor: "rgba(255, 107, 53, 0.9)",
                },
                "& .MuiChip-deleteIcon": {
                  color: "white",
                  "&:hover": {
                    color: "rgba(255, 255, 255, 0.7)",
                  },
                },
              }}
            />
          ))}
        </Box>
      </Grid2>
    </>
  );
};
