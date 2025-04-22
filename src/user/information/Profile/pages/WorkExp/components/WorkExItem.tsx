import { ItemList } from "../../../components/ItemList";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
export const WorkExItem = ({
  jobTitle,
  company,
  startDate,
  endDate,
  responsibilites,
}: {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  responsibilites: string;
}) => {
  return (
    <>
      <ItemList>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {jobTitle}
          </Typography>
          <Typography color="text.secondary">
            {company} • {startDate} - {endDate ? endDate : "Present"}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {responsibilites}
          </Typography>
        </Box>
      </ItemList>
    </>
  );
};
