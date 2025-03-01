import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
export const DialogUploadCV = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  return (
    <Dialog fullWidth onClose={handleClose} open={open}>
      <DialogTitle textAlign="center">Upload CV from computer</DialogTitle>
      <br />
      <Typography variant="body2" sx={{ paddingInline: "2rem" }}>
        Upload your CV (Support file *.doc, *.docx, *.pdf, and less than 5MB)
      </Typography>
      <Stack sx={{ padding: "2rem" }} direction="row" spacing={1}>
        <TextField
          sx={{ flexGrow: 1 }}
          disabled
          label="Your CV information will be here"
        />
        <Button
          variant="contained"
          sx={{ backgroundColor: "red", color: "white" }}
        >
          Upload CV
        </Button>
      </Stack>
      <Stack
        sx={{ paddingInline: "2rem", marginBottom: "1rem" }}
        direction="row"
        spacing={2}
      >
        <Button
          variant="outlined"
          sx={{ border: "1px solid red", color: "red" }}
          fullWidth
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "red", color: "white" }}
          fullWidth
        >
          Save
        </Button>
      </Stack>
    </Dialog>
  );
};
