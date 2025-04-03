import Grid2 from "@mui/material/Grid2";
import CardComp from "../job/components/Card/CardComp";

export default function OftenJob() {
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
        <CardComp />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
        <CardComp />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
        <CardComp />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
        <CardComp />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
        <CardComp />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
        <CardComp />
      </Grid2>
    </Grid2>
  );
}
