import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
interface InforComp {
  icons: React.ReactNode;
  name: string;
  info: string;
}
export default function InforCompany(props: InforComp) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        marginBottom: "0.75rem",
      }}
    >
      {props.icons}
      <div>
        <Typography>{props.name}</Typography>
        <Typography fontWeight="bold">{props.info}</Typography>
      </div>
    </Box>
  );
}
