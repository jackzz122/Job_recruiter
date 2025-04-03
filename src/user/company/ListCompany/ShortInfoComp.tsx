import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Divider from "@mui/material/Divider";
import { ListOfInformation } from "../../component/lists/ListOfInformation";
import { ListOfRequirement } from "../../component/lists/ListOfRequirement";
import { ListOfHighlightComp } from "../../component/lists/ListOfHighlightComp";
const listReq = [".net", "ASP.net", "C#"];
const listHightlights = [
  "Chế độ đãi ngộ hấp dẫn, phù hợp với năng lực",
  "Môi trường làm việc hiện đại",
  "Tổ chức học tập sôi nổi",
];
const jobRequire = [
  "Lập trình các phần mềm doanh nghiệp trên nền tảng C#, .NET",
  "Lập trình tích hợp giữa phần mềm của công ty với các phần mềm, hoặc các phần cứng khác trên thị trường",
  "Nâng cấp, sửa lỗi các dự án phần mềm đang hoạt động.",
  "Phối hợp, hỗ trợ các bộ phận khác phân tích nghiệp vụ, chuyển giao phần mềm cho khách hàng",
  "Lập trình các module mới theo yêu cầu của khách hàng.",
];
const userRequire = [
  "Tốt nghiệp Cao đẳng trở lên chuyên ngành về CNTT, toán tin, lập trình phần mềm, khoa học máy tính...",
  "Từ 5 năm kinh nghiệm trở lên sử dụng .NET",
  "Ưu tiên các ứng viên có kinh nghiệm triển khai các dự án outsource cho khối doanh nghiệp, Chính phủ",
  "Thành thạo về hệ quản trị cơ sở dữ liệu MS SQL Server",
  "Thành thạo lập trình ASP.NET, C#, MVC/MVC 5 / .NET Core, .NET Framework, Entity Framework",
  "Nắm chắc kiến thức về RESTful service/Web API (REST, SOAP), XML, JSON",
  "Giao tiếp tốt, giải quyết vấn đề linh hoạt",
  "Kỹ năng tự lập kế hoạch và triển khai công việc cá nhân",
  "Nhạy bén với số liệu, khả năng tư duy logic tốt",
  "Kỹ năng làm việc độc lập hoặc theo nhóm, làm việc dưới áp lực cao",
  "Kỹ năng học hỏi, nghiên cứu các công nghệ mới",
];
const reasonLove = [
  "Mức thu nhập hấp dẫn và các phụ cấp khác.",
  "Chế độ thưởng các ngày lễ tết, thưởng cuối năm, thưởng hiệu quả dự án.",
  "Các chế độ khác theo Luật quy định.",
];
export const ShortInfoComp = () => {
  return (
    <div className="sticky_div">
      <Box>
        <Stack direction="row" spacing={2} alignItems="center">
          <img src="/bss_avatar.png" alt="" className="w-[13%] border" />
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Senior/Middle Front-end (ReactJS) Developer
            </Typography>
            <Typography variant="body2">Esoft Vietnam., Ltd</Typography>
            <Typography variant="body2" sx={{ color: "green" }}>
              <MonetizationOnIcon /> 1,500 - 2,500 USD
            </Typography>
          </Box>
        </Stack>
        <br />
        <Stack direction="row" spacing={2} marginBottom={2}>
          <Button
            sx={{
              flexGrow: 1,
              backgroundColor: "#e50000",
              color: "white",
              padding: "0.25rem",
            }}
            variant="contained"
          >
            Ứng tuyển
          </Button>
          <Button sx={{ flexGrow: 0, border: "1px solid red" }}>
            <FavoriteIcon sx={{ color: "#e50000" }} fontSize="large" />
          </Button>
        </Stack>
        <Divider />
        <Box sx={{ marginBlock: "1rem" }}>
          <ListOfInformation
            place="Tòa nhà D’Office, số 28 Thành Thái, Dịch Vọng, Cau Giay, Ha Noi"
            workType="Tại văn phòng"
            time="8 ngày trước"
          />
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography>Kỹ năng</Typography>
            <ListOfRequirement listOfRequire={listReq} />
          </Stack>
        </Box>
        <Divider />
        <Box sx={{ marginBlock: "1rem" }}>
          <Typography variant="h5" fontWeight="bold">
            3 lý do gia nhập công ty
          </Typography>
          <ListOfHighlightComp listHighlights={listHightlights} />
        </Box>
        <Divider />
        <Box sx={{ marginBlock: "1rem" }}>
          <Typography variant="h5" fontWeight="bold">
            Mô tả công việc
          </Typography>
          <ListOfHighlightComp listHighlights={jobRequire} />
        </Box>
        <Divider />
        <Box sx={{ marginBlock: "1rem" }}>
          <Typography variant="h5" fontWeight="bold">
            Yêu cầu công việc
          </Typography>
          <ListOfHighlightComp listHighlights={userRequire} />
        </Box>
        <Divider />
        <Box sx={{ marginBlock: "1rem" }}>
          <Typography variant="h5" fontWeight="bold">
            Tại sao bạn sẽ yêu thích làm việc tại đây
          </Typography>
          <ListOfHighlightComp listHighlights={reasonLove} />
        </Box>
      </Box>
    </div>
  );
};

// #fff4ec
