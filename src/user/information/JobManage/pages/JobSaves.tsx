import { useSelector } from "react-redux";
import { JobSavesItem } from "../components/JobSavesItem";
import { selectUser } from "../../../../redux/feature/user/userSlice";
import { useEffect, useState } from "react";
import { JobSaveResponse } from "../../../../types/UserType";
import { NotFoundList } from "../components/NotFoundList";
import { PendingStatus } from "../../../../types/PendingStatus";
import { CompanyType } from "../../../../types/CompanyType";
export const JobSaves = () => {
  const user = useSelector(selectUser);
  const [jobListFavourite, setjobListFavourite] = useState<JobSaveResponse[]>(
    []
  );
  useEffect(() => {
    if (user) {
      setjobListFavourite(
        (user?.listFavouritesJobsID as JobSaveResponse[]) || []
      );
    }
  }, [user]);
  if (
    !jobListFavourite ||
    jobListFavourite?.filter(
      (job) => (job.companyId as CompanyType).status === PendingStatus.APPROVED
    ).length === 0
  ) {
    return <NotFoundList title="job save" content="save jobs" />;
  }
  return (
    <>
      {jobListFavourite
        .filter(
          (job) =>
            (job.companyId as CompanyType).status === PendingStatus.APPROVED
        )
        .map((job, index) => (
          <JobSavesItem key={index} job={job} />
        ))}
    </>
  );
};
