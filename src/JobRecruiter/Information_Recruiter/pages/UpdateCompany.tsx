import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/feature/user/userSlice";
import { ContainerBox } from "../../component/ContainerBox";
import { colorButtonOrange } from "../../../themeContext";
import { alpha } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Grid2";
import Avatar from "@mui/material/Avatar";

import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";

import BusinessIcon from "@mui/icons-material/Business";
import { CompanyDetailst } from "../components/CompanyDetails/CompanyDetailst";
import { BasicInfo } from "../components/BasicInfo/BasicInfo";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { KeySkills } from "../components/keySkill/KeySkills";
import { CompanyType } from "../../../types/CompanyType";
import React, { useEffect, useRef, useState } from "react";
import { handleError } from "../../../helper/HandleError/handleError";
import { useUpdateCompanyInfoMutation } from "../../../redux/feature/user/recruiterApiSlice";
import { toast } from "react-toastify";

const defaultCompanyInfo: Omit<CompanyType, "_id"> = {
  companyName: "",
  address: "",
  phoneNumber: "",
  websiteUrl: "",
  createdAt: "",
  emailCompany: "",
  phoneNumberCompany: "",
  country: "",
  logo: "",
  years: 0,
  overTime: false,
  keySkills: [],
  description: [
    {
      about: "",
      companySize: 0,
      workingDays: 0,
    },
  ],
};

export const UpdateCompany = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [updateCompanyInfo, { isLoading }] = useUpdateCompanyInfoMutation();
  const imageRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const handleSetImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };
  const handleRemoveImage = () => {
    setPreviewImage(null);
  };
  const methods = useForm<CompanyType>({
    defaultValues: defaultCompanyInfo || {},
  });
  useEffect(() => {
    if (user?.companyId) {
      const companyInfo = user.companyId as CompanyType;
      methods.reset(companyInfo);
    }
  }, [user?.companyId, methods]);

  const { handleSubmit, register } = methods;
  const onSubmit: SubmitHandler<CompanyType> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("_id", data._id);
      formData.append("companyName", data.companyName);
      formData.append("address", data.address);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("websiteUrl", data.websiteUrl);
      formData.append("emailCompany", data.emailCompany);
      formData.append("phoneNumberCompany", data.phoneNumberCompany);
      formData.append("country", data.country);
      formData.append("years", data.years.toString());
      formData.append("overTime", data.overTime.toString());

      // Company description
      formData.append("description[0][about]", data.description[0].about);
      formData.append(
        "description[0][companySize]",
        data.description[0].companySize.toString()
      );
      formData.append(
        "description[0][workingDays]",
        data.description[0].workingDays.toString()
      );

      // Key skills array
      data.keySkills.forEach((skill, index) => {
        formData.append(`keySkills[${index}][value]`, skill.value);
      });

      // Company logo
      const file = imageRef.current?.files?.[0];
      if (file) {
        formData.append("logo", file);
      }
      const response = await updateCompanyInfo(
        formData as FormData & { _id: string }
      );
      if (response?.data?.success) {
        toast.success(response.data.message);
        navigate("/recruiter/settings");
      }
    } catch (err) {
      const error = handleError(err);
      console.log(error);
    }
  };
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
          <FormProvider {...methods}>
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
                  src={previewImage ? previewImage : "/default_avatar.png"}
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
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    ref={imageRef}
                    style={{ display: "none" }}
                    onChange={handleSetImage}
                  />
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
                    onClick={() => imageRef.current?.click()}
                  >
                    Change Logo
                  </Button>
                  {previewImage &&
                    user?.avatarIMG !== "/default_avatar.png" && (
                      <Button
                        variant="outlined"
                        sx={{ marginLeft: 2 }}
                        color="error"
                        onClick={handleRemoveImage}
                      >
                        Remove Image
                      </Button>
                    )}
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
                      {...register("description.0.about")}
                      label="About Company"
                      variant="outlined"
                      multiline
                      rows={6}
                      sx={{ mb: 3 }}
                    />
                  </Grid2>

                  {/* Key Skills */}
                  <KeySkills />
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
                  onClick={handleSubmit(onSubmit)}
                  loading={isLoading}
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
          </FormProvider>
        </Box>
      </Container>
    </ContainerBox>
  );
};
