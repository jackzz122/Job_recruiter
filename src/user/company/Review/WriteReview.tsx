import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid2 from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import { FiberManualRecord as DotIcon } from "@mui/icons-material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ControllerRenderProps,
  FormProvider,
  SubmitHandler,
  useForm,
  Controller,
} from "react-hook-form";
import { CommentType } from "../../../types/CommentType";
import { colorButtonOrange } from "../../../themeContext";
import { handleError } from "../../../helper/HandleError/handleError";
import { toast } from "react-toastify";
import { useCreateCommentMutation } from "../../../redux/feature/comment/commentApiSlice";

export const WriteReview = () => {
  const [searchParams] = useSearchParams();
  const companyName = searchParams.get("companyName");
  const companyId = searchParams.get("companyId");
  const methods = useForm<CommentType>({
    defaultValues: {
      title: "",
      rating: 0,
      details: {
        whyLove: "",
        suggest: "",
      },
    },
  });
  const { register, handleSubmit, control } = methods;
  const [createdComment, {isLoading}] = useCreateCommentMutation(); 
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<CommentType> = async (data) => {
    if(companyId === null) return;
    try{
        console.log({
            ...data,
            rating: Number(data.rating),
            company_id: companyId
        });
        const response = await createdComment({
            ...data,
            rating: Number(data.rating),
            company_id: companyId
        }).unwrap();
        if(response.success) {
            toast.success(response.message);
            navigate(`/company/${companyId}`);
        }
    }catch(err) {
        const error = handleError(err);
        toast.error(error.message);
    }
  };
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
      {/* Header */}
      <Box
        className="companyColor"
        sx={{
          py: 2,
          height: "auto",
          position: "relative",
        }}
      >
        <Container>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "white",
            }}
          >
            <IconButton
              onClick={() => navigate(-1)}
              sx={{
                color: "white",
                mr: 2,
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h6">Write a Review</Typography>
          </Box>
        </Container>
      </Box>

      <Container sx={{ py: 4 }}>
        <Grid2 container spacing={4}>
          {/* Main Form Section */}
          <Grid2 size={{ xs: 12, lg: 8 }}>
            <Paper sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom>
                Review {companyName} Việt Nam
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 4 }}>
                It only takes you 1 minute to complete this review form. Your
                opinion will be very helpful for the Developer community who are
                looking for a job.
              </Typography>

              <FormProvider {...methods}>
                {/* Overall Rating */}
                <Box>
                  <Typography component="legend" sx={{ mb: 1 }}>
                    Overall rating{" "}
                    <Box component="span" sx={{ color: "error.main" }}>
                      *
                    </Box>
                  </Typography>
                  <Controller
                    name="rating"
                    defaultValue={0}
                    control={control}
                    render={({field}: {field: ControllerRenderProps<CommentType, "rating">}) => {
                      return (
                        <Rating size="large" {...field} value={Number(field.value)} />
                      );
                    }}
                  />
                </Box>

                {/* Summary */}
                <TextField
                  label="Summary"
                  {...register("title")}
                  required
                  sx={{ marginBottom: 2 }}
                  fullWidth
                  placeholder="Write a headline for your review"
                  name="title"
                />

                {/* Why Love */}
                <TextField
                  label="What did you love about working here?"
                  {...register("details.whyLove")}
                  required
                  multiline
                  rows={4}
                  sx={{ marginBottom: 2 }}
                  fullWidth
                  placeholder="Share the pros and what you enjoyed most about working at this company"
                />

                {/* Suggestions */}
                <TextField
                  label="What could be improved?"
                  {...register("details.suggest")}
                  required
                  sx={{ marginBottom: 2 }}
                  multiline
                  rows={4}
                  fullWidth
                  placeholder="Share your suggestions for improvement and what could have been better"
                />

                <Button
                  variant="contained"
                  size="large"
                  loading = {isLoading}
                  fullWidth
                  onClick={handleSubmit(onSubmit)}
                  sx={{ mt: 2, backgroundColor: colorButtonOrange, color: "white" }}
                >
                  Submit Review
                </Button>
              </FormProvider>
            </Paper>
          </Grid2>

          {/* Guidelines Section */}
          <Grid2 size={{ xs: 12, lg: 4 }}>
            <Paper sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                Review Guidelines & Conditions
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                In order for a review to be displayed on the website, it must
                adhere to the Guidelines & Conditions for reviews.
              </Typography>

              <Typography fontWeight="medium" gutterBottom>
                Please ensure that:
              </Typography>
              <List>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <DotIcon sx={{ fontSize: 8 }} />
                  </ListItemIcon>
                  <ListItemText primary="Do not use offensive or derogatory language" />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <DotIcon sx={{ fontSize: 8 }} />
                  </ListItemIcon>
                  <ListItemText primary="Do not provide personal information" />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <DotIcon sx={{ fontSize: 8 }} />
                  </ListItemIcon>
                  <ListItemText primary="Do not provide confidential or proprietary business information" />
                </ListItem>
              </List>

              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Thank you for providing the most honest reviews. For more
                detailed information on the Guidelines & Conditions for reviews,
                please visit the link provided.
              </Typography>

              <Button
                color="primary"
                sx={{
                  textTransform: "none",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                View detail
              </Button>
            </Paper>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};
