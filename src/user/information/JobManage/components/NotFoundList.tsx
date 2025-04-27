import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
export const NotFoundList = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={2}
      sx={{
        minHeight: "200px",
        backgroundColor: "white",
        borderRadius: "16px",
        padding: "24px",
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        No {title} yet
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center">
        When you {content}, they will appear here.
        <br />
        Start exploring opportunities now!
      </Typography>
    </Stack>
  );
};
