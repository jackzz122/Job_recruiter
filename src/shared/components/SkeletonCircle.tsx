import Skeleton from "@mui/material/Skeleton";

export const SkeletonCircle = () => {
  return (
    <>
      <Skeleton animation="wave" variant="circular" width={40} height={40} />
    </>
  );
};
