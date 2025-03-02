import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { CV_Profile } from "./CV_information_piece/CV_Profile";
import { CV_Summary } from "./CV_information_piece/CV_Summary";
import { CV_WorkingEx } from "./CV_information_piece/CV_WorkingEx";
export const CreateCVPage = () => {
  return (
    <>
      <Stack
        sx={{ border: "1px solid black" }}
        padding={1}
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6" fontWeight="bold">
          John Nguyen.pdf
        </Typography>
        <Typography variant="body1" fontStyle="italic">
          Languages: Vietnamese
        </Typography>
      </Stack>
      <Box>
        <CV_Profile />
        <CV_Summary />
        <CV_WorkingEx />
      </Box>
    </>
  );
};
