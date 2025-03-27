import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { ContainerBox } from "../../components/ContainerRecruiter/ContainerBox";
import Divider from "@mui/material/Divider";
import { colorButtonOrange } from "../../themeContext";
import Button from "@mui/material/Button";

import Chip from "@mui/material/Chip";
import Grid2 from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
const companyInformation = [
  {
    title: "Company Information",
    value: "12",
  },
  {
    title: "Company Industry",
    value: "12",
  },
  {
    title: "Company Size",
    value: "12",
  },
  {
    title: "Country",
    value: "12",
  },
  {
    title: "Working days",
    value: "12",
  },
  {
    title: "Overtime policy",
    value: "12",
  },
];
const chipSkills = [
  "React",
  "Node",
  "MongoDB",
  "Express",
  "JavaScript",
  "JavaScript",
  "JavaScript",
];
// const branches = ["Hanoi", "HCM", "Haiphong", "Danang", "Cantho", "Nha Trang"];
export const CompanyInfo = () => {
  const navigate = useNavigate();
  return (
    <ContainerBox>
      <Container maxWidth="lg">
        <Grid2 container spacing={2}>
          <Grid2 size={8}>
            <Box
              sx={{
                position: "relative",
                height: 200,
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
                background: `radial-gradient(100% 100% at 100% 100%, rgba(0, 0, 0, 0) 46%, #ff8550 47% 53%, rgba(0, 0, 0, 0) 54%) 32px 32px,
            radial-gradient(100% 100% at 0 0, rgba(0, 0, 0, 0) 46%, #ff8550 47% 53%, rgba(0, 0, 0, 0) 54%) 32px 32px,
            radial-gradient(100% 100%, rgba(0, 0, 0, 0) 22%, #ff8550 23% 29%, rgba(0, 0, 0, 0) 30% 34%, #ff8550 35% 41%, rgba(0, 0, 0, 0) 42%) #ff6c2f`,
                backgroundSize: "64px 64px",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  bottom: -100,
                  left: "5%",
                  zIndex: 100,
                }}
              >
                <Avatar
                  src="/bss_avatar.png"
                  sx={{
                    width: "160px",
                    height: "160px",
                    border: "1px solid black",
                  }}
                />
                <Typography
                  sx={{ width: "100%" }}
                  textAlign="center"
                  variant="h6"
                >
                  BSS group
                </Typography>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  bottom: "-200px",
                  height: "200px",
                  width: "100%",
                  backgroundColor: "white",
                  borderBottomLeftRadius: "15px",
                  borderBottomRightRadius: "15px",
                }}
              >
                <Stack
                  sx={{
                    position: "absolute",
                    width: "100%",
                    bottom: 12,
                    paddingInline: "1rem",
                  }}
                  direction="row"
                  spacing={2}
                >
                  <div className="h-20 w-1/4 border rounded-2xl text-orange-500 border-orange-400 flex items-center justify-center">
                    <Typography fontWeight="bold">BSSGroup@bss.com</Typography>
                  </div>
                  <div className="h-20 w-1/4 border rounded-2xl text-orange-500 border-orange-400 flex items-center justify-center">
                    <Typography fontWeight="bold">0909090909</Typography>
                  </div>
                  <div className="h-20 w-1/4 border rounded-2xl text-orange-500 border-orange-400 flex items-center justify-center">
                    <Typography fontWeight="bold">21/03/2004</Typography>
                  </div>
                  <div className="h-20 w-1/4 border rounded-2xl text-orange-500 border-orange-400 flex items-center justify-center">
                    <Typography fontWeight="bold">
                      12 Duy Tan Cau Giay
                    </Typography>
                  </div>
                </Stack>
              </Box>
            </Box>
          </Grid2>

          <Grid2 size={4}>
            <Box
              sx={{
                position: "relative",
                height: 400,
                backgroundColor: "white",
                padding: "12px",
                paddingInline: "20px",
                borderRadius: "15px",
              }}
            >
              <Typography
                sx={{ color: colorButtonOrange }}
                marginBottom={2}
                display="block"
                fontWeight="bold"
                textAlign="center"
                variant="h5"
              >
                BSS group
              </Typography>
              {companyInformation.map((infor, index) => {
                return (
                  <>
                    <div className="my-4 flex items-center justify-between">
                      <Typography fontStyle="italic">{infor.title}</Typography>
                      <Typography fontStyle="italic">{infor.value}</Typography>
                    </div>
                    {index !== companyInformation.length - 1 && <Divider />}
                  </>
                );
              })}
            </Box>
          </Grid2>
          <Grid2 size={6} spacing={2}>
            <Box
              sx={{ backgroundColor: "white", borderRadius: "15px" }}
              padding={2}
              minHeight={200}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: colorButtonOrange }}
              >
                About
              </Typography>
              <Typography textAlign="justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quos. Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Ad officia odit, natus quam itaque, asperiores
                nihil repellat optio officiis voluptas totam? Iusto, debitis?
                Fuga perspiciatis asperiores placeat ratione, aliquid sed. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Culpa
                distinctio iure, unde sunt quis suscipit, sapiente, vero
                architecto nihil quam qui optio consequatur sed ipsum quia
                maiores dolor atque veritatis. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Eveniet accusamus qui, quod labore
                quibusdam aliquid numquam nam nulla quos dolorum ut obcaecati
                nobis fuga ipsam molestias! Similique dignissimos distinctio
                mollitia. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Quae optio eaque in. Nobis quasi facere commodi vero, ipsa
                blanditiis non sapiente, maxime itaque at ullam aspernatur.
                Incidunt sint cum odio.
              </Typography>
            </Box>
          </Grid2>

          <Grid2 size={6} spacing={2}>
            <Box
              height="fit-content"
              sx={{
                backgroundColor: "white",
                padding: 2,
                borderRadius: "15px",
              }}
            >
              <Typography
                sx={{ width: "100%", color: colorButtonOrange }}
                display="block"
                fontWeight="bold"
                textAlign="center"
                variant="h5"
              >
                Key Skills
              </Typography>
              {chipSkills.map((skill, index) => {
                return (
                  <Chip
                    sx={{
                      marginTop: 1.5,
                      marginRight: 1,
                      color: "white",
                      backgroundColor: colorButtonOrange,
                      fontWeight: "bold",
                    }}
                    key={index}
                    label={skill}
                  />
                );
              })}
            </Box>
            <Box
              sx={{
                backgroundColor: "white",
                marginTop: 2,
                minHeight: 200,
                borderRadius: "15px",
              }}
            >
              <Typography
                sx={{ width: "100%", color: colorButtonOrange }}
                display="block"
                fontWeight="bold"
                textAlign="center"
                variant="h5"
              >
                Branches & Offices
              </Typography>
            </Box>
          </Grid2>

          <Grid2 size={12} marginTop={2}>
            <Button
              sx={{
                backgroundColor: colorButtonOrange,
                color: "white",
                width: "100%",
              }}
              onClick={() => {
                navigate("/recruiter/update_company/123");
              }}
            >
              Updated Information
            </Button>
          </Grid2>
        </Grid2>
      </Container>
    </ContainerBox>
  );
};
