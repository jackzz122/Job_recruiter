import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import ReportIcon from "@mui/icons-material/Report";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { themeColors } from "../../utils/themeColor";
import { useGetAllJobsQuery } from "../../redux/feature/job/jobApiSlice";
import {
  useGetListRecruiterCompanyAccountQuery,
  useGetPendingListQuery,
} from "../../redux/feature/pending/pendingApiSlice";
import { statusJob } from "../../types/JobType";
import * as XLSX from "xlsx";
import { pendingType } from "../../types/pendingType";
import { colorButtonOrange } from "../../themeContext";
import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";

type RecruiterType = {
  _id: string;
  avatarIMG: string;
  name: string;
  companyName: string;
  email: string;
  status: string;
  phone: string;
  createdAt: string;
};

export const Dashboard = () => {
  const { data: jobs, isLoading: isLoadingJobs } = useGetAllJobsQuery();
  const { data: pendingList, isLoading: isLoadingPending } =
    useGetPendingListQuery();
  const { data: recruiterList } = useGetListRecruiterCompanyAccountQuery();

  // Job Statistics
  const activeJobs =
    jobs?.data?.filter((job) => job.status === statusJob.OnGoing) || [];
  const stoppedJobs =
    jobs?.data?.filter((job) => job.status === statusJob.Stop) || [];
  const closedJobs =
    jobs?.data?.filter((job) => job.status === statusJob.Close) || [];

  // Recruiter Statistics
  const pendingRecruiters =
    pendingList?.data?.filter(
      (pending: pendingType) => pending.status === "pending"
    ) || [];
  const approvedRecruiters =
    recruiterList?.data?.filter(
      (recruiter: RecruiterType) => recruiter.status === "approve"
    ) || [];
  const blockedRecruiters =
    recruiterList?.data?.filter(
      (recruiter: RecruiterType) => recruiter.status === "blocked"
    ) || [];

  const statsData = [
    {
      title: "Total Jobs",
      count: jobs?.data?.length.toString() || "0",
      icon: <WorkIcon />,
      color: themeColors.primary,
      subStats: [
        { label: "Active", value: activeJobs.length, color: "success" },
        { label: "Stopped", value: stoppedJobs.length, color: "error" },
        { label: "Closed", value: closedJobs.length, color: "default" },
      ],
    },
    {
      title: "Total Recruiters",
      count: (
        approvedRecruiters.length +
        pendingRecruiters.length +
        blockedRecruiters.length
      ).toString(),
      icon: <PeopleIcon />,
      color: themeColors.secondary,
      subStats: [
        {
          label: "Approved",
          value: approvedRecruiters.length,
          color: "success",
        },
        { label: "Pending", value: pendingRecruiters.length, color: "warning" },
        { label: "Blocked", value: blockedRecruiters.length, color: "error" },
      ],
    },
    {
      title: "Active Jobs",
      count: activeJobs.length.toString(),
      icon: <BusinessIcon />,
      color: themeColors.tertiary,
      subStats: [
        {
          label: "Total Applicants",
          value: activeJobs.reduce(
            (acc, job) => acc + (job.listAccount?.length || 0),
            0
          ),
          color: "info",
        },
      ],
    },
    {
      title: "Pending Approvals",
      count: pendingRecruiters.length.toString(),
      icon: <ReportIcon />,
      color: themeColors.primary,
      subStats: [
        {
          label: "New Requests",
          value: pendingRecruiters.filter(
            (r) => new Date(r.createdAt).getTime() > Date.now() - 86400000
          ).length,
          color: "warning",
        },
      ],
    },
  ];

  const handleExportToExcel = () => {
    // Prepare summary data
    const summaryData = [
      {
        Metric: "Total Jobs",
        Count: jobs?.data?.length || 0,
        Details: `Active: ${activeJobs.length}, Stopped: ${stoppedJobs.length}, Closed: ${closedJobs.length}`,
      },
      {
        Metric: "Total Recruiters",
        Count:
          approvedRecruiters.length +
          pendingRecruiters.length +
          blockedRecruiters.length,
        Details: `Approved: ${approvedRecruiters.length}, Pending: ${pendingRecruiters.length}, Blocked: ${blockedRecruiters.length}`,
      },
      {
        Metric: "Active Jobs",
        Count: activeJobs.length,
        Details: `Total Applicants: ${activeJobs.reduce(
          (acc, job) => acc + (job.listAccount?.length || 0),
          0
        )}`,
      },
      {
        Metric: "Pending Approvals",
        Count: pendingRecruiters.length,
        Details: `New Requests (24h): ${
          pendingRecruiters.filter(
            (r) => new Date(r.createdAt).getTime() > Date.now() - 86400000
          ).length
        }`,
      },
    ];

    // Prepare jobs data
    const jobsData =
      jobs?.data?.map((job) => ({
        "Job Title": job.title,
        Company:
          typeof job.companyId === "string"
            ? job.companyId
            : job.companyId.companyName,
        Status: job.status,
        Applicants: job.listAccount?.length || 0,
        "Created At": new Date(job.createdAt).toLocaleDateString(),
      })) || [];

    // Prepare recruiters data
    const recruitersData = [
      ...approvedRecruiters,
      ...pendingRecruiters,
      ...blockedRecruiters,
    ].map((recruiter) => ({
      Email: recruiter.email,
      "Company Name": recruiter.companyName,
      Status: recruiter.status,
      "Created At": new Date(recruiter.createdAt).toLocaleDateString(),
    }));

    // Create workbook with multiple sheets
    const wb = XLSX.utils.book_new();

    // Add summary sheet
    const summarySheet = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, summarySheet, "Dashboard Summary");

    // Add jobs sheet
    const jobsSheet = XLSX.utils.json_to_sheet(jobsData);
    XLSX.utils.book_append_sheet(wb, jobsSheet, "Jobs");

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
        <Typography
          variant="h5"
          fontWeight={600}
          sx={{ color: colorButtonOrange }}
        >
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

      <Grid container spacing={3}>
        {statsData.map((stat, index) => (
          <Grid item xs={12} md={6} lg={3} key={index}>
            <Card
              sx={{
                height: "100%",
                boxShadow: "0 2px 8px rgba(255, 107, 0, 0.1)",
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 1,
                        bgcolor: `${stat.color}15`,
                        color: stat.color,
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography variant="h6" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                  <Typography variant="h4" fontWeight="bold">
                    {stat.count}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                    {stat.subStats?.map((subStat, idx) => (
                      <Chip
                        key={idx}
                        label={`${subStat.label}: ${subStat.value}`}
                        color={
                          subStat.color as
                            | "success"
                            | "error"
                            | "warning"
                            | "info"
                            | "default"
                        }
                        size="small"
                        sx={{ borderRadius: 1 }}
                      />
                    ))}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Activity */}
      <Grid container spacing={3} mt={1}>
        <Grid item xs={12} md={6}>
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
                          {job.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {typeof job.companyId === "string"
                            ? job.companyId
                            : job.companyId.companyName}
                        </Typography>
                      </Box>
                      <Chip
                        label={job.status}
                        color={
                          job.status === statusJob.OnGoing
                            ? "success"
                            : job.status === statusJob.Stop
                            ? "error"
                            : "default"
                        }
                        size="small"
                      />
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
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
                {[
                  ...approvedRecruiters,
                  ...pendingRecruiters,
                  ...blockedRecruiters,
                ]
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
                            {recruiter.email}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {recruiter.companyName}
                          </Typography>
                        </Box>
                        <Chip
                          label={recruiter.status}
                          color={
                            recruiter.status === "approve"
                              ? "success"
                              : recruiter.status === "blocked"
                              ? "error"
                              : "warning"
                          }
                          size="small"
                          icon={
                            recruiter.status === "approve" ? (
                              <CheckCircleIcon />
                            ) : recruiter.status === "blocked" ? (
                              <BlockIcon />
                            ) : (
                              <AccessTimeIcon />
                            )
                          }
                        />
                      </Stack>
                    </Box>
                  ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
