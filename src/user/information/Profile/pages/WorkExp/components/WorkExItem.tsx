import { ItemList } from "../../../components/ItemList";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
export const WorkExItem = ({
  _id,
  jobTitle,
  company,
  startDate,
  endDate,
  responsibilites,
  description,
  handleEdit,
}: {
  _id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  responsibilites: string;
  description: string;
  handleEdit: (id: string) => void;
}) => {
  return (
    <>
      <ItemList id={_id} type="workEx" onEdit={handleEdit}>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {jobTitle}
          </Typography>
          <Typography color="text.secondary">
            {company} • {startDate} - {endDate ? endDate : "Present"}
          </Typography>
          <Typography textAlign="justify" variant="body2" sx={{ mt: 1 }}>
            <b> Responsible:</b> {responsibilites}
          </Typography>
          <Typography textAlign="justify" variant="body2" sx={{ mt: 1 }}>
            <b>Description: </b> {description}
          </Typography>
        </Box>
      </ItemList>
    </>
  );
};
