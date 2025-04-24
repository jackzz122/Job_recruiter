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
// import DeleteIcon from "@mui/icons-material/Delete";

type basicInforType = {
  fullname: string;
  address: string;
  phone: string;
  email: string;
  avatarImg: string;
};

export const InforPage = ({
  fullname,
  address,
  phone,
  email,
  avatarImg,
}: {
  avatarImg: string;
  email: string;
  fullname: string;
  address: string;
  phone: string;
}) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [openBasicInfo, setOpenBasicInfo] = useState(false);
  const defaultBasic = {
    fullname: fullname,
    address: address,
    email: email,
    phone: phone,
  };
  const [updateUser, { isLoading }] = useUpdateUserInfoMutation();
  const { register, handleSubmit, reset } = useForm<basicInforType>({
    defaultValues: defaultBasic,
  });
  useEffect(() => {
    if (fullname && email) {
      reset(defaultBasic);
      if (avatarImg) {
        setPreviewImage(avatarImg);
      }
    }
  }, [fullname, phone, email, avatarImg]);
  const onSubmit: SubmitHandler<basicInforType> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("fullname", data.fullname);
      formData.append("address", data.address);
      formData.append("email", data.email);
      formData.append("phone", data.phone);

      const file = imageRef.current?.files?.[0];
      if (file) {
        formData.append("avatarIMG", file);
      }

      const response = await updateUser(formData);
      if (response.data?.success) {
        toast.success(response.data?.message);
        setOpenBasicInfo(false);
      }
    } catch (err) {
      const error = handleError(err);
      console.log(error);
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
        <Stack direction="row" spacing={3}>
          <Avatar
            src={avatarImg || "/avatar.png"}
            sx={{ width: 120, height: 120 }}
          />
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {fullname || "Your Name"}
            </Typography>
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
          <TextField label="Phone" {...register("phone")} fullWidth />
          <TextField label="Address" {...register("address")} fullWidth />
          <TextField label="email" {...register("email")} fullWidth />
        </Stack>
      </EditDialog>
    </>
  );
};
