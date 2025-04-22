import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { AboutMe } from "./pages/Aboutme/AboutMe";
import { InforPage } from "./pages/InforPage/InforPage";
import { Skills } from "./pages/Skills/Skills";
import { Education } from "./pages/Education/Education";
import { PersonalProject } from "./pages/PersonalProject/PersonalProject";
import { WorkExp } from "./pages/WorkExp/WorkExp";
import { Certificate } from "./pages/Certificate/Certificate";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/feature/user/userSlice";
import { Button } from "@mui/material";
import { colorButtonOrange } from "../../../themeContext";

export const MyInfo = () => {
  const user = useSelector(selectUser);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          pb: 3,
        }}
      >
        <Stack spacing={3} sx={{ flex: 1 }}>
          {/* Infor page */}
          <InforPage
            avatarImg={user?.avatarIMG || " "}
            fullname={user?.fullname || ""}
            phone={user?.phone || ""}
            address={user?.address || ""}
            email={user?.email || ""}
          />
          {/* About me */}
          <AboutMe aboutMe={user?.aboutMe || ""} />
          {/* Skills */}
          <Skills />
          {/* Education */}
          <Education educationList={user?.education || []} />
          {/* Work Experience */}
          <WorkExp workEx={user?.workEx || []} />
          {/* Personal Projects */}
          <PersonalProject projects={user?.projects || []} />
          {/* Certificates */}
          <Certificate certificate={user?.certificate || []} />
        </Stack>
        <Button
          sx={{ marginTop: 2, bgcolor: colorButtonOrange }}
          variant="contained"
        >
          Create CV
        </Button>
      </Container>
    </Box>
  );
};
