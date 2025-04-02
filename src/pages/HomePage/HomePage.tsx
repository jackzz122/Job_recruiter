import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ListJobSkeleten } from "../../components/ListJobSkeleten";
import { Grid2 } from "@mui/material";
// const CardCompVip = lazy(() => import("../../components/CardCompVip"));
import CardCompVip from "../../components/Card/CardCompVip";
import SearchLayout from "../../components/Layout/SearchLayout";
export const HomePage = () => {
  return (
    <div>
      <SearchLayout />
      <Box
        sx={{
          backgroundColor: "#f3f5f7",
          paddingBottom: 2,
        }}
      >
        <Container>
          <Typography
            paddingTop={2}
            fontSize={20}
            fontWeight="bold"
            sx={{ color: "#990000" }}
          >
            Các việc làm tốt nhất
          </Typography>
          <ListJobSkeleten />
        </Container>
      </Box>
      <br />
      <Container>
        <Typography
          variant="h5"
          textAlign="center"
          margin={2}
          fontWeight="bold"
        >
          Nhà tuyển dụng hàng đầu
        </Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={4}>
            <CardCompVip />
          </Grid2>
          <Grid2 size={4}>
            <CardCompVip />
          </Grid2>
          <Grid2 size={4}>
            <CardCompVip />
          </Grid2>
          <Grid2 size={4}>
            <CardCompVip />
          </Grid2>
          <Grid2 size={4}>
            <CardCompVip />
          </Grid2>
        </Grid2>
      </Container>
      <br />
    </div>
  );
};
