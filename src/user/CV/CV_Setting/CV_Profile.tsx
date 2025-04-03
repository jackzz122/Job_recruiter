import { LayoutForCV_infor } from "../components/LayoutForCV_infor";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
const stylesForInput = {
  marginBottom: "1rem",
};
export const CV_Profile = () => {
  return (
    <LayoutForCV_infor title="Profile Information">
      <Stack direction="row" spacing={1}>
        <form action="" className="grow">
          <TextField required label="Full Name" fullWidth sx={stylesForInput} />
          <TextField
            required
            label="Current Position/Position to apply"
            fullWidth
            sx={stylesForInput}
          />
          <TextField required label="Email" fullWidth sx={stylesForInput} />
          <TextField required label="Email" fullWidth sx={stylesForInput} />
          <TextField required label="Address" fullWidth sx={stylesForInput} />
          <TextField required label="Link" fullWidth sx={stylesForInput} />
        </form>
      </Stack>
    </LayoutForCV_infor>
  );
};
