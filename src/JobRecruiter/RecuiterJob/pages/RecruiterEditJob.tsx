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
import { useNavigate, useParams } from "react-router-dom";
import { JobFormData } from "../../../types/JobType";
import { colorButtonOrange } from "../../../themeContext";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { RenderBulletPointSection } from "../component/RenderBulletPointSection";
import { useGetMajorbyNameQuery } from "../../../redux/feature/major/majorApiSlice";
import { SelectMajorField } from "../component/SelectMajorField";
import { BasicInformation } from "../component/BasicInformation";
import { handleError } from "../../../helper/HandleError/handleError";
import { toast } from "react-toastify";

import {
  useCreateJobsMutation,
  useGetJobByIdQuery,
  useUpdateJobsMutation,
} from "../../../redux/feature/job/jobApiSlice";
import { formDetail, getJobDefaultValues } from "../helper/getJobDefaultValues";
import { useEffect } from "react";

export const RecruiterEditJob = ({ mode }: { mode: "create" | "update" }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: jobData } = useGetJobByIdQuery(id as string, {
    skip: !id || mode === "create",
  });
  const methods = useForm<JobFormData>({
    defaultValues: formDetail,
  });
  useEffect(() => {
    if (mode === "update" && jobData) {
      methods.reset(getJobDefaultValues(jobData));
    }
  }, [jobData, mode, methods]);
  const { handleSubmit, reset } = methods;

  const { data: majors } = useGetMajorbyNameQuery();

  const [createJob, { isLoading }] = useCreateJobsMutation();
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobsMutation();
  const onSubmit: SubmitHandler<JobFormData> = async (data) => {
    try {
      if (mode === "create") {
        const response = await createJob(data);
        if (response?.data?.success) {
          toast.success("Job created successfully");
          navigate("/recruiter/job_management");
        }
      }
      if (mode === "update") {
        const idJob = jobData?.data._id as string;
        const response = await updateJob({ _id: idJob, ...data });
        if (response?.data?.success) {
          toast.success("Job created successfully");
          navigate("/recruiter/job_management");
        }
      }
    } catch (err) {
      const error = handleError(err);
      toast.error(error?.message || "Update failed");
    }
  };

  return (
    <Container maxWidth="lg">
      <Stack spacing={3}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton sx={{ marginTop: 2 }} onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, color: colorButtonOrange, marginTop: 2 }}
          >
            Edit Job Posting
          </Typography>
        </Box>

        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate("/recruiter")}
            sx={{ cursor: "pointer" }}
          >
            Dashboard
          </Link>
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate("/recruiter/job_management")}
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

              <SelectMajorField majors={majors?.data || []} />

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
                {mode === "update" && (
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    loading={isUpdating}
                    onClick={handleSubmit(onSubmit)}
                    sx={{
                      backgroundColor: "primary.main",
                      "&:hover": { backgroundColor: "primary.dark" },
                    }}
                  >
                    Update
                  </Button>
                )}
                {mode === "create" && (
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
                )}
              </Box>
            </Stack>
          </FormProvider>
        </Paper>
      </Stack>
    </Container>
  );
};
