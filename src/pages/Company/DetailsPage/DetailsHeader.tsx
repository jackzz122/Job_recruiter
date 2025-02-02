import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import EditLocationAltOutlinedIcon from "@mui/icons-material/EditLocationAltOutlined";
import Box from "@mui/material/Box";
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
      <Box>
        <Stack direction="row" spacing={2}>
          <Stack></Stack>
        </Stack>
      </Box>
    </Stack>
  );
};
