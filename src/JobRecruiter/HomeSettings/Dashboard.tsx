import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";

import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Work as WorkIcon,
  Assessment as AssessmentIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

// Types for our dashboard data
interface DashboardStats {
  totalJobs: number;
  activeCandidates: number;
  totalApplications: number;
  conversionRate: number;
}

// Mock data - Replace with actual API calls
const mockStats: DashboardStats = {
  totalJobs: 150,
  activeCandidates: 1200,
  totalApplications: 450,
  conversionRate: 25,
};

const StatCard = ({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
}) => (
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
      <Stack direction="row" justifyContent="space-between" alignItems="center">
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

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats] = useState<DashboardStats>(mockStats);

  useEffect(() => {
    // Simulate API call
    const fetchDashboardData = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('/api/dashboard');
        // const data = await response.json();
        // setStats(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress sx={{ color: "#FF6B35" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ background: "#F8F9FA" }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          background: "white",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            color: "#FF6B35",
            fontWeight: "bold",
          }}
        >
          Dashboard Overview
        </Typography>

        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Total Jobs"
              value={stats.totalJobs}
              icon={WorkIcon}
              color="primary"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Active Candidates"
              value={stats.activeCandidates}
              icon={PeopleIcon}
              color="success"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Total Applications"
              value={stats.totalApplications}
              icon={AssessmentIcon}
              color="info"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Conversion Rate"
              value={stats.conversionRate}
              icon={TrendingUpIcon}
              color="warning"
            />
          </Grid2>
        </Grid2>
      </Paper>

      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, sm: 6, md: 8 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              background: "white",
              borderRadius: 2,
              height: "100%",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                color: "#FF6B35",
                fontWeight: "bold",
              }}
            >
              Recent Activity
            </Typography>
            <List sx={{ width: "100%" }}>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon sx={{ color: "#FF6B35" }} />
                </ListItemIcon>
                <ListItemText
                  primary="New Application Received"
                  secondary="Frontend Developer position"
                />
                <Typography variant="caption" color="text.secondary">
                  2 hours ago
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <ScheduleIcon sx={{ color: "#FF6B35" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Interview Scheduled"
                  secondary="Senior Backend Developer"
                />
                <Typography variant="caption" color="text.secondary">
                  5 hours ago
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <PersonIcon sx={{ color: "#FF6B35" }} />
                </ListItemIcon>
                <ListItemText
                  primary="New Candidate Registered"
                  secondary="John Doe - Full Stack Developer"
                />
                <Typography variant="caption" color="text.secondary">
                  1 day ago
                </Typography>
              </ListItem>
            </List>
          </Paper>
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              background: "white",
              borderRadius: 2,
              height: "100%",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                color: "#FF6B35",
                fontWeight: "bold",
              }}
            >
              Job Categories
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Stack direction="row" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">IT & Software</Typography>
                  <Typography variant="body2" color="text.secondary">
                    40%
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={40}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#FFF5F0",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#FF6B35",
                    },
                  }}
                />
              </Box>
              <Box>
                <Stack direction="row" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Marketing</Typography>
                  <Typography variant="body2" color="text.secondary">
                    30%
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={30}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#FFF5F0",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#FF6B35",
                    },
                  }}
                />
              </Box>
              <Box>
                <Stack direction="row" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Sales</Typography>
                  <Typography variant="body2" color="text.secondary">
                    20%
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={20}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#FFF5F0",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#FF6B35",
                    },
                  }}
                />
              </Box>
              <Box>
                <Stack direction="row" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">HR</Typography>
                  <Typography variant="body2" color="text.secondary">
                    10%
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={10}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#FFF5F0",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#FF6B35",
                    },
                  }}
                />
              </Box>
            </Stack>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
};
