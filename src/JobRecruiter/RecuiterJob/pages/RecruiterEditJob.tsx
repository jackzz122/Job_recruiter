// import { useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { JobFormData } from "../../../types/JobType";
import { colorButtonOrange } from "../../../themeContext";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { RenderBulletPointSection } from "../component/RenderBulletPointSection";
import { useGetMajorbyNameQuery } from "../../../redux/feature/major/majorApiSlice";
import { SelectMajorField } from "../component/SelectMajorField";
import { BasicInformation } from "../component/BasicInformation";
// import { UploadImage } from "../component/UploadImage";
import { handleError } from "../../../helper/HandleError/handleError";
import { toast } from "react-toastify";
// import { useCreateJobsMutation } from "../../../redux/feature/job/jobApiSlice";

import { useCreateJobsMutation } from "../../../redux/feature/job/jobApiSlice";

export const RecruiterEditJob = () => {
  const navigate = useNavigate();
  const methods = useForm<JobFormData>({
    defaultValues: {
      title: "",
      sizingPeople: 1,
      majorId: [{ value: "" }],
      minRange: 1,
      maxRange: 1,
      location: "",
      startDate: "",
      experience: 1,
      applicationDeadline: "",
      description: {
        summary: "",
        keySkills: {
          mainText: "",
          bulletPoints: [{ value: "" }],
        },
        whyYouLoveIt: {
          mainText: "",
          bulletPoints: [{ value: "" }],
        },
      },
    },
  });
  const {
    // register,
    handleSubmit,
    reset,

    // setValue,
  } = methods;

  // const [previewImage, setPreviewImage] = useState<string | null>(null);
  // const [createJob, { isLoading }] = useCreateJobsMutation();
  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setPreviewImage(URL.createObjectURL(file));
  //     setValue("image", file);
  //   }
  // };
  const { data: majors } = useGetMajorbyNameQuery();
  // const handleRemoveImage = () => {
  //   setPreviewImage(null);
  // };
  const [createJob, { isLoading }] = useCreateJobsMutation();
  const onSubmit: SubmitHandler<JobFormData> = async (data) => {
    try {
      // const companyId = (user?.companyId as CompanyType)?._id;
      // const accountId = user?._id as string;
      // const newJobs = {
      //   ...data,
      //   companyId,
      //   accountId,
      // };
      const response = await createJob(data);
      console.log("response", response);
      toast.success("Job created successfully");
      // navigate("/recruiter/recruiter_job");
    } catch (err) {
      const error = handleError(err);
      console.log(error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Stack spacing={3}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, color: colorButtonOrange }}
          >
            Edit Job Posting
          </Typography>
        </Box>

        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate("/recruiter/dashboard")}
            sx={{ cursor: "pointer" }}
          >
            Dashboard
          </Link>
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate("/recruiter/recruiter_job")}
            sx={{ cursor: "pointer" }}
          >
            Jobs
          </Link>
          <Typography color="text.primary">Edit Job</Typography>
        </Breadcrumbs>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
          }}
        >
          <FormProvider {...methods}>
            <Stack spacing={2}>
              {/* Job Title */}
              <BasicInformation />

              <Divider />

              {/* Key Skills Section */}
              <RenderBulletPointSection
                nameFields="description.keySkills.bulletPoints"
                title="Key Skills"
                name="keySkills"
              />

              <Divider />

              {/* Why You'll Love It Section */}
              <RenderBulletPointSection
                nameFields="description.whyYouLoveIt.bulletPoints"
                title="Why You'll Love It"
                name="whyYouLoveIt"
              />

              <Divider />

              <SelectMajorField majors={majors || []} />

              {/* Image Upload */}
              {/* <UploadImage
                register={register}
                handleImageUpload={handleImageUpload}
                handleRemoveImage={handleRemoveImage}
                previewImage={previewImage}
              /> */}

              {/* Action Buttons */}
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    reset();
                    navigate(-1);
                  }}
                  sx={{ borderColor: "divider" }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  loading={isLoading}
                  onClick={handleSubmit(onSubmit)}
                  sx={{
                    backgroundColor: "primary.main",
                    "&:hover": { backgroundColor: "primary.dark" },
                  }}
                >
                  Save Changes
                </Button>
              </Box>
            </Stack>
          </FormProvider>
        </Paper>
      </Stack>
    </Container>
  );
};
