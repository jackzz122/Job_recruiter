import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import { EditDialog } from "../../components/EditDialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { handleError } from "../../../../../helper/HandleError/handleError";
import { useUpdateUserInfoMutation } from "../../../../../redux/feature/user/userApiSlice";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import LinkIcon from "@mui/icons-material/Link";
import InputAdornment from "@mui/material/InputAdornment";
// import DeleteIcon from "@mui/icons-material/Delete";

type basicInforType = {
  fullname: string;
  address: string;
  phone: string;
  email: string;
  avatarImg: string;
  title: string;
  gender: string;
  dob: string;
  linkingProfile: string;
};

export const InforPage = ({
  fullname,
  address,
  phone,
  email,
  avatarImg,
  title = "",
  gender = "",
  dob = "",
  linkingProfile = "",
}: {
  avatarImg: string;
  email: string;
  fullname: string;
  address: string;
  phone: string;
  title?: string;
  gender?: string;
  dob?: string;
  linkingProfile?: string;
}) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [openBasicInfo, setOpenBasicInfo] = useState(false);

  const defaultBasic = {
    fullname: fullname,
    address: address,
    email: email,
    phone: phone,
    title: title,
    gender: gender,
    dob: dob || "",
    linkingProfile: linkingProfile || "",
  };
  const [updateUser, { isLoading }] = useUpdateUserInfoMutation();
  const { register, handleSubmit, reset, setValue, watch } =
    useForm<basicInforType>({
      defaultValues: defaultBasic,
    });

  const selectedGender = watch("gender");

  useEffect(() => {
    if (fullname && email) {
      reset({
        ...defaultBasic,
        dob: dob || "",
        linkingProfile: linkingProfile || "",
      });
      if (avatarImg) {
        setPreviewImage(avatarImg);
      }
    }
  }, [fullname, phone, email, avatarImg, title, gender, dob, linkingProfile]);

  const onSubmit: SubmitHandler<basicInforType> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("fullname", data.fullname);
      formData.append("address", data.address);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("title", data.title);
      formData.append("gender", data.gender);
      formData.append("dob", data.dob || "");
      formData.append("linkingProfile", data.linkingProfile || "");

      const file = imageRef.current?.files?.[0];
      if (file) {
        formData.append("avatarIMG", file);
      }

      const response = await updateUser(formData);
      if (response.data?.success) {
        toast.success(response.data?.message || "Update success");
        setOpenBasicInfo(false);
      }
    } catch (err) {
      const error = handleError(err);
      toast.error(error?.message || "Update failed");
    }
  };
  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setPreviewImage(imgUrl);
    }
  };

  return (
    <>
      <Paper sx={{ p: 3, position: "relative" }}>
        <IconButton
          sx={{ position: "absolute", right: 8, top: 8 }}
          onClick={() => setOpenBasicInfo(true)}
        >
          <EditIcon />
        </IconButton>
        <Stack direction="row" alignItems="center" spacing={3}>
          <Avatar
            src={avatarImg || "/avatar.png"}
            sx={{ width: 120, height: 120 }}
          />
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {fullname || "Your Name"}
            </Typography>
            {title && (
              <Typography variant="subtitle1" color="primary.main">
                {title}
              </Typography>
            )}
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              <strong>Email: </strong>
              {email || "Your email"}
            </Typography>
            <Typography marginBlock={2} color="text.secondary">
              <strong>Phone Number: </strong>
              {phone || "............."}
            </Typography>
            <Typography color="text.secondary">
              <strong>Address: </strong>
              {address || "............."}
            </Typography>
            {gender && (
              <Typography color="text.secondary" sx={{ mt: 2 }}>
                <strong>Gender: </strong>
                {gender}
              </Typography>
            )}
            {dob && (
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                <strong>Date of Birth: </strong>
                {dob}
              </Typography>
            )}
            {linkingProfile && (
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                <strong>Profile Link: </strong>
                <a
                  href={linkingProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#1976d2", textDecoration: "none" }}
                >
                  {linkingProfile}
                </a>
              </Typography>
            )}
          </Box>
        </Stack>
      </Paper>
      <EditDialog
        open={openBasicInfo}
        onClose={() => {
          setOpenBasicInfo(false);
        }}
        loading={isLoading}
        submit={handleSubmit(onSubmit)}
        title="Edit Basic Information"
      >
        <Stack spacing={3} sx={{ mt: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Avatar
              src={previewImage ? previewImage : "/default_avatar.png"}
              sx={{
                width: 100,
                height: 100,
                mb: 2,
                border: "4px solid white",
                boxShadow: 3,
              }}
            />

            <Stack direction="row" spacing={2} alignItems="center">
              <input
                ref={imageRef}
                onChange={handleAddImage}
                type="file"
                accept="image/*"
                hidden
              />
              <Button
                variant="outlined"
                component="label"
                size="small"
                onClick={() => imageRef.current?.click()}
                startIcon={<CloudUploadIcon />}
                sx={{ borderRadius: 2 }}
              >
                Upload Photo
              </Button>

              {/* <IconButton
                color="error"
                sx={{ border: "1px solid", borderColor: "error.light", p: 1 }}
              >
                <DeleteIcon />
              </IconButton> */}
            </Stack>
          </Box>

          <Divider sx={{ my: 1 }}>Profile Information</Divider>

          <TextField label="Full Name" {...register("fullname")} fullWidth />
          <TextField
            label="Title"
            {...register("title")}
            fullWidth
            placeholder="e.g. Software Engineer, Project Manager"
          />

          <FormControl fullWidth>
            <InputLabel id="gender-select-label">Gender</InputLabel>
            <Select
              labelId="gender-select-label"
              id="gender-select"
              value={selectedGender || ""}
              label="Gender"
              onChange={(e) => setValue("gender", e.target.value)}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>

          <input
            type="date"
            {...register("dob")}
            className="p-3 border border-gray-500 rounded-lg"
          />

          <TextField
            label="Profile Link"
            {...register("linkingProfile")}
            fullWidth
            placeholder="https://linkedin.com/in/yourprofile"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LinkIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField label="Phone" {...register("phone")} fullWidth />
          <TextField label="Address" {...register("address")} fullWidth />
          <TextField label="Email" {...register("email")} fullWidth />
        </Stack>
      </EditDialog>
    </>
  );
};
