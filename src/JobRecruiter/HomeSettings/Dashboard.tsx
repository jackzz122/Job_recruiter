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
  People as PeopleIcon,
  Work as WorkIcon,
  Assessment as AssessmentIcon,
  CheckCircle as CheckCircleIcon,
  FileDownload as FileDownloadIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";

import { useGetJobPostingsQuery } from "../../redux/feature/job/jobApiSlice";
import { statusJob } from "../../types/JobType";
import * as XLSX from "xlsx";
import { StatCard } from "./components/StatCard";
import { CompanyType } from "../../types/CompanyType";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/feature/user/userSlice";

interface DashboardStats {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  successfulHires: number;
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
    successfulHires: 0,
  });

  const countSuccessfulHiresInJob = (job) => {
    if (!job.listAccount || !Array.isArray(job.listAccount)) return 0;

    return job.listAccount.filter((account) => account.status === "Success")
      .length;
  };

  useEffect(() => {
    if (jobs?.data) {
      const activeJobs = jobs.data.filter(
        (job) => job.status === statusJob.OnGoing
      );

      const totalApplications = jobs.data.reduce(
        (acc, job) => acc + (job.listAccount?.length || 0),
        0
      );

      const successfulHires = jobs.data.reduce(
        (acc, job) => acc + countSuccessfulHiresInJob(job),
        0
      );

      setStats({
        totalJobs: jobs.data.length,
        activeJobs: activeJobs.length,
        totalApplications,
        successfulHires,
      });
    }
  }, [jobs]);

  const handleExportToExcel = () => {
    if (!jobs?.data) return;

    const activeJobs = jobs.data.filter(
      (job) => job.status === statusJob.OnGoing
    );

    // Prepare jobs data with successful hires
    const jobsData = activeJobs.map((job) => ({
      "Job Title": job.title,
      Status: job.status,
      Applicants: job.listAccount?.length || 0,
      "Successful Hires": countSuccessfulHiresInJob(job),
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

    // Prepare successful hires summary
    const hiresData = jobs.data.map((job) => ({
      "Job Title": job.title,
      "Total Applications": job.listAccount?.length || 0,
      "Successful Hires": countSuccessfulHiresInJob(job),
    }));

    // Create workbook with multiple sheets
    const wb = XLSX.utils.book_new();

    // Add jobs sheet
    const jobsSheet = XLSX.utils.json_to_sheet(jobsData);
    XLSX.utils.book_append_sheet(wb, jobsSheet, "Active Jobs");

    // Add applications sheet
    const applicationsSheet = XLSX.utils.json_to_sheet(applicationsData);
    XLSX.utils.book_append_sheet(wb, applicationsSheet, "Applications");

    // Add successful hires sheet
    const hiresSheet = XLSX.utils.json_to_sheet(hiresData);
    XLSX.utils.book_append_sheet(wb, hiresSheet, "Successful Hires");

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
    <Box sx={{ background: "#F8F9FA", height: "100vh" }}>
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
              title="Successful Hires"
              value={stats.successfulHires}
              icon={PersonAddIcon}
              color="success"
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
                .map((job) => {
                  const successfulHires = countSuccessfulHiresInJob(job);
                  return (
                    <Box key={job._id}>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon sx={{ color: "#FF6B35" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={job.title}
                          secondary={`${
                            job.listAccount?.length || 0
                          } applicants • ${successfulHires} hired`}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {new Date(job.createdAt).toLocaleDateString()}
                        </Typography>
                      </ListItem>
                      <Divider />
                    </Box>
                  );
                })}
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
              Hiring Statistics
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
                  value={
                    stats.totalJobs > 0
                      ? (stats.activeJobs / stats.totalJobs) * 100
                      : 0
                  }
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
                    stats.activeJobs > 0
                      ? (stats.totalApplications / (stats.activeJobs * 10)) *
                          100
                      : 0,
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
