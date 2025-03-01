import { DialogContruct } from "./DialogContruct";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
export const DialogDelete = ({
  handleClose,
  open,
}: {
  handleClose: () => void;
  open: boolean;
}) => {
  return (
    <DialogContruct name="Delete your CV" handleClose={handleClose} open={open}>
      <Typography textAlign="center">
        Are you sure to delete your CV ?
      </Typography>
      <Stack
        sx={{ marginBlock: "2rem", paddingInline: "1rem" }}
        direction="row"
        spacing={1}
      >
        <Button fullWidth sx={{ border: "1px solid red", color: "red" }}>
          Cancel
        </Button>
        <Button fullWidth sx={{ backgroundColor: "red", color: "white" }}>
          Delete
        </Button>
      </Stack>
    </DialogContruct>
  );
};
