import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
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
import Button from "@mui/material/Button";

import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Work as WorkIcon,
  Assessment as AssessmentIcon,
  CheckCircle as CheckCircleIcon,
  FileDownload as FileDownloadIcon,
} from "@mui/icons-material";

import { useGetJobPostingsQuery } from "../../redux/feature/job/jobApiSlice";
import { statusJob } from "../../types/JobType";
import * as XLSX from "xlsx";
import { StatCard } from "./components/StatCard";
import { CompanyType } from "../../types/CompanyType";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/feature/user/userSlice";

// Types for our dashboard data
interface DashboardStats {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  conversionRate: number;
}

export const Dashboard = () => {
  const user = useSelector(selectUser);
  const {
    data: jobs,
    isLoading,
    refetch,
  } = useGetJobPostingsQuery((user?.companyId as CompanyType)?._id || "", {
    skip: !user?.companyId,
  });
  useEffect(() => {
    if (user?.companyId) {
      refetch();
    }
  }, [user?.companyId, refetch]);
  const [stats, setStats] = useState<DashboardStats>({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    conversionRate: 0,
  });

  useEffect(() => {
    if (jobs?.data) {
      const activeJobs = jobs.data.filter(
        (job) => job.status === statusJob.OnGoing
      );
      const totalApplications = activeJobs.reduce(
        (acc, job) => acc + (job.listAccount?.length || 0),
        0
      );
      const conversionRate =
        activeJobs.length > 0
          ? Math.round((totalApplications / activeJobs.length) * 100)
          : 0;

      setStats({
        totalJobs: jobs.data.length,
        activeJobs: activeJobs.length,
        totalApplications,
        conversionRate,
      });
    }
  }, [jobs]);

  const handleExportToExcel = () => {
    if (!jobs?.data) return;

    const activeJobs = jobs.data.filter(
      (job) => job.status === statusJob.OnGoing
    );

    // Prepare jobs data
    const jobsData = activeJobs.map((job) => ({
      "Job Title": job.title,
      Status: job.status,
      Applicants: job.listAccount?.length || 0,
      "Created At": new Date(job.createdAt).toLocaleDateString(),
      Location: job.location,
    }));

    // Prepare applications data
    const applicationsData = activeJobs.flatMap((job) =>
      (job.listAccount || []).map((applicant) => ({
        "Job Title": job.title,
        "Applied Date": new Date(job.createdAt).toLocaleDateString(),
        Status: applicant.status || "Pending",
      }))
    );

    // Create workbook with multiple sheets
    const wb = XLSX.utils.book_new();

    // Add jobs sheet
    const jobsSheet = XLSX.utils.json_to_sheet(jobsData);
    XLSX.utils.book_append_sheet(wb, jobsSheet, "Active Jobs");

    // Add applications sheet
    const applicationsSheet = XLSX.utils.json_to_sheet(applicationsData);
    XLSX.utils.book_append_sheet(wb, applicationsSheet, "Applications");

    // Save the file
    XLSX.writeFile(wb, "recruiter_dashboard_report.xlsx");
  };

  if (isLoading) {
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
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#FF6B35",
              fontWeight: "bold",
            }}
          >
            Dashboard Overview
          </Typography>
          <Button
            variant="contained"
            startIcon={<FileDownloadIcon />}
            onClick={handleExportToExcel}
            sx={{
              bgcolor: "#FF6B35",
              "&:hover": {
                bgcolor: "#FF8B5A",
              },
            }}
          >
            Export to Excel
          </Button>
        </Stack>

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
              title="Active Jobs"
              value={stats.activeJobs}
              icon={AssessmentIcon}
              color="success"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Total Applications"
              value={stats.totalApplications}
              icon={PeopleIcon}
              color="info"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Applications per Job"
              value={stats.conversionRate}
              icon={TrendingUpIcon}
              color="warning"
            />
          </Grid2>
        </Grid2>
      </Paper>

      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, md: 8 }}>
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
              Recent Applications
            </Typography>
            <List sx={{ width: "100%" }}>
              {jobs?.data
                ?.filter((job) => job.status === statusJob.OnGoing)
                .slice(0, 5)
                .map((job) => (
                  <Box key={job._id}>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon sx={{ color: "#FF6B35" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={job.title}
                        secondary={`${job.listAccount?.length || 0} applicants`}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {new Date(job.createdAt).toLocaleDateString()}
                      </Typography>
                    </ListItem>
                    <Divider />
                  </Box>
                ))}
            </List>
          </Paper>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 4 }}>
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
              Job Status
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Stack direction="row" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Active Jobs</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stats.activeJobs}
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={(stats.activeJobs / stats.totalJobs) * 100}
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
                  <Typography variant="body2">Total Applications</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stats.totalApplications}
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={Math.min(
                    (stats.totalApplications / (stats.activeJobs * 10)) * 100,
                    100
                  )}
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
