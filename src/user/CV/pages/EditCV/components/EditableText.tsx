import Typography from "@mui/material/Typography";
import { SxProps, Theme } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useState, useEffect, useRef } from "react";
import { useGenerateTextAiMutation } from "../../../../../redux/feature/user/userApiSlice";
import { handleError } from "../../../../../helper/HandleError/handleError";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
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
  const editableRef = useRef<HTMLSpanElement>(null);
  const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    return () => {
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
    };
  }, []);

  const handleTypographyClick = () => {
    if (!isLoading && editableRef.current) {
      editableRef.current.focus();
      setIsEditing(true);
    }
  };

  const handleFocus = () => {
    if (!isLoading) {
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
        blurTimeoutRef.current = null;
      }
      setIsEditing(true);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLSpanElement>) => {
    if (!isLoading) {
      blurTimeoutRef.current = setTimeout(() => {
        if (document.activeElement !== editableRef.current) {
          setIsEditing(false);
          const newValue = e.target.innerHTML;
          setCurrentValue(newValue);
          if (onSave) {
            onSave(newValue);
          }
        }
        blurTimeoutRef.current = null;
      }, 200);
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
      toast.error(error?.message || "AI suggestion failed");
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
        onClick={handleTypographyClick}
        sx={{
          flexGrow: 1,
          cursor: isLoading ? "not-allowed" : "text",
          "& [contentEditable]": {
            outline: "none",
            minWidth: "20px",
            display: "block",
            cursor: "inherit",
            "&:hover": {
              backgroundColor: !isLoading
                ? "rgba(0, 0, 0, 0.04)"
                : "transparent",
            },
          },
        }}
      >
        <span
          ref={editableRef}
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
