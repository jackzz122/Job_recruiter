import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { lazy, Suspense } from "react";
const OftenJob = lazy(() => import("../pages/HomePage/OftenJob"));
import Skeleton from "@mui/material/Skeleton";

export const ListJobSkeleten = () => {
  return (
    <>
      <Box marginTop={1}></Box>
      <Suspense fallback={<Skeleton variant="rectangular" width="100%" />}>
        <OftenJob />
      </Suspense>

      <Box marginTop={2} sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination count={12} defaultPage={1} size="large" color="primary" />
      </Box>
    </>
  );
};
