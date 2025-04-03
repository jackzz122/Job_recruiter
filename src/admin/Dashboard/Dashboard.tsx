import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid2 from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";

// Icons
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import ReportIcon from "@mui/icons-material/Report";

import { LineChart, PieChart, BarChart } from "@mui/x-charts";

const themeColors = {
  primary: "#FF6B00",
  secondary: "#FF8A3D",
  tertiary: "#FFB27D",
  background: "#FFFFFF",
  text: "#2C2C2C",
};

export const Dashboard = () => {
  const statsData = [
    {
      title: "Total Users",
      count: "2,543",
      icon: <PeopleIcon />,
      color: themeColors.primary,
    },
    {
      title: "Active Jobs",
      count: "1,789",
      icon: <WorkIcon />,
      color: themeColors.secondary,
    },
    {
      title: "Companies",
      count: "432",
      icon: <BusinessIcon />,
      color: themeColors.tertiary,
    },
    {
      title: "Reports",
      count: "25",
      icon: <ReportIcon />,
      color: themeColors.primary,
    },
  ];

  return (
    <Box sx={{ p: 3, bgcolor: "#FFF8F3" }}>
      {" "}
      {/* Slight orange tint background */}
      {/* Stats Cards */}
      <Grid2 container spacing={3}>
        {statsData.map((stat, index) => (
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
              <Typography
                variant="h4"
                fontWeight="bold"
                color={themeColors.text}
              >
                {stat.count}
              </Typography>
              <Typography color="text.secondary">{stat.title}</Typography>
            </Paper>
          </Grid2>
        ))}
      </Grid2>
      {/* Charts */}
      <Grid2 container spacing={3} mt={1}>
        {/* Activity Chart */}
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Card
            sx={{
              boxShadow: "0 2px 8px rgba(255, 107, 0, 0.1)",
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom color={themeColors.text}>
                Platform Activity
              </Typography>
              <Box sx={{ height: 300 }}>
                <LineChart
                  dataset={[
                    { month: "Jan", users: 400, jobs: 240 },
                    { month: "Feb", users: 500, jobs: 320 },
                    { month: "Mar", users: 600, jobs: 450 },
                    { month: "Apr", users: 550, jobs: 380 },
                    { month: "May", users: 700, jobs: 480 },
                  ]}
                  margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
                  xAxis={[{ scaleType: "band", dataKey: "month" }]}
                  series={[
                    {
                      dataKey: "users",
                      label: "Users",
                      color: themeColors.primary,
                    },
                    {
                      dataKey: "jobs",
                      label: "Jobs",
                      color: themeColors.secondary,
                    },
                  ]}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid2>

        {/* Categories Pie Chart */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              boxShadow: "0 2px 8px rgba(255, 107, 0, 0.1)",
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom color={themeColors.text}>
                Job Categories
              </Typography>
              <Box sx={{ height: 300 }}>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 40, label: "Frontend" },
                        { id: 1, value: 30, label: "Backend" },
                        { id: 2, value: 20, label: "Full Stack" },
                        { id: 3, value: 10, label: "DevOps" },
                      ],
                      arcLabel: (item) => `${item.label}`,
                    },
                  ]}
                  height={300}
                  colors={[
                    themeColors.primary,
                    themeColors.secondary,
                    themeColors.tertiary,
                    "#FFD0A8",
                  ]}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid2>

        {/* Applications Bar Chart */}
        <Grid2 size={{ xs: 12 }}>
          <Card
            sx={{
              boxShadow: "0 2px 8px rgba(255, 107, 0, 0.1)",
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom color={themeColors.text}>
                Monthly Applications
              </Typography>
              <Box sx={{ height: 300 }}>
                <BarChart
                  dataset={[
                    { month: "Jan", applications: 150, interviews: 80 },
                    { month: "Feb", applications: 120, interviews: 60 },
                    { month: "Mar", applications: 90, interviews: 45 },
                    { month: "Apr", applications: 60, interviews: 30 },
                  ]}
                  xAxis={[{ scaleType: "band", dataKey: "month" }]}
                  series={[
                    {
                      dataKey: "applications",
                      label: "Applications",
                      color: themeColors.primary,
                    },
                    {
                      dataKey: "interviews",
                      label: "Interviews",
                      color: themeColors.secondary,
                    },
                  ]}
                  height={300}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid2>

        {/* Recent Activity Cards */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              boxShadow: "0 2px 8px rgba(255, 107, 0, 0.1)",
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom color={themeColors.text}>
                Recent Applications
              </Typography>
              <Stack spacing={2}>
                {[1, 2, 3].map((item) => (
                  <Box
                    key={item}
                    sx={{
                      p: 2,
                      bgcolor: "#FFF8F3",
                      borderRadius: 1,
                      border: `1px solid ${themeColors.tertiary}`,
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Typography
                          variant="subtitle1"
                          color={themeColors.text}
                        >
                          Frontend Developer
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Tech Company
                        </Typography>
                      </Box>
                      <Chip
                        label="New"
                        size="small"
                        sx={{
                          bgcolor: themeColors.primary,
                          color: "white",
                        }}
                      />
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              boxShadow: "0 2px 8px rgba(255, 107, 0, 0.1)",
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom color={themeColors.text}>
                New Companies
              </Typography>
              <Stack spacing={2}>
                {[1, 2, 3].map((item) => (
                  <Box
                    key={item}
                    sx={{
                      p: 2,
                      bgcolor: "#FFF8F3",
                      borderRadius: 1,
                      border: `1px solid ${themeColors.tertiary}`,
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Typography
                          variant="subtitle1"
                          color={themeColors.text}
                        >
                          Tech Corp
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Technology
                        </Typography>
                      </Box>
                      <Chip
                        label="Verified"
                        size="small"
                        sx={{
                          bgcolor: themeColors.primary,
                          color: "white",
                        }}
                      />
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
};
