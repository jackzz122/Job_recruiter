import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

// Icons
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import ReportIcon from "@mui/icons-material/Report";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import { themeColors } from "../../utils/themeColor";
import { StatCard } from "./components/StatCard";
import { useGetAllJobsQuery } from "../../redux/feature/job/jobApiSlice";
import { useGetPendingListQuery } from "../../redux/feature/pending/pendingApiSlice";
import { PendingStatus } from "../../types/PendingStatus";
import { statusJob } from "../../types/JobType";
import * as XLSX from "xlsx";

export const Dashboard = () => {
  const { data: jobs, isLoading: isLoadingJobs } = useGetAllJobsQuery();
  const { data: pendingList, isLoading: isLoadingPending } =
    useGetPendingListQuery();

  const activeJobs =
    jobs?.data?.filter((job) => job.status === statusJob.OnGoing) || [];
  const pendingRecruiters =
    pendingList?.data?.filter(
      (pending) => pending.status === PendingStatus.PENDING
    ) || [];
  const approvedRecruiters =
    pendingList?.data?.filter(
      (pending) => pending.status === PendingStatus.APPROVED
    ) || [];

  const statsData = [
    {
      title: "Total Recruiters",
      count: (approvedRecruiters.length + pendingRecruiters.length).toString(),
      icon: <PeopleIcon />,
      color: themeColors.primary,
    },
    {
      title: "Active Jobs",
      count: activeJobs.length.toString(),
      icon: <WorkIcon />,
      color: themeColors.secondary,
    },
    {
      title: "Approved Recruiters",
      count: approvedRecruiters.length.toString(),
      icon: <BusinessIcon />,
      color: themeColors.tertiary,
    },
    {
      title: "Pending Approvals",
      count: pendingRecruiters.length.toString(),
      icon: <ReportIcon />,
      color: themeColors.primary,
    },
  ];

  const handleExportToExcel = () => {
    // Prepare data for export
    const jobsData = activeJobs.map((job) => ({
      "Job Title": job.title,
      Company:
        typeof job.companyId === "string"
          ? job.companyId
          : job.companyId.companyName,
      Status: job.status,
      Applicants: job.listAccount?.length || 0,
      "Created At": new Date(job.createdAt).toLocaleDateString(),
    }));

    const recruitersData = [...approvedRecruiters, ...pendingRecruiters].map(
      (recruiter) => ({
        Email: recruiter.email,
        Status: recruiter.status,
        "Created At": new Date(recruiter.createdAt).toLocaleDateString(),
      })
    );

    // Create workbook with multiple sheets
    const wb = XLSX.utils.book_new();

    // Add jobs sheet
    const jobsSheet = XLSX.utils.json_to_sheet(jobsData);
    XLSX.utils.book_append_sheet(wb, jobsSheet, "Active Jobs");

    // Add recruiters sheet
    const recruitersSheet = XLSX.utils.json_to_sheet(recruitersData);
    XLSX.utils.book_append_sheet(wb, recruitersSheet, "Recruiters");

    // Save the file
    XLSX.writeFile(wb, "dashboard_report.xlsx");
  };

  if (isLoadingJobs || isLoadingPending) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, bgcolor: "#FFF8F3" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" color={themeColors.text}>
          Dashboard Overview
        </Typography>
        <Button
          variant="contained"
          startIcon={<FileDownloadIcon />}
          onClick={handleExportToExcel}
          sx={{
            bgcolor: themeColors.primary,
            "&:hover": {
              bgcolor: themeColors.secondary,
            },
          }}
        >
          Export to Excel
        </Button>
      </Stack>

      <Grid2 container spacing={3}>
        {statsData.map((stat, index) => (
          <StatCard key={index} index={index} stat={stat} />
        ))}
      </Grid2>

      {/* Recent Activity */}
      <Grid2 container spacing={3} mt={1}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              boxShadow: "0 2px 8px rgba(255, 107, 0, 0.1)",
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom color={themeColors.text}>
                Recent Jobs
              </Typography>
              <Stack spacing={2}>
                {activeJobs.slice(0, 5).map((job) => (
                  <Box
                    key={job._id}
                    sx={{
                      p: 2,
                      bgcolor: "#FFF8F3",
                      borderRadius: 1,
                      border: `1px solid ${themeColors.tertiary}`,
                    }}
                  >
                    <Typography variant="subtitle1" color={themeColors.text}>
                      {job.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {typeof job.companyId === "string"
                        ? job.companyId
                        : job.companyId.companyName}
                    </Typography>
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
                Recent Recruiters
              </Typography>
              <Stack spacing={2}>
                {[...approvedRecruiters, ...pendingRecruiters]
                  .slice(0, 5)
                  .map((recruiter) => (
                    <Box
                      key={recruiter._id}
                      sx={{
                        p: 2,
                        bgcolor: "#FFF8F3",
                        borderRadius: 1,
                        border: `1px solid ${themeColors.tertiary}`,
                      }}
                    >
                      <Typography variant="subtitle1" color={themeColors.text}>
                        {recruiter.email}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {recruiter.status}
                      </Typography>
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
