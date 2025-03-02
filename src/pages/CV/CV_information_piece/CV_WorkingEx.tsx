import { useState } from "react";
import { LayoutForCV_infor } from "../../../components/Layout/LayoutForCV_infor";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
export const CV_WorkingEx = () => {
  const [isExperience, setIsExperience] = useState(false);

  return (
    <LayoutForCV_infor title="Working Experience">
      <Stack direction="row" spacing={2}>
        <Button
          onClick={() => setIsExperience(false)}
          fullWidth
          sx={
            isExperience
              ? { color: "red", border: "1px solid red" }
              : { backgroundColor: "red", color: "white" }
          }
        >
          No experience
        </Button>
        <Button
          onClick={() => setIsExperience(true)}
          fullWidth
          sx={
            !isExperience
              ? { color: "red", border: "1px solid red" }
              : { backgroundColor: "red", color: "white" }
          }
        >
          Experience
        </Button>
      </Stack>
      {!isExperience ? (
        <p>No Experience</p>
      ) : (
        <form>
          <TextField
            fullWidth
            sx={{ marginBlock: "0.75rem" }}
            label="Company name"
          />
          <TextField
            fullWidth
            sx={{ marginBlock: "0.75rem" }}
            label="Position"
          />
          <TextField
            fullWidth
            sx={{ marginBlock: "0.75rem" }}
            label="Details description for this position"
            multiline
            rows={5}
          />
          <TextField
            fullWidth
            sx={{ marginBlock: "0.75rem" }}
            label="Technologies used for this position"
            multiline
            rows={2}
          />
        </form>
      )}
    </LayoutForCV_infor>
  );
};
