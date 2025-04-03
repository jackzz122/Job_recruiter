import { LayoutForCV_infor } from "../components/LayoutForCV_infor";
import TextField from "@mui/material/TextField";
export const CV_Summary = () => {
  return (
    <LayoutForCV_infor title="Summary">
      <form action="">
        <TextField label="Introduce yourself" multiline rows={5} fullWidth />
      </form>
    </LayoutForCV_infor>
  );
};
