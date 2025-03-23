import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
export const DialogEmployeeAccount = ({
  open,
  closeAccountFunct,
}: {
  open: boolean;
  closeAccountFunct: () => void;
}) => {
  return (
    <Dialog open={open} onClose={closeAccountFunct}>
      <DialogTitle>Create Employee account</DialogTitle>
    </Dialog>
  );
};
