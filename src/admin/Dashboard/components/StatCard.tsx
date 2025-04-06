import Grid2 from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { themeColors } from "../../../utils/themeColor";

export const StatCard = ({
  index,
  stat,
}: {
  index: number;
  stat: { title: string; count: string; icon: React.ReactNode; color: string };
}) => {
  return (
    <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={index}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          boxShadow: "0 2px 8px rgba(255, 107, 0, 0.1)", // Orange tinted shadow
          borderRadius: 2,
        }}
      >
        <Avatar
          sx={{
            bgcolor: `${stat.color}15`,
            color: stat.color,
            width: 40,
            height: 40,
          }}
        >
          {stat.icon}
        </Avatar>
        <Typography variant="h4" fontWeight="bold" color={themeColors.text}>
          {stat.count}
        </Typography>
        <Typography color="text.secondary">{stat.title}</Typography>
      </Paper>
    </Grid2>
  );
};
