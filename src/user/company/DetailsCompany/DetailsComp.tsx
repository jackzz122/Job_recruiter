import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { useGetDetailCompanyQuery } from "../../../redux/feature/company/companyApiSlice";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import BusinessIcon from "@mui/icons-material/Business";
import LanguageIcon from "@mui/icons-material/Language";
import PeopleIcon from "@mui/icons-material/People";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { colorButtonOrange } from "../../../themeContext";
import Divider from "@mui/material/Divider";
import WorkIcon from "@mui/icons-material/Work";
import StarIcon from "@mui/icons-material/Star";
import Grid2 from "@mui/material/Grid2";

export const DetailsComp = () => {
  const { id } = useParams();
  const { data: companyDetail } = useGetDetailCompanyQuery(id || "");

  const companyInfo = [
    {
      icon: <BusinessIcon />,
      label: "Founded Date",
      value: companyDetail?.data.years || ".......",
    },
    {
      icon: <LanguageIcon />,
      label: "Website",
      value: companyDetail?.data.websiteUrl || ".......",
      isLink: true,
    },
    {
      icon: <PeopleIcon />,
      label: "Company Size",
      value: companyDetail?.data.description[0]?.companySize || ".......",
    },
    {
      icon: <LocationOnIcon />,
      label: "Country",
      value: companyDetail?.data.country || ".......",
    },
    {
      icon: <AccessTimeIcon />,
      label: "Working Time",
      value: `${
        companyDetail?.data?.description[0]?.workingDays || "......."
      } days/week`,
    },
    {
      icon: <WorkOutlineIcon />,
      label: "Over Time",
      value: companyDetail?.data.overTime ? "Yes" : "No",
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh", py: 4 }}>
      <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
        <Card
          sx={{
            mb: 4,
            borderRadius: 2,
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Stack spacing={3}>
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color="#1a1a1a"
                  gutterBottom
                >
                  Company Overview
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#4a4a4a",
                    lineHeight: 1.8,
                    whiteSpace: "pre-line",
                  }}
                >
                  {companyDetail?.data.description[0]?.about}
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography
                  variant="h6"
                  fontWeight="600"
                  color="#1a1a1a"
                  gutterBottom
                >
                  Basic Information
                </Typography>
                <Grid2 container>
                  {companyInfo.map((info, index) => (
                    <Grid2
                      sx={{ marginBlock: 2 }}
                      size={{ xs: 12, sm: 6, md: 4 }}
                      key={index}
                    >
                      <Stack direction="row" alignItems="center">
                        <Box
                          sx={{
                            p: 1.5,
                            borderRadius: 1,
                            pr: 2,
                            color: colorButtonOrange,
                            bgcolor: "rgba(255, 152, 0, 0.08)",
                          }}
                        >
                          {info.icon}
                        </Box>
                        <Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            {info.label}
                          </Typography>
                          {info.isLink ? (
                            <a
                              href={info.value}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: colorButtonOrange,
                                textDecoration: "none",
                                fontWeight: 500,
                              }}
                            >
                              {info.value}
                            </a>
                          ) : (
                            <Typography
                              variant="body1"
                              fontWeight="500"
                              color="#1a1a1a"
                            >
                              {info.value}
                            </Typography>
                          )}
                        </Box>
                      </Stack>
                    </Grid2>
                  ))}
                </Grid2>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Tech Stack & Culture */}
        <Grid2 container spacing={4}>
          {/* Tech Stack */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 2,
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mb: 3 }}
                >
                  <WorkIcon sx={{ color: colorButtonOrange }} />
                  <Typography variant="h6" fontWeight="600" color="#1a1a1a">
                    Technology Used
                  </Typography>
                </Stack>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                  {companyDetail?.data?.keySkills &&
                    companyDetail?.data?.keySkills?.length > 0 &&
                    companyDetail?.data?.keySkills?.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill.value}
                        sx={{
                          color: "#1a1a1a",
                          fontWeight: 500,
                          backgroundColor: "rgba(255, 152, 0, 0.08)",
                          border: "1px solid rgba(255, 152, 0, 0.2)",
                          "&:hover": {
                            backgroundColor: "rgba(255, 152, 0, 0.12)",
                          },
                        }}
                      />
                    ))}
                </Box>
              </CardContent>
            </Card>
          </Grid2>

          {/* Company Culture */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 2,
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mb: 3 }}
                >
                  <StarIcon sx={{ color: colorButtonOrange }} />
                  <Typography variant="h6" fontWeight="600" color="#1a1a1a">
                    Company Culture
                  </Typography>
                </Stack>
                <Stack spacing={2}>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Working Time
                    </Typography>
                    <Typography variant="body1" color="#1a1a1a">
                      {companyDetail?.data?.description[0]?.workingDays ||
                        "......."}{" "}
                      days/week
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Over Time
                    </Typography>
                    <Typography variant="body1" color="#1a1a1a">
                      {companyDetail?.data?.overTime ? "Yes" : "No"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Company Size
                    </Typography>
                    <Typography variant="body1" color="#1a1a1a">
                      {companyDetail?.data?.description[0]?.companySize ||
                        "......."}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};
