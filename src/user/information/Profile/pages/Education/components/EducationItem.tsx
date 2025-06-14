import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ItemList } from "../../../components/ItemList";

type EducationItemProps = {
  _id: string;
  major: string;
  school: string;
  startDate: string;
  endDate: string;
  description: string;
  onEdit?: (id: string) => void;
};

export const EducationItem = ({
  _id,
  major,
  school,
  startDate,
  endDate,
  description,
  onEdit,
}: EducationItemProps) => {
  return (
    <>
      <ItemList type="education" id={_id} onEdit={onEdit}>
        <Box marginBlock={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            Major: {major}
          </Typography>
          <Typography textAlign="justify" color="text.secondary">
            School: {school}
          </Typography>
          <Typography color="text.secondary">
            (Start Date - End Date): {startDate} - {endDate}
          </Typography>
          <Typography color="text.secondary">
            Description: {description}
          </Typography>
        </Box>
      </ItemList>
    </>
  );
};
