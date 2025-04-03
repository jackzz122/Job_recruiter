import Container from "@mui/material/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import DetailsInforCompany from "./DetailsInfoCompany";
import DetailsJobBody from "./DetailsJobBody";
import DetailsJobHeader from "./DetailsJobHeader";
export const DetailsJob = () => {
  // const params = useLocation();
  const breadCrumbs = [
    <Link className="text-red-300" to="/">
      Trang chủ
    </Link>,
    <Link className="text-red-300" to="/">
      Tất cả việc làm IT
    </Link>,

    <p>Tuyển thực tập sinh React/NodeJS </p>,
  ];
  return (
    <>
      <Box className="gradient"></Box>
      <Box sx={{ paddingInline: "40px" }}>
        <Stack sx={{ marginLeft: "1.563rem" }} direction="row" spacing={2}>
          <Breadcrumbs sx={{ color: "white" }} separator=">">
            {" "}
            {breadCrumbs}{" "}
          </Breadcrumbs>
        </Stack>
        <Container
          maxWidth="xl"
          sx={{
            marginTop: "2rem",
            position: "relative",
            zIndex: 10,
          }}
        >
          <Stack direction="row" spacing={3}>
            <Box sx={{ flexGrow: 1, maxWidth: "55.813rem" }}>
              <DetailsJobHeader />
              <DetailsJobBody />
            </Box>
            <Box sx={{ flexGrow: 2 }}>
              <DetailsInforCompany />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};
