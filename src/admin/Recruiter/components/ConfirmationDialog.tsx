import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

type ConfirmationDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  content: string;
  confirmText: string;
  cancelText: string;
  isLoading: boolean;
  confirmColor?: "primary" | "error" | "success" | "warning";
  titleColor?: string;
};

export const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  content,
  confirmText,
  cancelText,
  isLoading,
  confirmColor = "primary",
  titleColor,
}: ConfirmationDialogProps) => (
  <Dialog
    open={open}
    onClose={() => !isLoading && onClose()}
    maxWidth="xs"
    fullWidth
  >
    <DialogTitle sx={{ color: titleColor }}>{title}</DialogTitle>
    <DialogContent>{content}</DialogContent>
    <DialogActions>
      <Button onClick={onClose} disabled={isLoading}>
        {cancelText}
      </Button>
      <Button
        onClick={onConfirm}
        variant="contained"
        color={confirmColor}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : confirmText}
      </Button>
    </DialogActions>
  </Dialog>
);
