import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import TextField from "@mui/material/TextField";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
export const DialogApplication = ({
  handleClose,
  open,
  title,
}: {
  handleClose: () => void;
  open: boolean;
  title: string;
}) => {
  return (
    <Dialog fullWidth onClose={handleClose} open={open}>
      <DialogTitle textAlign="center">{title}</DialogTitle>
      <form action="">
        <Box
          sx={{
            border: "1px dotted red",
            marginInline: "1rem",
            borderRadius: "1rem",
            padding: "1rem",
          }}
        >
          <Typography>
            {" "}
            <FolderSharedIcon /> Choose your CV
          </Typography>
          <form action="">
            <TextField fullWidth />
          </form>
        </Box>
        <Box
          sx={{
            marginInline: "1rem",
            padding: "1rem",
            marginTop: ".75rem",
          }}
        >
          <Typography>
            {" "}
            <HistoryEduIcon sx={{ color: "red" }} /> Write your introduce letter
          </Typography>
          <Typography variant="body2" fontStyle="italic" paddingBlock={1}>
            Một thư giới thiệu ngắn gọn, chỉn chu sẽ giúp bạn trở nên chuyên
            nghiệp và gây ấn tượng hơn với nhà tuyển dụng.
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={5}
            label="Introduce letter"
            sx={{ marginTop: "1rem" }}
            placeholder="Write about short information to introduce yourself to recruiter"
          />
        </Box>
        <Stack paddingInline={4} direction="row" marginBottom={3} spacing={1}>
          <Button
            variant="outlined"
            sx={{ border: "1px solid red", color: "red" }}
          >
            Cancel
          </Button>
          <Button
            sx={{ flexGrow: 2, backgroundColor: "red", color: "white" }}
            variant="contained"
          >
            Nộp Hồ Sơ
          </Button>
        </Stack>
      </form>
    </Dialog>
  );
};
