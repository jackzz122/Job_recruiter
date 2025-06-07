import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormContext } from "react-hook-form";
import { JobFormData } from "../../../types/JobType";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import GroupIcon from "@mui/icons-material/Group";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import { colorButtonOrange } from "../../../themeContext";

export const BasicInformation = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<JobFormData>();
  const startDateWatch = watch("startDate");

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
        placeholder="Enter job title"
        variant="outlined"
        size="small"
        slotProps={{
          input: {
            startAdornment: (
              <WorkOutlineIcon sx={{ color: colorButtonOrange, mr: 1 }} />
            ),
          },
        }}
      />

      {/* Experience */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Years of Experience Required
        </Typography>
        <TextField
          fullWidth
          type="number"
          {...register("experience", {
            required: "Experience is required",
            valueAsNumber: true,
            min: {
              value: 0,
              message: "Experience cannot be negative",
            },
            max: {
              value: 50,
              message: "Experience cannot exceed 50 years",
            },
          })}
          error={!!errors.experience}
          helperText={errors?.experience?.message}
          placeholder="Enter years of experience required"
          variant="outlined"
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <WorkHistoryIcon sx={{ color: colorButtonOrange, mr: 1 }} />
              ),
            },
          }}
        />
      </Box>

      {/* Number of People */}
      <Box sx={{ mt: 2 }}>
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
          slotProps={{
            input: {
              startAdornment: (
                <GroupIcon sx={{ color: colorButtonOrange, mr: 1 }} />
              ),
            },
          }}
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
          slotProps={{
            input: {
              startAdornment: (
                <AttachMoneyIcon sx={{ color: colorButtonOrange, mr: 1 }} />
              ),
            },
          }}
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
          slotProps={{
            input: {
              startAdornment: (
                <AttachMoneyIcon sx={{ color: colorButtonOrange, mr: 1 }} />
              ),
            },
          }}
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
          {...register("description.summary", {
            required: "Summary is required",
          })}
          error={!!errors.description?.summary}
          helperText={errors?.description?.summary?.message}
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
          {...register("location", {
            required: "Location is required",
          })}
          error={!!errors.location}
          helperText={errors?.location?.message}
          placeholder="Enter location of this job"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <LocationOnIcon sx={{ color: colorButtonOrange, mr: 1 }} />
              ),
            },
          }}
        />
      </Box>
      {/* Date */}
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Enter the date of the job (Start date and Application deadline)
        </Typography>
        <TextField
          sx={{ border: "1px solid #e0e0e0", mr: 2 }}
          type="date"
          {...register("startDate", {
            required: "Start date is required",
            valueAsDate: true,
            validate: (value) => {
              if (new Date(value) < new Date()) {
                return "Start date must be in the future";
              }
              return true;
            },
          })}
          error={!!errors.startDate}
          helperText={errors?.startDate?.message}
          slotProps={{
            input: {
              inputProps: {
                min: new Date().toISOString().slice(0, 10),
              },
              startAdornment: (
                <CalendarMonthIcon sx={{ color: colorButtonOrange, mr: 1 }} />
              ),
            },
          }}
        />
        <TextField
          sx={{ border: "1px solid #e0e0e0" }}
          type="date"
          {...register("applicationDeadline", {
            required: "Application deadline is required",
            valueAsDate: true,
            validate: (value) => {
              const startDate = new Date(startDateWatch);
              const deadlineDate = new Date(value);

              const minDeadline = new Date(startDate);
              minDeadline.setDate(minDeadline.getDate() + 3);

              if (deadlineDate < minDeadline) {
                return "Application deadline must be at least 3 days after start date";
              }

              return true;
            },
          })}
          error={!!errors.applicationDeadline}
          helperText={errors?.applicationDeadline?.message}
          slotProps={{
            input: {
              inputProps: {
                min: new Date().toISOString().slice(0, 10),
              },
              startAdornment: (
                <AccessTimeIcon sx={{ color: colorButtonOrange, mr: 1 }} />
              ),
            },
          }}
        />
      </Box>
    </>
  );
};
