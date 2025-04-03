import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

export const DialogContruct = ({
  name,
  handleClose,
  open,
  children,
}: {
  name: string;
  handleClose: () => void;
  open: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Dialog fullWidth onClose={handleClose} open={open}>
      <DialogTitle textAlign="center">{name}</DialogTitle>
      {children}
    </Dialog>
  );
};
