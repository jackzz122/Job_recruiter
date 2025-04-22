import Box from "@mui/material/Typography";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import LinkIcon from "@mui/icons-material/Link";
export const ProjectItem = ({
  projectName,
  link,
  description,
}: {
  projectName: string;
  link: string;
  description: string;
}) => {
  return (
    <>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
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
        <Typography variant="body2" sx={{ mt: 1 }}>
          {description}
        </Typography>
      </Box>
      <Divider />
    </>
  );
};
