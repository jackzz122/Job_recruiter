import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import { HeaderOfDetails } from "../../../user/company/DetailsCompany/HeaderOfDetails";
import { ListOfComment } from "./components/ListOfComment";
import { useGetCommentsQuery } from "../../../redux/feature/comment/commentApiSlice";
import { useParams } from "react-router-dom";

export const ReviewComp = () => {
  const { id } = useParams();
  const ratingDistribution = [
    { star: 5, percentage: 20 },
    { star: 4, percentage: 37 },
    { star: 3, percentage: 33 },
    { star: 2, percentage: 8 },
    { star: 1, percentage: 2 },
  ];
  const { data: commentList } = useGetCommentsQuery(id as string, {
    skip: !id,
  });
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
        <HeaderOfDetails name="Đánh giá chung">
          <Box
            sx={{
              display: "flex",
              gap: 4,
              marginTop: "1rem",
            }}
          >
            {/* Left section - Average Rating */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h2" sx={{ fontWeight: "bold", mb: 1 }}>
                3.7
              </Typography>
              <Rating value={3.7} readOnly size="large" sx={{ mb: 1 }} />
              <Typography color="text.secondary">
                {commentList?.data.length} đánh giá
              </Typography>
            </Box>

            {/* Middle section - Rating Distribution */}
            <Box sx={{ flex: 1 }}>
              {ratingDistribution.map((rating) => (
                <Box
                  key={rating.star}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "40px",
                    }}
                  >
                    <Typography>{rating.star}</Typography>
                    <Box component="span" sx={{ color: "orange", ml: 0.5 }}>
                      ★
                    </Box>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={rating.percentage}
                    sx={{
                      flex: 1,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "rgba(255, 152, 0, 0.1)",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "orange",
                        borderRadius: 4,
                      },
                    }}
                  />
                  <Typography sx={{ minWidth: "45px" }}>
                    {rating.percentage}%
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Right section - Recommendation Percentage */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                minWidth: "150px",
              }}
            >
              <Box sx={{ position: "relative", width: 120, height: 120 }}>
                <CircularProgress
                  variant="determinate"
                  value={82}
                  size={120}
                  thickness={4}
                  sx={{
                    color: "#2e7d32",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    82
                    <Typography component="span" variant="h6">
                      %
                    </Typography>
                  </Typography>
                </Box>
              </Box>
              <Typography
                sx={{
                  mt: 1,
                  textAlign: "center",
                  fontWeight: "medium",
                }}
              >
                Khuyến khích làm việc tại đây
              </Typography>
            </Box>
          </Box>
        </HeaderOfDetails>
      </Box>
      <ListOfComment />
    </Box>
  );
};
