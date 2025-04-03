import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import CardContent from "@mui/material/CardContent";
import AdjustIcon from "@mui/icons-material/Adjust";
const listTypeCompany = [
  "Javascript",
  "Swift",
  "Java",
  "C++",
  "ReactJS",
  "Kotlin",
];
export default function CardCompVip() {
  const text = "Công ty cổ phần Đồng Tâm";
  return (
    <Link to={`/company/${text}`}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "2px solid #e5e5e5",
          alignItems: "center",
          paddingBlock: "3.2rem",
          paddingInline: "3rem",
        }}
        elevation={0}
      >
        <CardMedia
          component="img"
          image="./bss_avatar.png"
          sx={{
            width: "10rem",
            height: "10rem",
            objectFit: "contain",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          }}
          loading="lazy"
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            textAlign="center"
            sx={{ marginTop: "0.3rem" }}
            fontWeight="bold"
            variant="h6"
          >
            {text}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0.75rem",
              marginTop: "0.5rem",
            }}
          >
            {listTypeCompany.map((type) => {
              return <Chip key={type} label={type} />;
            })}
          </Box>
        </CardContent>
      </Card>
      <Box
        sx={{
          backgroundColor: "#e5e5e5",
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body2" sx={{}}>
          Ho Chi Minh - Ha Noi
        </Typography>
        <Link to="history" className="flex items-center gap-2">
          <AdjustIcon sx={{ color: "red" }} />
          <strong>2</strong> việc làm{" "}
          <KeyboardArrowRightOutlinedIcon fontSize="small" />
        </Link>
      </Box>
    </Link>
  );
}
