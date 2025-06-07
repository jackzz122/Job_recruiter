import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useFieldArray, useFormContext } from "react-hook-form";
import { JobFormData } from "../../../types/JobType";
import LabelIcon from "@mui/icons-material/Label";
import { InputAdornment } from "@mui/material";
import { colorButtonOrange } from "../../../themeContext";

type FieldName =
  | "description.keySkills.bulletPoints"
  | "description.whyYouLoveIt.bulletPoints";

export const RenderBulletPointSection = ({
  title,
  name,
  nameFields,
}: {
  name: "keySkills" | "whyYouLoveIt";
  title: string;
  nameFields: FieldName;
}) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<JobFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: nameFields,
  });

  const getFieldError = (index: number) => {
    return errors?.description?.[name]?.bulletPoints?.[index]?.value;
  };

  return (
    <Box>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        placeholder={`Add a new ${title}...`}
        variant="outlined"
        size="small"
        error={!!errors?.description?.[name]?.mainText}
        helperText={errors?.description?.[name]?.mainText?.message}
        {...register(`description.${name}.mainText`, {
          required: "Main text is required",
        })}
        sx={{ mb: 2 }}
      />

      <Box>
        {fields.map((field, index) => {
          const isLast = index === fields.length - 1;
          const fieldError = getFieldError(index);

          return (
            <Box
              marginBottom={2}
              key={field.id}
              sx={{ display: "flex", gap: 1 }}
            >
              <TextField
                placeholder={
                  isLast ? `Add a new ${title} bullet...` : field.value
                }
                fullWidth
                variant="outlined"
                size="small"
                disabled={!isLast}
                error={!!fieldError}
                helperText={fieldError?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LabelIcon sx={{ color: colorButtonOrange }} />
                      </InputAdornment>
                    ),
                  },
                }}
                {...register(
                  `description.${name}.bulletPoints.${index}.value` as const,
                  {
                    required: isLast ? "This field is required" : false,
                  }
                )}
              />

              {isLast ? (
                <IconButton
                  onClick={() => append({ value: "" })}
                  color="primary"
                  aria-label="Add bullet point"
                >
                  <AddIcon />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => remove(index)}
                  color="error"
                  aria-label="Remove bullet point"
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
