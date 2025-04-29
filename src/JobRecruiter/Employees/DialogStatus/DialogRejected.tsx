import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { statusApplication } from "../../../types/JobType";
export const DialogRejected = ({
  loading,
  handleRejected,
  openRejected,
  handleCloseRejected,
}: {
  loading: boolean;
  handleRejected: (status: string) => void;
  openRejected: boolean;
  handleCloseRejected: () => void;
}) => {
  return (
    <Dialog
      open={openRejected}
      onClose={handleCloseRejected}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ fontWeight: "bold", color: "#d32f2f" }}>
        Reject Application
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Typography variant="subtitle1" fontWeight="medium" mb={2}>
          Select email notification option:
        </Typography>

        <FormControl component="fieldset" sx={{ width: "100%" }}>
          <RadioGroup defaultValue="automatic">
            <Box
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                p: 2,
                mb: 2,
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              <FormControlLabel
                value="automatic"
                control={<Radio color="error" />}
                label={
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      Automatic Email
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Send standard rejection email to the candidate.
                    </Typography>
                  </Box>
                }
              />
            </Box>

            <Box
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                p: 2,
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              <FormControlLabel
                value="custom"
                control={<Radio color="error" />}
                label={
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      Custom Email
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Create personalized rejection email for this candidate.
                    </Typography>
                  </Box>
                }
              />
            </Box>
          </RadioGroup>
        </FormControl>

        <Box sx={{ mt: 3, mb: 1, display: "none" }}>
          <Typography variant="subtitle2" fontWeight="medium" mb={1}>
            Reply to Candidate
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Write your custom rejection message here..."
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
              },
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ padding: 2 }}>
        <Button
          variant="outlined"
          onClick={handleCloseRejected}
          sx={{ borderRadius: 1 }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => handleRejected(statusApplication.Rejected)}
          variant="contained"
          loading={loading}
          color="error"
          sx={{
            borderRadius: 1,
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
              backgroundColor: "#b71c1c",
            },
          }}
        >
          Reject
        </Button>
      </DialogActions>
    </Dialog>
  );
};
