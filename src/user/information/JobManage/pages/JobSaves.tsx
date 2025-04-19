import { useSelector } from "react-redux";
import { JobSavesItem } from "../components/JobSavesItem";
import { selectUser } from "../../../../redux/feature/user/userSlice";
import { useEffect, useState } from "react";
import { JobSaveResponse } from "../../../../types/UserType";

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
  return (
    <>
      {jobListFavourite.map((job, index) => (
        <JobSavesItem key={index} job={job} />
      ))}
    </>
  );
};
