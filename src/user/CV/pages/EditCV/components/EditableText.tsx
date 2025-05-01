import Typography from "@mui/material/Typography";
import { SxProps, Theme } from "@mui/material";

type EditableTextProps = {
  value: string;
  variant?: "body1" | "body2" | "subtitle1" | "subtitle2" | "h6" | "h4";
  color?: "text.primary" | "text.secondary";
  fontWeight?: "normal" | "bold";
  sx?: SxProps<Theme>;
};

export const EditableText = ({
  value,
  variant = "body1",
  color = "text.secondary",
  fontWeight = "normal",
  sx,
}: EditableTextProps) => {
  return (
    <Typography
      variant={variant}
      color={color}
      fontWeight={fontWeight}
      sx={{
        "& [contentEditable]": {
          outline: "none",
          minWidth: "20px",
          display: "inline-block",
          cursor: "text",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        },
        ...sx,
      }}
    >
      <span
        contentEditable={true}
        suppressContentEditableWarning={true}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </Typography>
  );
};
