import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import LinearProgress from "@mui/material/LinearProgress";
import { HeaderOfDetails } from "../../../user/company/DetailsCompany/HeaderOfDetails";
import { ListOfComment } from "./components/ListOfComment";
import { useGetCommentsQuery } from "../../../redux/feature/comment/commentApiSlice";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Grid2 from "@mui/material/Grid2";
import StarIcon from "@mui/icons-material/Star";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";

export const ReviewComp = () => {
  const { id } = useParams();
  const { data: commentList } = useGetCommentsQuery(id as string, {
    skip: !id,
  });

  const ratingStats = useMemo(() => {
    if (!commentList?.data) {
      return {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: [0, 0, 0, 0, 0],
        positiveReviews: 0,
      };
    }

    const comments = commentList.data;
    const totalReviews = comments.length;

    // Calculate average rating
    const totalRating = comments.reduce(
      (sum, comment) => sum + comment.rating,
      0
    );
    const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

    // Calculate rating distribution
    const ratingCounts = [0, 0, 0, 0, 0];
    comments.forEach((comment) => {
      ratingCounts[comment.rating - 1]++;
    });

    // Calculate positive reviews (rating >= 4)
    const positiveReviews = comments.filter(
      (comment) => comment.rating >= 4
    ).length;

    return {
      averageRating,
      totalReviews,
      ratingDistribution: ratingCounts.reverse(),
      positiveReviews,
    };
  }, [commentList?.data]);

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "#2e7d32";
    if (rating >= 3) return "#ed6c02";
    return "#d32f2f";
  };

  return (
    <Box
      sx={{
        height: "calc(100vh - rem)",
        overflow: "auto",
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#888",
          borderRadius: "10px",
          "&:hover": {
            background: "#555",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "sticky",
          backgroundColor: "white",
          zIndex: 1,
        }}
      >
        <HeaderOfDetails name="Reviews">
          <Stack spacing={2}>
            {/* Top Section - Rating Overview */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                background: "linear-gradient(to right, #ffffff, #f8f9fa)",
              }}
            >
              <Stack direction="row" spacing={4} alignItems="center">
                {/* Average Rating */}
                <Box sx={{ textAlign: "center", minWidth: 200 }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: "bold",
                      mb: 1,
                      color: getRatingColor(ratingStats.averageRating),
                      fontSize: { xs: "2.5rem", md: "3rem" },
                    }}
                  >
                    {ratingStats.averageRating.toFixed(1)}
                  </Typography>
                  <Rating
                    value={ratingStats.averageRating}
                    readOnly
                    size="large"
                    sx={{ mb: 1 }}
                    precision={0.1}
                  />
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{
                      fontWeight: 500,
                      letterSpacing: "0.5px",
                    }}
                  >
                    Based on {ratingStats.totalReviews} reviews
                  </Typography>
                </Box>

                {/* Rating Distribution */}
                <Box sx={{ flex: 1 }}>
                  <Stack spacing={1.5}>
                    {ratingStats.ratingDistribution.map((count, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          p: 0.5,
                          borderRadius: 1,
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.02)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            width: 100,
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              mr: 1,
                              fontWeight: 500,
                              color: "text.primary",
                            }}
                          >
                            {5 - index} stars
                          </Typography>
                          <StarIcon sx={{ color: "gold", fontSize: 16 }} />
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={(count / ratingStats.totalReviews) * 100}
                          sx={{
                            flex: 1,
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: "rgba(0, 0, 0, 0.05)",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: getRatingColor(5 - index),
                              borderRadius: 3,
                            },
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            minWidth: 40,
                            fontWeight: 500,
                            color: "text.primary",
                          }}
                        >
                          {count}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Paper>

            {/* Bottom Section - Statistics */}
            <Grid2 container spacing={2}>
              {/* Positive Reviews */}
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    border: "1px solid #e0e0e0",
                    borderRadius: 2,
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        backgroundColor: "success.light",
                        borderRadius: 2,
                        p: 1,
                        width: "fit-content",
                      }}
                    >
                      <ThumbUpIcon
                        sx={{ color: "success.main", fontSize: 24 }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: "bold",
                          color: "success.main",
                        }}
                      >
                        {ratingStats.positiveReviews}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontWeight: 500,
                        }}
                      >
                        Positive Reviews
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Grid2>

              {/* Total Reviews */}
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    border: "1px solid #e0e0e0",
                    borderRadius: 2,
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        backgroundColor: "primary.light",
                        borderRadius: 2,
                        p: 1,
                        width: "fit-content",
                      }}
                    >
                      <CommentIcon
                        sx={{ color: "primary.main", fontSize: 24 }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: "bold",
                          color: "primary.main",
                        }}
                      >
                        {ratingStats.totalReviews}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontWeight: 500,
                        }}
                      >
                        Total Reviews
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Grid2>
            </Grid2>
          </Stack>
        </HeaderOfDetails>
      </Box>
      <ListOfComment />
    </Box>
  );
};
