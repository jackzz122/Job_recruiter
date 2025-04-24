import { alpha } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import { colorButtonOrange } from "../../themeContext";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/feature/user/userSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useUpdateUserInfoMutation } from "../../redux/feature/user/userApiSlice";
import { handleError } from "../../helper/HandleError/handleError";
import { toast } from "react-toastify";
export type userEdit = {
  fullname: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  avatarIMG: string;
};
export const EmployeeEdit = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [userInfo, setUserInfo] = useState<userEdit>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (user) {
      const formattedUserInfo = {
        fullname: user?.fullname,
        email: user?.email,
        phone: user?.phone || "",
        address: user?.address || "",
        gender: user?.gender || "",
        avatarIMG: user?.avatarIMG || "",
      };
      setUserInfo(formattedUserInfo);
      reset(formattedUserInfo);

      if (user?.avatarIMG) {
        setPreviewImage(user.avatarIMG);
      }
    }
  }, [user]);

  const { register, handleSubmit, reset } = useForm<userEdit>({
    defaultValues: userInfo,
  });
  const { ...rest } = register("avatarIMG");
  const [updateUserInfo, { isLoading }] = useUpdateUserInfoMutation();

  const onSubmit: SubmitHandler<userEdit> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("fullname", data.fullname);
      formData.append("address", data.address);
      formData.append("email", data.email);
      formData.append("gender", data.gender);
      formData.append("phone", data.phone || "");

      const file = fileInputRef.current?.files?.[0];
      if (file) {
        formData.append("avatarIMG", file);
      }

      const response = await updateUserInfo(formData).unwrap();
      if (response.success) {
        toast.success("Update user info successfully");
        navigate("/recruiter/manage_account");
      }
    } catch (err) {
      const error = handleError(err);
      console.log(error);
      toast.error(error?.message || "Update failed");
    }
  };

  return (
    <Box>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
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
              onClick={() => navigate(-1)}
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
              Update Employee Information
            </Typography>
          </Box>

          {/* Form */}
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              overflow: "hidden",
              border: "1px solid",
              borderColor: alpha(colorButtonOrange, 0.2),
            }}
          >
            {/* Profile Picture Section */}
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
                src={previewImage || "/default_avatar.png"}
                sx={{
                  width: 100,
                  height: 100,
                  border: "3px solid white",
                  boxShadow: 3,
                }}
              />
              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Profile Picture
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Upload a new profile picture
                </Typography>
                <Stack direction="row" spacing={2}>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    {...rest}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
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
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Change Picture
                  </Button>
                  {previewImage &&
                    user?.avatarIMG !== "/default_avatar.png" && (
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={handleRemoveImage}
                      >
                        Remove Image
                      </Button>
                    )}
                </Stack>
              </Box>
            </Box>

            {/* Form Fields */}
            <Box sx={{ p: 4 }}>
              <Stack spacing={4}>
                {/* Basic Information */}
                <Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Basic Information
                  </Typography>
                  <Stack spacing={3} sx={{ mt: 2 }}>
                    <TextField
                      label="Full Name"
                      fullWidth
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                      variant="outlined"
                      {...register("fullname")}
                    />
                    <TextField
                      label="Email"
                      fullWidth
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                      variant="outlined"
                      {...register("email")}
                    />
                    <TextField
                      label="Phone Number"
                      fullWidth
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                      variant="outlined"
                      {...register("phone")}
                    />
                    <TextField
                      label="Address"
                      fullWidth
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                      variant="outlined"
                      {...register("address")}
                    />
                    <TextField
                      label="Gender"
                      fullWidth
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                      variant="outlined"
                      {...register("gender")}
                    />
                  </Stack>
                </Box>
              </Stack>
            </Box>

            {/* Save Button */}
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
        </Box>
      </Container>
    </Box>
  );
};
