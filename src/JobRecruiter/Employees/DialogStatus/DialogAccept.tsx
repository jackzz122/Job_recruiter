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
import { useState } from "react";
import { statusApplication } from "../../../types/JobType";
import { colorButtonOrange } from "../../../themeContext";

export const DialogAccept = ({
  loading,
  openAccept,
  handleAccept,
  handleCloseAccept,
}: {
  loading: boolean;
  handleAccept: (status: string) => void;
  openAccept: boolean;
  handleCloseAccept: () => void;
}) => {
  const [option, setOption] = useState("automatic");
  const [customMessage, setCustomMessage] = useState("");
  return (
    <Dialog
      open={openAccept}
      onClose={handleCloseAccept}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ fontWeight: "bold", color: colorButtonOrange }}>
        Accept Application
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Typography variant="subtitle1" fontWeight="medium" mb={2}>
          Select email notification option:
        </Typography>

        <FormControl component="fieldset" sx={{ width: "100%" }}>
          <RadioGroup
            value={option}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOption(e.target.value)
            }
          >
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
                control={<Radio color="primary" />}
                label={
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      Automatic Email
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Send standard acceptance email to the candidate.
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
                control={<Radio color="primary" />}
                label={
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      Custom Email
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Create personalized email for this candidate.
                    </Typography>
                  </Box>
                }
              />
            </Box>
          </RadioGroup>
        </FormControl>

        {option === "custom" && (
          <Box sx={{ mt: 3, mb: 1 }}>
            <Typography variant="subtitle2" fontWeight="medium" mb={1}>
              Reply to Candidate
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Write your custom acceptance message here..."
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                },
              }}
            />
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ padding: 2 }}>
        <Button
          variant="outlined"
          onClick={handleCloseAccept}
          sx={{
            borderRadius: 1,
            color: colorButtonOrange,
            border: `1px solid ${colorButtonOrange}`,
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          loading={loading}
          onClick={() => handleAccept(statusApplication.Success)}
          sx={{
            borderRadius: 1,
            boxShadow: "none",
            backgroundColor: colorButtonOrange,
            "&:hover": {
              boxShadow: "none",
              backgroundColor: colorButtonOrange,
            },
          }}
        >
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
};
