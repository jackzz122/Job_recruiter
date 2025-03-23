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
const chipSkills = ["React", "Node", "MongoDB", "Express", "JavaScript"];
export const CompanyInfo = () => {
  return (
    <ContainerBox>
      <Container maxWidth="lg">
        <Stack
          direction="row"
          justifyItems="center"
          spacing={2}
          marginBottom={2}
        >
          <Box
            sx={{
              width: "70%",
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
                width: "30%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                bottom: -100,
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
                border: "1px solid #c0c0c0",
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
                  <Typography fontWeight="bold">12 Duy Tan Cau Giay</Typography>
                </div>
              </Stack>
            </Box>
          </Box>
          <Box
            sx={{
              border: "1px solid #c0c0c0",
              width: "30%",
              position: "relative",
              height: 400,
              backgroundColor: "white",
              padding: "12px",
              paddingInline: "20px",
              borderRadius: "15px",
            }}
          >
            <Typography
              sx={{ width: "100%", color: colorButtonOrange }}
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
                    <Typography>{infor.title}</Typography>
                    <Typography>{infor.value}</Typography>
                  </div>
                  {index !== companyInformation.length - 1 && <Divider />}
                </>
              );
            })}
          </Box>
        </Stack>
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Box sx={{ backgroundColor: "white" }} width="65%" height={200}>
            <p>Nice</p>
          </Box>
          <Box width="30%" sx={{ backgroundColor: "white" }}>
            <Typography
              sx={{ width: "100%", color: colorButtonOrange }}
              marginBlock={2}
              display="block"
              fontWeight="bold"
              textAlign="center"
              variant="h5"
            >
              Key Skills
            </Typography>
            {chipSkills.map((skill, index) => {
              return <Chip key={index} label={skill} />;
            })}
          </Box>
          <Box width="30%" sx={{ backgroundColor: "white" }}>
            <Typography
              sx={{ width: "100%", color: colorButtonOrange }}
              marginBlock={2}
              display="block"
              fontWeight="bold"
              textAlign="center"
              variant="h5"
            >
              Key Skills
            </Typography>
          </Box>
        </Stack>
        <Stack
          marginTop={4}
          direction="row"
          justifyContent="center"
          spacing={2}
        >
          <Button sx={{ backgroundColor: colorButtonOrange, color: "white" }}>
            Updated Information
          </Button>
        </Stack>
      </Container>
    </ContainerBox>
  );
};
