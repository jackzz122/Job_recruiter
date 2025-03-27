import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { colorButtonOrange } from "../../../themeContext";
export const DialogEmployeeAccount = ({
  open,
  closeAccountFunct,
}: {
  open: boolean;
  closeAccountFunct: () => void;
}) => {
  return (
    <Dialog fullWidth open={open} onClose={closeAccountFunct}>
      <DialogTitle textAlign="center">Create Employee account</DialogTitle>
      <DialogContent sx={{ marginTop: 2.5 }}>
        <form onSubmit={(e) => e.preventDefault()}>
          <TextField label="Email" fullWidth sx={{ marginBlock: 1 }} />
          <TextField label="Phone Number" fullWidth sx={{ marginBlock: 1 }} />
          <TextField
            label="Password"
            type="password"
            fullWidth
            sx={{ marginBlock: 1 }}
          />
          <Button
            fullWidth
            sx={{ backgroundColor: colorButtonOrange, color: "white" }}
            variant="contained"
            type="submit"
          >
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
