import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import { colorButtonOrange } from "../../../../themeContext";
interface EditDialogProps {
  open: boolean;
  onClose: () => void;
  submit: () => void;
  loading: boolean;
  title: string;
  children: React.ReactNode;
}

export const EditDialog = ({
  open,
  onClose,
  submit,
  title,
  loading,
  children,
}: EditDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button color="warning" onClick={onClose}>
          Cancel
        </Button>
        <Button
          sx={{ bgcolor: colorButtonOrange }}
          variant="contained"
          color="primary"
          loading={loading}
          onClick={submit}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
