import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(to right, #000000, #5b0e0e)",
        color: "white",
        py: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <LogoDevIcon sx={{ color: "red", fontSize: 40, mr: 1 }} />
              <Typography variant="h6" component="div" sx={{ color: "white" }}>
                JOB for DEV
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              Connecting developers with their dream jobs. Find the perfect tech
              role that matches your skills and aspirations.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                component={RouterLink}
                to="/homepage"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  textDecoration: "none",
                }}
              >
                Home
              </Link>
              <Link
                component={RouterLink}
                to="/list_company"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  textDecoration: "none",
                }}
              >
                Companies
              </Link>
              <Link
                component={RouterLink}
                to="/CV"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  textDecoration: "none",
                }}
              >
                Create CV
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
                Email: support@jobfordev.com
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
                Phone: +84 123 456 789
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
                Address: 123 Tech Street, Digital City
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            mt: 4,
            pt: 2,
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            textAlign: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "rgba(255, 255, 255, 0.7)" }}
          >
            © {new Date().getFullYear()} JOB for DEV. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
