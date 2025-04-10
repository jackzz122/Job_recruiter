import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useFieldArray, useFormContext } from "react-hook-form";
import { JobFormData } from "../../../types/JobType";

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
  const { register, control } = useFormContext<JobFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: nameFields,
  });
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
        {...register(`description.${name}.mainText`)}
        sx={{ mb: 2 }}
      />

      <Box>
        {fields.map((field, index) => {
          const isLast = index === fields.length - 1;
          return (
            <Box marginBottom={2} key={index} sx={{ display: "flex", gap: 1 }}>
              <TextField
                placeholder={
                  isLast ? `Add a new ${title} bullet...` : field.value
                }
                fullWidth
                variant="outlined"
                size="small"
                disabled={!isLast}
                {...register(
                  `description.${name}.bulletPoints.${index}.value` as const
                )}
              />

              {isLast ? (
                <IconButton
                  onClick={() => append({ value: "" })}
                  color="primary"
                >
                  <AddIcon />
                </IconButton>
              ) : (
                <IconButton onClick={() => remove(index)} color="error">
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
