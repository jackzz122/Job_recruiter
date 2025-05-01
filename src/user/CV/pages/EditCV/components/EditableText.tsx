import Typography from "@mui/material/Typography";
import { SxProps, Theme } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { useGenerateTextAiMutation } from "../../../../../redux/feature/user/userApiSlice";
import { handleError } from "../../../../../helper/HandleError/handleError";
import CircularProgress from "@mui/material/CircularProgress";

type EditableTextProps = {
  title?: string;
  value: string;
  variant?: "body1" | "body2" | "subtitle1" | "subtitle2" | "h6" | "h4";
  color?: "text.primary" | "text.secondary";
  fontWeight?: "normal" | "bold";
  sx?: SxProps<Theme>;
  onSave?: (newValue: string) => void;
};

export const EditableText = ({
  title,
  value,
  variant = "body1",
  color = "text.secondary",
  fontWeight = "normal",
  sx,
  onSave,
}: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [generateText, { isLoading }] = useGenerateTextAiMutation();

  // Update currentValue when the prop value changes
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleFocus = () => {
    if (!isLoading) {
      setIsEditing(true);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLSpanElement>) => {
    if (!isLoading) {
      setTimeout(() => {
        setIsEditing(false);
        const newValue = e.target.innerHTML;
        setCurrentValue(newValue);
        if (onSave) {
          onSave(newValue);
        }
      }, 800);
    }
  };

  const handleAiSuggest = async () => {
    try {
      if (title) {
        console.log("AI suggestion requested for:", currentValue);
        const response = await generateText({
          content: currentValue,
          field: title,
        });
        if (response.data?.success) {
          console.log(response);
          setCurrentValue(response.data.data.improved);
          if (onSave) {
            onSave(response.data.data.improved);
          }
        }
      }
    } catch (err) {
      const error = handleError(err);
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        ...sx,
      }}
    >
      <Typography
        variant={variant}
        color={color}
        fontWeight={fontWeight}
        sx={{
          flexGrow: 1,
          "& [contentEditable]": {
            outline: "none",
            minWidth: "20px",
            display: "inline-block",
            cursor: isLoading ? "not-allowed" : "text",
            "&:hover": {
              backgroundColor: !isLoading
                ? "rgba(0, 0, 0, 0.04)"
                : "transparent",
            },
          },
        }}
      >
        <span
          contentEditable={!isLoading}
          suppressContentEditableWarning={!isLoading}
          dangerouslySetInnerHTML={{ __html: currentValue }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-label="Editable text"
          tabIndex={isLoading ? -1 : 0}
          style={{
            backgroundColor: isLoading ? "rgba(0, 0, 0, 0.08)" : "transparent",
            padding: isLoading ? "4px 8px" : "0",
            borderRadius: isLoading ? "4px" : "0",
            transition: "background-color 0.3s ease",
            pointerEvents: isLoading ? "none" : "auto",
          }}
        />
      </Typography>

      {isEditing && title && (
        <Button
          size="small"
          disabled={isLoading}
          onClick={handleAiSuggest}
          sx={{
            ml: 2,
            whiteSpace: "nowrap",
            minWidth: "auto",
            flexShrink: 0,
          }}
          startIcon={
            isLoading ? <CircularProgress size={16} color="inherit" /> : null
          }
        >
          {isLoading ? "Đang tạo..." : "✨ Gợi ý AI"}
        </Button>
      )}
    </Box>
  );
};
