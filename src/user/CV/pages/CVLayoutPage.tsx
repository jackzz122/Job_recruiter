import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { colorButtonOrange } from "../../../themeContext";

export const CVLayoutPage = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  // Array of CV components
  const cvComponents = [
    {
      name: "Professional",
      href: "/layoutCV",
      preview: "/placeholder-cv1.png",
    },
    {
      name: "Modern",
      href: "/layoutCV/cv_2",
      preview: "/placeholder-cv2.png",
    },
    {
      name: "Creative",
      href: "/layoutCV/cv_3",
      preview: "/placeholder-cv3.png",
    },
  ];

  return (
    <Box sx={{ bgcolor: "grey.100", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          fontWeight="bold"
          align="center"
          mb={4}
          sx={{ color: colorButtonOrange }}
        >
          Choose Your Resume Template
        </Typography>

        <Grid2 container spacing={3}>
          {/* CV Template Selector Section - Left Side */}
          <Grid2 size={{ xs: 12, md: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                height: "100%",
                position: { md: "sticky" },
                top: { md: 20 },
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                color="text.primary"
                mb={3}
              >
                Templates
              </Typography>

              <Stack spacing={2}>
                {cvComponents.map((cv, index) => (
                  <Card
                    key={index}
                    sx={{
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      transform:
                        location.pathname === cv.href
                          ? "scale(1.02)"
                          : "scale(1)",
                      boxShadow:
                        location.pathname === cv.href
                          ? `0 4px 12px ${colorButtonOrange}40`
                          : theme.shadows[1],
                      border:
                        location.pathname === cv.href
                          ? `2px solid ${colorButtonOrange}`
                          : `1px solid ${theme.palette.grey[200]}`,
                    }}
                    onClick={() => navigate(cv.href)}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        height: 120,
                        bgcolor: "grey.100",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {cv.name}
                      </Typography>
                    </CardMedia>
                    <CardContent sx={{ p: 1.5 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="subtitle1" fontWeight="medium">
                          {cv.name}
                        </Typography>
                        {location.pathname === cv.href && (
                          <Box
                            sx={{
                              width: 10,
                              height: 10,
                              borderRadius: "50%",
                              backgroundColor: colorButtonOrange,
                            }}
                          />
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Paper>
          </Grid2>

          {/* CV Preview Section - Right Side */}
          <Grid2 size={{ xs: 12, md: 9 }}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                bgcolor: "white",
                borderRadius: 2,
                maxHeight: { xs: "800px", md: "calc(100vh - 90px)" },
                overflow: "auto",
              }}
            >
              <Box
                sx={{
                  mb: 3,
                  p: 2,
                  bgcolor: "grey.50",
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "grey.200",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color={colorButtonOrange}
                >
                  {
                    cvComponents[
                      cvComponents.findIndex(
                        (item) => item.href === location.pathname
                      )
                    ]?.name
                  }{" "}
                  Template
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ bgcolor: colorButtonOrange }}
                  onClick={() => navigate("/edited_cv_1")}
                >
                  Use This Template
                </Button>
              </Box>
              <Outlet />
            </Paper>
            <Button
              sx={{
                marginTop: 2,
                border: `1px solid ${colorButtonOrange}`,
                color: colorButtonOrange,
              }}
              variant="outlined"
              fullWidth
            >
              Download CV
            </Button>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};
