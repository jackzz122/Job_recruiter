import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormContext } from "react-hook-form";
import { JobFormData } from "../../../types/JobType";

export const BasicInformation = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<JobFormData>();
  return (
    <>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Job Title
      </Typography>
      <TextField
        {...register("title", {
          required: "Job title is required",
        })}
        error={!!errors.title}
        helperText={errors?.title?.message}
        fullWidth
        variant="outlined"
        size="small"
      />

      {/* Number of People */}
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Number of People Needed
        </Typography>
        <TextField
          fullWidth
          type="number"
          {...register("sizingPeople", {
            valueAsNumber: true,
          })}
          error={!!errors.sizingPeople}
          helperText={errors?.sizingPeople?.message}
          variant="outlined"
          size="small"
        />
      </Box>

      {/* Salary Range */}
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Salary Range (Min to Max)
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          fullWidth
          type="number"
          {...register("minRange", {
            valueAsNumber: true,
          })}
          defaultValue={1}
          error={!!errors.minRange}
          helperText={errors?.minRange?.message}
          variant="outlined"
          size="small"
        />
        <TextField
          fullWidth
          type="number"
          defaultValue={1}
          {...register("maxRange", {
            valueAsNumber: true,
          })}
          error={!!errors.maxRange}
          helperText={errors?.maxRange?.message}
          variant="outlined"
          size="small"
        />
      </Box>
      {/* Summary */}
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Summary of job posting title
        </Typography>
        <TextField
          multiline
          rows={5}
          {...register("description.summary")}
          placeholder="Enter summary of this job"
          fullWidth
        />
      </Box>
      {/* Location */}
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Enter location of job posting
        </Typography>
        <TextField
          {...register("location")}
          placeholder="Enter location of this job"
          fullWidth
        />
      </Box>
      {/* Date */}
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Enter the date of the job (Start date and Application deadline)
        </Typography>
        <input
          className="border border-gray-300 p-4 mr-2"
          type="datetime-local"
          {...register("startDate")}
        />
        <input
          className="border border-gray-300 p-4"
          type="datetime-local"
          {...register("applicationDeadline")}
        />
      </Box>
    </>
  );
};
