import { useSelector } from "react-redux";
import { useGetAppliedJobQuery } from "../../../../redux/feature/user/userApiSlice";
import { selectUser } from "../../../../redux/feature/user/userSlice";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { JobAppliedItem } from "../components/JobAppliedItem";
import { useEffect, useState } from "react";
import { JobResponse } from "../../../../types/JobType";
import { NotFoundList } from "../components/NotFoundList";
import { PendingStatus } from "../../../../types/PendingStatus";
import { CompanyType } from "../../../../types/CompanyType";

export const JobApplied = () => {
  const user = useSelector(selectUser);
  const { data: getJobList, isLoading } = useGetAppliedJobQuery(
    user?._id || "",
    {
      skip: !user?._id,
    }
  );
  const [appliedJobs, setAppliedJobs] = useState<JobResponse[]>([]);

  useEffect(() => {
    if (getJobList?.data) {
      setAppliedJobs(getJobList.data);
    }
  }, [getJobList]);

  if (isLoading) {
    return (
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ minHeight: "200px" }}
      >
        <CircularProgress />
        <Typography variant="body1">Loading your applications...</Typography>
      </Stack>
    );
  }

  if (
    !appliedJobs ||
    appliedJobs.filter(
      (job) => (job.companyId as CompanyType).status === PendingStatus.APPROVED
    ).length === 0
  ) {
    return <NotFoundList title="job applications" content="apply for jobs" />;
  }
  return (
    <Box sx={{ padding: "16px 0" }}>
      <Typography variant="h6" fontWeight="bold" marginBottom={2}>
        Your Job Applications ({appliedJobs.length})
      </Typography>

      {appliedJobs.map((job, index) => (
        <JobAppliedItem
          key={job._id || index}
          userId={user?._id || " "}
          job={job}
        />
      ))}
    </Box>
  );
};
