import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { alpha } from "@mui/material/styles";
import { colorButtonOrange } from "../../themeContext";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/feature/user/userSlice";
import { useNavigate } from "react-router-dom";

export const EmployeeInfor = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  return (
    <Box sx={{ margin: "32px 16px" }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 4,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          {/* Profile Header */}
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
                src={user?.avatarIMG ? user?.avatarIMG : "/default_avatar.png"}
                sx={{
                  width: 140,
                  height: 140,
                  border: "4px solid white",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }}
              />
              <Box>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color="white"
                  sx={{ textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}
                >
                  {user?.fullname}
                </Typography>
                <Typography
                  variant="h4"
                  fontStyle="italic"
                  color="white"
                  sx={{ mt: 1, textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
                >
                  {user?.gender} - {user?.role}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Information Section */}
          <Box sx={{ p: 6 }}>
            <Stack spacing={4}>
              {/* Email */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: alpha(colorButtonOrange, 0.05),
                  transition: "all 0.3s",
                  "&:hover": {
                    backgroundColor: alpha(colorButtonOrange, 0.1),
                    transform: "translateX(8px)",
                  },
                }}
              >
                <Box
                  sx={{
                    backgroundColor: alpha(colorButtonOrange, 0.1),
                    borderRadius: "50%",
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <EmailIcon sx={{ color: colorButtonOrange, fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="h6" fontWeight="medium">
                    {user?.email || "......."}
                  </Typography>
                </Box>
              </Box>

              {/* Phone */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: alpha(colorButtonOrange, 0.05),
                  transition: "all 0.3s",
                  "&:hover": {
                    backgroundColor: alpha(colorButtonOrange, 0.1),
                    transform: "translateX(8px)",
                  },
                }}
              >
                <Box
                  sx={{
                    backgroundColor: alpha(colorButtonOrange, 0.1),
                    borderRadius: "50%",
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PhoneIcon sx={{ color: colorButtonOrange, fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Phone Number
                  </Typography>
                  <Typography variant="h6" fontWeight="medium">
                    {user?.phone || "......."}
                  </Typography>
                </Box>
              </Box>

              {/* Address */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: alpha(colorButtonOrange, 0.05),
                  transition: "all 0.3s",
                  "&:hover": {
                    backgroundColor: alpha(colorButtonOrange, 0.1),
                    transform: "translateX(8px)",
                  },
                }}
              >
                <Box
                  sx={{
                    backgroundColor: alpha(colorButtonOrange, 0.1),
                    borderRadius: "50%",
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LocationOnIcon
                    sx={{ color: colorButtonOrange, fontSize: 28 }}
                  />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Address
                  </Typography>
                  <Typography variant="h6" fontWeight="medium">
                    {user?.address || "......."}
                  </Typography>
                </Box>
              </Box>
            </Stack>

            {/* Update Button */}
            <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => navigate("/recruiter/manage_account/update")}
                sx={{
                  backgroundColor: colorButtonOrange,
                  color: "white",
                  px: 6,
                  py: 1.5,
                  borderRadius: 2,
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
              >
                Update Information
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
