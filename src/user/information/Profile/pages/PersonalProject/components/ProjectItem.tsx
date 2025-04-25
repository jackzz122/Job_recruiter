import Box from "@mui/material/Typography";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinkIcon from "@mui/icons-material/Link";
import { ItemList } from "../../../components/ItemList";
export const ProjectItem = ({
  _id,
  projectName,
  link,
  handleEdit,
  description,
  role,
  startDate,
  endDate,
}: {
  _id: string;
  role: string;
  startDate: string;
  endDate: string;
  handleEdit: (id: string) => void;
  projectName: string;
  link: string;
  description: string;
}) => {
  return (
    <>
      <ItemList type="projects" id={_id} onEdit={handleEdit}>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              {projectName}
            </Typography>

            <Button
              size="small"
              startIcon={<LinkIcon />}
              href={`${link}`}
              target="_blank"
            >
              Your link project
            </Button>
          </Box>
          <Typography
            variant="subtitle2"
            sx={{ color: "gray", marginBlock: 1 }}
            fontStyle="italic"
          >
            {role} - {startDate} - {endDate}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {description}
          </Typography>
        </Box>
      </ItemList>
    </>
  );
};
