import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import EditLocationAltOutlinedIcon from "@mui/icons-material/EditLocationAltOutlined";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
export const DetailsHeader = () => {
  return (
    <Stack
      justifyContent="space-between"
      direction="row"
      spacing={2}
      sx={{ marginTop: "1.5rem" }}
    >
      <Stack direction="row" spacing={2}>
        <img src="/bss_avatar.png" alt="" className="w-1/4 rounded-lg " />
        <Box sx={{ color: "white" }}>
          <Typography fontWeight="bold" variant="h5">
            MONEY FORWARD VIETNAM CO.,LTD
          </Typography>
          <Stack direction="row" spacing={3} sx={{ marginBlock: "0.75rem" }}>
            <Typography>
              {" "}
              <EditLocationAltOutlinedIcon />
              Ho Chi Minh
            </Typography>
            <Typography>
              {" "}
              <WorkOutlineOutlinedIcon /> 10 việc làm đang tuyển dụng
            </Typography>
          </Stack>
          <br />
          <Button
            sx={{
              backgroundColor: "red",
              color: "white",
              minWidth: "10rem",
              padding: "0.75rem",
            }}
          >
            Viết đánh giá
          </Button>
          <Button
            sx={{
              backgroundColor: "white",
              color: "red",
              border: "1px solid red",
              minWidth: "10rem",
              marginLeft: "1rem",
              padding: "0.75rem",
            }}
          >
            Theo Dõi
          </Button>
        </Box>
      </Stack>
      <Box
        sx={{
          backgroundColor: "transparent",
          maxHeight: "4.625rem",
          minWidth: "27.875rem",
          color: "white",
          border: "1px solid #f3f5f7",
        }}
      >
        <Stack
          direction="row"
          height="100%"
          alignItems="center"
          paddingInline="2rem"
          justifyContent="space-between"
          spacing={2}
        >
          <Stack direction="row" alignItems="center" gap={2} flexGrow={1}>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ fontSize: "25px" }}
            >
              4.1
            </Typography>
            <Box>
              <Rating value={4} size="small" />
              <Typography>131 Đánh giá</Typography>
            </Box>
          </Stack>
          <Stack
            direction="row"
            flexWrap="wrap"
            alignItems="center"
            spacing={2}
            flexGrow={1}
          >
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ fontSize: "25px" }}
            >
              93%{" "}
            </Typography>
            <Typography sx={{ width: "70%" }}>
              Khuyến khích làm việc tại đây
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};
