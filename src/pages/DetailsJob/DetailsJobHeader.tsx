import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import EditLocationAltOutlinedIcon from "@mui/icons-material/EditLocationAltOutlined";
import Chip from "@mui/material/Chip";
export default function DetailsJobHeader() {
  return (
    <Box
      sx={{
        flexGrow: 2,
        backgroundColor: "white",
        borderRadius: "0.3rem",
        paddingBlock: "0.75rem",
        paddingInline: "1.25rem",
        marginBottom: "0.75rem",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        [Hanoi] Senior SRE (DevOps Engineer, AWS)
      </Typography>
      <Typography variant="body1" sx={{ marginTop: "1rem" }}>
        MONEY FORWARD VIETNAM CO.,LTD
      </Typography>
      <Typography
        sx={{ color: "green", marginBlock: "0.5rem" }}
        fontWeight="bold"
      >
        {" "}
        <MonetizationOnIcon /> You will love it
      </Typography>
      <Stack direction="row" spacing={1}>
        <Button
          sx={{
            flexGrow: 1,
            backgroundColor: "#e50000",
            color: "white",
            padding: "1rem",
          }}
          variant="contained"
        >
          Ứng tuyển
        </Button>
        <Button sx={{ flexGrow: 0, border: "1px solid red" }}>
          <FavoriteIcon sx={{ color: "#e50000" }} fontSize="large" />
        </Button>
      </Stack>
      <br />
      <ImageList
        sx={{ width: "100%", height: "12.5rem" }}
        cols={3}
        rowHeight={150}
      >
        <ImageListItem>
          <img src="../../../public/bss_avatar.png" alt="" />
        </ImageListItem>
        <ImageListItem>
          <img src="../../../public/bss_avatar.png" alt="" />
        </ImageListItem>
        <ImageListItem>
          <img src="../../../public/bss_avatar.png" alt="" />
        </ImageListItem>
      </ImageList>
      <Box>
        <Typography sx={{ marginBlock: "1rem" }} variant="body2">
          <EditLocationAltOutlinedIcon sx={{ marginRight: "0.5rem" }} /> 11th
          Floor, ROX Tower, No 54A Nguyen Chi Thanh, Lang Thuong Ward, Dong Da,
          Ha Noi{" "}
        </Typography>
        <Typography sx={{ marginBlock: "1rem" }} variant="body2">
          <EmojiEmotionsOutlinedIcon sx={{ marginRight: "0.5rem" }} />
          Linh hoạt
        </Typography>
        <Typography sx={{ marginBlock: "1rem" }} variant="body2">
          <AccessTimeIcon sx={{ marginRight: "0.5rem" }} />
          Đăng 2 giờ trước
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Typography variant="body2">Kỹ năng</Typography>
          <Chip label="Devops" />
          <Chip label="AWS" />
          <Chip label="Cloud" />
        </Box>
      </Box>
    </Box>
  );
}
