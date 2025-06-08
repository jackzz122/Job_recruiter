import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { ContainerBox } from "../../component/ContainerBox";
import { colorButtonOrange } from "../../../themeContext";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Grid2 from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/feature/user/userSlice";
import { CompanyType } from "../../../types/CompanyType";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";
import PublicIcon from "@mui/icons-material/Public";
import WorkIcon from "@mui/icons-material/Work";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { RoleName } from "../../../types/UserType";

export const CompanyInfo = () => {
  const user = useSelector(selectUser);
  const [companyInfor, setCompanyInfor] = useState<CompanyType>();
  useEffect(() => {
    if (user) {
      setCompanyInfor(user?.companyId as CompanyType);
    }
  }, [user]);
  const navigate = useNavigate();
  const companyInformation = [
    {
      title: "Company Information",
      value: companyInfor?.companyName || ".........",
      icon: <BusinessIcon />,
    },

    {
      title: "Company Size",
      value: companyInfor?.description?.[0]?.companySize || ".........",
      icon: <PeopleIcon />,
    },
    {
      title: "Country",
      value: companyInfor?.country || ".........",
      icon: <PublicIcon />,
    },
    {
      title: "Working days",
      value: companyInfor?.description?.[0]?.workingDays || ".........",
      icon: <CalendarTodayIcon />,
    },
    {
      title: "Overtime policy",
      value: companyInfor?.overTime ? "Yes" : "No",
      icon: <AccessTimeIcon />,
    },
  ];
  return (
    <ContainerBox>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          {/* Header Section with Pattern Background */}
          <Box
            sx={{
              position: "relative",
              height: 270,
              borderRadius: "20px 20px 0 0",
              overflow: "hidden",
              background: `radial-gradient(100% 100% at 100% 100%, rgba(0, 0, 0, 0) 46%, #ff8550 47% 53%, rgba(0, 0, 0, 0) 54%) 32px 32px,
            radial-gradient(100% 100% at 0 0, rgba(0, 0, 0, 0) 46%, #ff8550 47% 53%, rgba(0, 0, 0, 0) 54%) 32px 32px,
            radial-gradient(100% 100%, rgba(0, 0, 0, 0) 22%, #ff8550 23% 29%, rgba(0, 0, 0, 0) 30% 34%, #ff8550 35% 41%, rgba(0, 0, 0, 0) 42%) #ff6c2f`,
              backgroundSize: "64px 64px",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                bottom: 50,
                left: 40,
                display: "flex",
                alignItems: "center",
                zIndex: 20,
                gap: 3,
              }}
            >
              <Avatar
                src={
                  companyInfor?.logo
                    ? companyInfor?.logo
                    : "/companyNotFound.png"
                }
                sx={{
                  width: 160,
                  height: 160,
                  border: "4px solid white",
                  boxShadow: 3,
                }}
              />
              <Box>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color="white"
                  sx={{ textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}
                >
                  {companyInfor?.companyName}
                </Typography>
                <Typography
                  variant="h6"
                  color="white"
                  sx={{ mt: 1, textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
                >
                  {companyInfor?.emailCompany || ".......@company.com"}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              borderRadius: "0 0 20px 20px",
              overflow: "hidden",
              position: "relative",
              mt: -2,
              zIndex: 10,
              backgroundColor: "white",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            {/* Contact Info Section */}
            <Box sx={{ p: 4 }}>
              <Grid2 container spacing={4}>
                {/* Contact Information */}
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Box
                    sx={{
                      borderRadius: 3,
                      height: "100%",
                      border: "1px solid",
                      borderColor: alpha(colorButtonOrange, 0.2),
                      p: 3,
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{
                        color: colorButtonOrange,
                        mb: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <BusinessIcon /> Contact Information
                    </Typography>
                    <Stack spacing={3}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Box
                          sx={{
                            backgroundColor: alpha(colorButtonOrange, 0.1),
                            borderRadius: "50%",
                            p: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <EmailIcon sx={{ color: colorButtonOrange }} />
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Email
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {user?.email}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Box
                          sx={{
                            backgroundColor: alpha(colorButtonOrange, 0.1),
                            borderRadius: "50%",
                            p: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <PhoneIcon sx={{ color: colorButtonOrange }} />
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Hotline
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {companyInfor?.phoneNumberCompany || "........."}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Box
                          sx={{
                            backgroundColor: alpha(colorButtonOrange, 0.1),
                            borderRadius: "50%",
                            p: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <PhoneIcon sx={{ color: colorButtonOrange }} />
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Personal Phone
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {companyInfor?.phoneNumber || "........."}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Box
                          sx={{
                            backgroundColor: alpha(colorButtonOrange, 0.1),
                            borderRadius: "50%",
                            p: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CalendarTodayIcon
                            sx={{ color: colorButtonOrange }}
                          />
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Established
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {companyInfor?.years || "........."}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Box
                          sx={{
                            backgroundColor: alpha(colorButtonOrange, 0.1),
                            borderRadius: "50%",
                            p: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <LocationOnIcon sx={{ color: colorButtonOrange }} />
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Address
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {companyInfor?.address || "........."}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Box
                          sx={{
                            backgroundColor: alpha(colorButtonOrange, 0.1),
                            borderRadius: "50%",
                            p: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <PhoneIcon sx={{ color: colorButtonOrange }} />
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Website Url
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {companyInfor?.websiteUrl || "........."}
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>
                  </Box>
                </Grid2>

                {/* Company Details */}
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <Box
                    sx={{
                      borderRadius: 3,
                      height: "100%",
                      border: "1px solid",
                      borderColor: alpha(colorButtonOrange, 0.2),
                      p: 3,
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{
                        color: colorButtonOrange,
                        mb: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <WorkIcon /> Company Details
                    </Typography>
                    <Stack spacing={2}>
                      {companyInformation.map((info, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            p: 1.5,
                            borderRadius: 2,
                            transition: "background-color 0.2s",
                            "&:hover": {
                              backgroundColor: alpha(colorButtonOrange, 0.05),
                            },
                          }}
                        >
                          <Box
                            sx={{
                              backgroundColor: alpha(colorButtonOrange, 0.1),
                              borderRadius: "50%",
                              p: 1,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {info.icon}
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              {info.title}
                            </Typography>
                            <Typography variant="body1" fontWeight="medium">
                              {info.value}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Grid2>

                {/* About Us */}
                <Grid2 size={{ xs: 12 }}>
                  <Box
                    sx={{
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: alpha(colorButtonOrange, 0.2),
                      p: 3,
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{
                        color: colorButtonOrange,
                        mb: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <BusinessIcon /> About Us
                    </Typography>
                    <Typography textAlign="justify" sx={{ lineHeight: 1.8 }}>
                      {companyInfor?.description?.[0]?.about || "........."}
                    </Typography>
                  </Box>
                </Grid2>

                {/* Key Skills */}
                <Grid2 size={{ xs: 12 }}>
                  <Box
                    sx={{
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: alpha(colorButtonOrange, 0.2),
                      p: 3,
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{
                        color: colorButtonOrange,
                        mb: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <WorkIcon /> Key Skills
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                      {companyInfor?.keySkills.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill.value as string}
                          sx={{
                            backgroundColor: colorButtonOrange,
                            color: "white",
                            fontWeight: "bold",
                            px: 2,
                            py: 1,
                            fontSize: "0.9rem",
                            "&:hover": {
                              backgroundColor: "#ff6c2f",
                              transform: "scale(1.05)",
                              transition: "all 0.2s",
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Grid2>
              </Grid2>
            </Box>

            {/* Update Button */}
            <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
              {user?.role === RoleName.RECRUIT && (
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  sx={{
                    backgroundColor: colorButtonOrange,
                    color: "white",
                    px: 5,
                    py: 1.5,
                    borderRadius: 3,
                    fontSize: "1rem",
                    fontWeight: "bold",
                    boxShadow: `0 4px 14px ${alpha(colorButtonOrange, 0.4)}`,
                    "&:hover": {
                      backgroundColor: "#ff6c2f",
                      boxShadow: `0 6px 20px ${alpha(colorButtonOrange, 0.6)}`,
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s",
                  }}
                  onClick={() => {
                    navigate(
                      "/recruiter/settings/update_company/update_company"
                    );
                  }}
                >
                  Update Information
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </ContainerBox>
  );
};
