import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ItemList } from "../../../components/ItemList";

type EducationItemProps = {
  _id: string;
  major: string;
  school: string;
  startDate: string;
  endDate: string;
  onEdit?: (id: string) => void;
};

export const EducationItem = ({
  _id,
  major,
  school,
  startDate,
  endDate,
  onEdit,
}: EducationItemProps) => {
  return (
    <>
      <ItemList type="education" id={_id} onEdit={onEdit}>
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
