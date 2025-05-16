import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const StatCard = ({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
}) => {
  return (
    <Card
      sx={{
        height: "100%",
        background: "linear-gradient(135deg, #fff 0%, #fff 100%)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              {title}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                color: "#FF6B35",
                fontWeight: "bold",
              }}
            >
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 2,
              borderRadius: "50%",
              bgcolor: "#FFF5F0",
              color: "#FF6B35",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon fontSize="large" />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
