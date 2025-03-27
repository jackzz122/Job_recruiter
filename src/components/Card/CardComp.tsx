import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
export default function CardComp() {
  const text = "Công ty BSS group";
  const nameJob = "Tuyển dụng Thực tập sinh NodeJS , ReactJS";
  return (
    <Card
      sx={{
        display: "flex",
        cursor: "pointer",
        alignItems: "center",
        "&:hover": {
          backgroundColor: "#E0E0E0",
          transition: "all 0.5s ease-in",
          color: "green",
        },
        paddingLeft: "10px",
        paddingRight: "5px",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: "6.25rem",
          height: "6.25rem",
          objectFit: "contain",
          borderRadius: "10px",
          flexShrink: 0,
        }}
        image="./bss_avatar.png"
        alt="Company_img"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minWidth: 0,
        }}
      >
        <CardContent sx={{ width: "100%" }}>
          <Link to={`/job/${nameJob}`}>
            <Typography
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                flexShrink: 0,
              }}
              fontWeight="bold"
              noWrap
              gutterBottom
            >
              {nameJob}
            </Typography>
          </Link>
          <Link to={`company/${text}`}>
            <Typography
              fontSize={13}
              noWrap
              sx={{ "&:hover": { color: "#990000" } }}
            >
              {text}
            </Typography>
          </Link>
          <Stack direction="row" spacing={1} marginTop={1}>
            <Chip label="4 triệu" />
            <Chip label="Ha Noi" />
          </Stack>
        </CardContent>
      </Box>
    </Card>
  );
}
