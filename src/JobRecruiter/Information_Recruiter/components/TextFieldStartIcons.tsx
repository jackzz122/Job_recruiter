import { TextField } from "@mui/material";

export const TextFieldStartIcons = ({
  label,
  name,
  value,
  listenChange,
  children,
}: {
  label: string;
  name: string;
  value: string;
  listenChange: () => void;
  children: React.ReactNode;
}) => {
  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      value={value}
      onChange={listenChange}
      variant="outlined"
      sx={{ mb: 3 }}
      slotProps={{
        input: {
          startAdornment: children,
        },
      }}
    />
  );
};
