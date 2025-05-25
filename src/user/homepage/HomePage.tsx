import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Grid2 } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";
import SpeedIcon from "@mui/icons-material/Speed";
import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SearchIcon from "@mui/icons-material/Search";
import HandshakeIcon from "@mui/icons-material/Handshake";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export const HomePage = () => {
  const features = [
    {
      icon: <WorkIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Smart Job Matching",
      description:
        "Our AI-powered system matches you with the perfect job opportunities based on your skills and preferences.",
    },
    {
      icon: <BusinessIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Top Companies",
      description:
        "Connect with leading companies and startups across various industries.",
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Career Growth",
      description:
        "Access resources and tools to help you advance your career and develop new skills.",
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Quick Apply",
      description:
        "Apply to multiple jobs with just a few clicks using our streamlined application process.",
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Secure Platform",
      description:
        "Your data is protected with enterprise-grade security measures.",
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "24/7 Support",
      description:
        "Get help whenever you need it with our dedicated support team.",
    },
  ];

  const benefits = [
    {
      icon: <SearchIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Easy Job Search",
      description:
        "Find the perfect job with our advanced search filters and personalized recommendations.",
    },
    {
      icon: <HandshakeIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Direct Connection",
      description:
        "Connect directly with employers and skip the traditional application process.",
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Career Insights",
      description:
        "Get valuable insights about industry trends and salary expectations.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
          color: "white",
          py: 8,
        }}
      >
        <Container>
          <Grid2 container spacing={4} alignItems="center">
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h2"
                fontWeight="bold"
                gutterBottom
                sx={{
                  color: "white",
                  mb: 2,
                }}
              >
                Find Your Dream Job
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  color: "rgba(255, 255, 255, 0.9)",
                }}
              >
                Connect with top employers and discover opportunities that match
                your skills and aspirations.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: "#dc2626",
                    "&:hover": {
                      bgcolor: "#b91c1c",
                    },
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                  }}
                >
                  Start Searching
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "white",
                    color: "white",
                    "&:hover": {
                      borderColor: "white",
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                    },
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                  }}
                >
                  Learn More
                </Button>
              </Stack>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  p: 4,
                  borderRadius: 4,
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      bgcolor: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <WorkIcon sx={{ color: "black" }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ color: "white" }}
                    >
                      Diverse Job Opportunities
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255, 255, 255, 0.8)" }}
                    >
                      Explore a wide range of positions across various
                      industries
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      bgcolor: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <BusinessIcon sx={{ color: "black" }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ color: "white" }}
                    >
                      Trusted Companies
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255, 255, 255, 0.8)" }}
                    >
                      Connect with established and innovative companies
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      bgcolor: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PeopleIcon sx={{ color: "black" }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ color: "white" }}
                    >
                      Growing Community
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255, 255, 255, 0.8)" }}
                    >
                      Join a network of professionals and career seekers
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid2>
          </Grid2>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, bgcolor: "#f8f9fa" }}>
        <Container>
          <Typography
            variant="h3"
            textAlign="center"
            fontWeight="bold"
            gutterBottom
            sx={{ mb: 6, color: "#000000" }}
          >
            Why Choose Us
          </Typography>
          <Grid2 container spacing={4}>
            {features.map((feature, index) => (
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Box
                  sx={{
                    p: 3,
                    height: "100%",
                    bgcolor: "white",
                    borderRadius: 2,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ color: "#000000" }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </Box>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ py: 8, bgcolor: "white" }}>
        <Container>
          <Typography
            variant="h3"
            textAlign="center"
            fontWeight="bold"
            gutterBottom
            sx={{ mb: 6, color: "#000000" }}
          >
            How We Help You
          </Typography>
          <Grid2 container spacing={4}>
            {benefits.map((benefit, index) => (
              <Grid2 size={{ xs: 12, md: 4 }} key={index}>
                <Box
                  sx={{
                    p: 4,
                    height: "100%",
                    bgcolor: "#f8f9fa",
                    borderRadius: 2,
                    textAlign: "center",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "#000000",
                      color: "white",
                      "& .MuiSvgIcon-root": {
                        color: "white",
                      },
                    },
                  }}
                >
                  <Box sx={{ mb: 2 }}>{benefit.icon}</Box>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {benefit.title}
                  </Typography>
                  <Typography>{benefit.description}</Typography>
                </Box>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 4,
          bgcolor: "#f8f9fa",
          borderTop: "1px solid #e9ecef",
        }}
      >
        <Container>
          <Grid2 container spacing={4} alignItems="center">
            <Grid2 size={{ xs: 12, md: 8 }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                sx={{ color: "#000000" }}
              >
                Ready to Find Your Next Opportunity?
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Join our community of professionals and take the next step in
                your career journey.
              </Typography>
            </Grid2>
            <Grid2
              size={{ xs: 12, md: 4 }}
              sx={{ textAlign: { xs: "left", md: "right" } }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  bgcolor: "#dc2626",
                  color: "white",
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "#b91c1c",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Get Started
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    transition: "transform 0.2s ease",
                    "&:hover": {
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  →
                </Box>
              </Box>
            </Grid2>
          </Grid2>
        </Container>
      </Box>
    </div>
  );
};
