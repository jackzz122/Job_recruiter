import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";

export default function DetailsInforCompany() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "white",
        borderRadius: "0.3rem",
        paddingBlock: "0.75rem",
        paddingInline: "1.25rem",
        maxWidth: "26.375rem",
        maxHeight: "29.688rem",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Stack direction="row" spacing={2}>
        <img
          src="../../../public/bss_avatar.png"
          alt="company_name"
          className="w-1/3 border border-gray-400"
        />
        <Box>
          <Typography variant="h6" fontWeight="bold">
            MONEY FORWARD VIETNAM CO.,LTD
          </Typography>
          <Link to="" className="hover:underline text-blue-500">
            Xem Công ty
          </Link>
        </Box>
      </Stack>
      <br />
      <Typography>Top 1 Fintech Compan</Typography>
      <List>
        <ListItem
          sx={{
            display: "flex",
            marginInline: "-1rem",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ color: "gray" }}>Mô hình công ty</Typography>
          <Typography>Sản phẩm</Typography>
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            display: "flex",
            marginInline: "-1rem",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ color: "gray" }}>Lĩnh vực công ty</Typography>
          <Typography>Sản phẩm</Typography>
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            display: "flex",
            marginInline: "-1rem",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ color: "gray" }}>Quy mô công ty</Typography>
          <Typography>Sản phẩm</Typography>
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            display: "flex",
            marginInline: "-1rem",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ color: "gray" }}>Quốc gia</Typography>
          <Typography>Sản phẩm</Typography>
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            display: "flex",
            marginInline: "-1rem",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ color: "gray" }}>Thời gian làm việc</Typography>
          <Typography>Sản phẩm</Typography>
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            display: "flex",
            marginInline: "-1rem",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ color: "gray" }}>Mô hình công ty</Typography>
          <Typography>Sản phẩm</Typography>
        </ListItem>
        <Divider />
      </List>
    </Box>
  );
}
