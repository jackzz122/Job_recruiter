import Stack from "@mui/material/Stack";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { useFormContext, useFieldArray } from "react-hook-form";
import { JobFormData } from "../../../types/JobType";
import { Controller } from "react-hook-form";

export const SelectMajorField = ({ majors }: { majors: string[] }) => {
  const { control, watch } = useFormContext<JobFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "majorId",
  });

  const selectedValues = fields
    .map((_field, index) => {
      return watch(`majorId.${index}.value`);
    })
    .filter(Boolean);

  return (
    <Box sx={{ mb: 3 }}>
      <FormLabel component="legend">Job Key Skills</FormLabel>
      <Stack spacing={2}>
        {fields.map((_field, index) => {
          const isLast = index === fields.length - 1;
          const currentValue = watch(`majorId.${index}.value`);

          return (
            <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name={`majorId.${index}.value`}
                  render={({ field: { onChange, value } }) => (
                    <Select value={value || ""} onChange={onChange}>
                      {majors?.map((major, majorIndex) => {
                        const isSelected =
                          selectedValues.includes(major) &&
                          currentValue !== major;

                        return (
                          <MenuItem
                            key={majorIndex}
                            value={major}
                            disabled={isSelected}
                          >
                            {major} {isSelected ? "(Đã chọn)" : ""}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  )}
                />
              </FormControl>
              <IconButton
                onClick={() => (isLast ? append({ value: "" }) : remove(index))}
                color={isLast ? "primary" : "error"}
                sx={{ ml: 1 }}
              >
                {isLast ? <AddIcon /> : <DeleteIcon />}
              </IconButton>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};
