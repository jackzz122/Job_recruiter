import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { ItemList } from "../../../components/ItemList";
export const EducationItem = ({
  major,
  school,
  startDate,
  endDate,
}: {
  major: string;
  school: string;
  startDate: string;
  endDate: string;
}) => {
  return (
    <>
      <ItemList>
        <Box marginBlock={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            Ngành nghề: {major}
          </Typography>
          <Typography color="text.secondary">Trường: {school}</Typography>
          <Typography color="text.secondary">
            (Thời gian bắt đầu - Kết thúc): {startDate} - {endDate}
          </Typography>
        </Box>
      </ItemList>
    </>
  );
};
