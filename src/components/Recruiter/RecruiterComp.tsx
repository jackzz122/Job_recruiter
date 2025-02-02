import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Divider from "@mui/material/Divider";

import { ListOfRequirement } from "../ListOfRequirement";
import { ListOfHighlightComp } from "../ListOfHighlightComp";
export const RecruiterComp = () => {
  const isHotOrNot = true;
  const requires = ["ProjectManager", "Bridge Engineer", "Japanese"];
  const highlights = [
    "Nâng cao kĩ thuật với các kĩ sư giàu kinh nghiệm",
    "Làm việc trong công nghệ Nhật Bản chuyên nghiệp",
    "Thu nhập cạnh tranh, nhiều chế độ hấp dẫn",
  ];
  return (
    <Box
      padding={3}
      sx={{
        border: "1px solid #fff4ec",
        borderRadius: "0.75rem",
        backgroundColor: `${isHotOrNot ? "#fff4ec" : ""}`,
      }}
    >
      <Typography variant="body2" sx={{ color: "gray" }}>
        Đăng 3 ngày trước
      </Typography>
      <Typography variant="h6" fontWeight="bold" sx={{ marginBlock: "1rem" }}>
        [HAN] C#/.Net Technical Leader | Upto 2000
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <img src="/bss_avatar.png" alt="" className="w-1/6" />
        <Typography variant="body2">Hybrid Techonologies</Typography>
      </Stack>
      <Typography sx={{ color: "green", marginBlock: "1rem" }}>
        <MonetizationOnIcon />
        1,500 - 2,000 USD
      </Typography>
      <Divider />
      <Box marginTop={2}>
        <Typography>
          {" "}
          <PersonOutlineOutlinedIcon sx={{ marginRight: "0.3rem" }} />
          Linh hoạt
        </Typography>
        <Typography>
          {" "}
          <LocationOnOutlinedIcon /> Ho Chi Minh - Ha Noi - Da Nang
        </Typography>
      </Box>
      <ListOfRequirement listOfRequire={requires} />
      <Divider />
      {isHotOrNot && <ListOfHighlightComp listHighlights={highlights} />}
    </Box>
  );
};
