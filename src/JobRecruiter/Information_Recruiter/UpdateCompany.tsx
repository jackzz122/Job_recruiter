import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/feature/user/userSlice";
import { ContainerBox } from "../component/ContainerBox";
import { colorButtonOrange } from "../../themeContext";
import { alpha } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Grid2";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import { CompanyDetailst } from "./pages/CompanyDetails/CompanyDetailst";
import { BasicInfo } from "./pages/BasicInfo/BasicInfo";

export const UpdateCompany = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    established: "",
    address: "",
    industry: "",
    size: "",
    country: "",
    workingDays: "",
    overtimePolicy: "",
    about: "",
    skills: [] as string[],
  });

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = methods;

  return (
    <ContainerBox>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 4,
              gap: 2,
            }}
          >
            <IconButton
              onClick={() => navigate("/recruiter/settings")}
              sx={{
                backgroundColor: alpha(colorButtonOrange, 0.1),
                "&:hover": {
                  backgroundColor: alpha(colorButtonOrange, 0.2),
                },
              }}
            >
              <ArrowBackIcon sx={{ color: colorButtonOrange }} />
            </IconButton>
            <Typography
              variant="h4"
              fontWeight="bold"
              color={colorButtonOrange}
            >
              Update Company Information
            </Typography>
          </Box>

          {/* Form */}
          <Box
            component="form"
            sx={{
              backgroundColor: "white",
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              overflow: "hidden",
              border: "1px solid",
              borderColor: alpha(colorButtonOrange, 0.2),
            }}
          >
            {/* Company Logo Section */}
            <Box
              sx={{
                p: 4,
                display: "flex",
                alignItems: "center",
                gap: 3,
                borderBottom: "1px solid",
                borderColor: alpha(colorButtonOrange, 0.1),
              }}
            >
              <Avatar
                src="/bss_avatar.png"
                sx={{
                  width: 100,
                  height: 100,
                  border: "3px solid white",
                  boxShadow: 3,
                }}
              />
              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Company Logo
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Upload a new logo for your company
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: colorButtonOrange,
                    color: colorButtonOrange,
                    "&:hover": {
                      borderColor: colorButtonOrange,
                      backgroundColor: alpha(colorButtonOrange, 0.05),
                    },
                  }}
                >
                  Change Logo
                </Button>
              </Box>
            </Box>

            {/* Form Fields */}
            <Box sx={{ p: 4 }}>
              <Grid2 container spacing={4}>
                {/* Basic Information */}
                <BasicInfo />

                {/* Company Details */}
                <CompanyDetailst />

                {/* About Us */}
                <Grid2 size={{ xs: 12 }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      color: colorButtonOrange,
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <BusinessIcon /> About Us
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                </Grid2>

                <Grid2 size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="About Company"
                    name="about"
                    value={formData.about}
                    variant="outlined"
                    multiline
                    rows={6}
                    sx={{ mb: 3 }}
                  />
                </Grid2>

                {/* Key Skills */}
                <Grid2 size={{ xs: 12 }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      color: colorButtonOrange,
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <WorkIcon /> Key Skills
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                </Grid2>

                <Grid2 size={{ xs: 12 }}>
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                      <TextField
                        fullWidth
                        label="Add Skill"
                        variant="outlined"
                        size="small"
                      />
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: colorButtonOrange,
                          "&:hover": {
                            backgroundColor: "#ff6c2f",
                          },
                        }}
                      >
                        <AddIcon />
                      </Button>
                    </Box>

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {formData.skills.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          deleteIcon={<DeleteIcon />}
                          sx={{
                            backgroundColor: colorButtonOrange,
                            color: "white",
                            fontWeight: "bold",
                            px: 2,
                            py: 1,
                            fontSize: "0.9rem",
                            "& .MuiChip-deleteIcon": {
                              color: "white",
                              "&:hover": {
                                color: "rgba(255, 255, 255, 0.7)",
                              },
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Grid2>
              </Grid2>
            </Box>

            {/* Submit Button */}
            <Box
              sx={{
                p: 3,
                display: "flex",
                justifyContent: "center",
                borderTop: "1px solid",
                borderColor: alpha(colorButtonOrange, 0.1),
              }}
            >
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
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
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </ContainerBox>
  );
};
