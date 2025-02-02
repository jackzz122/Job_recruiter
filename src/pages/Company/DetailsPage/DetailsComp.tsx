import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Grid2";
import { HeaderOfDetails } from "./HeaderOfDetails";
import { ListOfRequirement } from "../../../components/ListOfRequirement";
import { ListOfHighlightComp } from "../../../components/ListOfHighlightComp";
import Box from "@mui/material/Box";
const listOfTechStack = ["Java", "JavaScript", "ProjectManager", "Japanese"];
const listHiglights = [
  "CRM Development & Cloud Service",
  "Web/Mobile Application Development Service",
  "AI/Blockchain Development Service",
  "Digital Consulting (DX)",
];
const reasonOfLoves = [
  " Nâng cao kĩ thuật với các kĩ sư giàu kinh nghiệm",
  "Môi trường văn hóa Nhật Bản chuyên nghiệp",
  "Thu nhập cạnh tranh, chế độ phúc lợi hấp dẫn",
];
const coreOfCompany = [
  "Giao tiếp (Communication): Chủ động đối thoại không ngần ngại",
  "Giải pháp (Solution): Đưa ra giải pháp khả thi nhất, phù hợp với mọi nhu cầu, hoàn cảnh",
  "Mối quan hệ (Relation): Xây dựng mối quan hệ đồng hành, phát triển bền vững và đáng tin cậy",
];
export const DetailsComp = () => {
  return (
    <Box sx={{ backgroundColor: "#f3f5f7", minHeight: "100vh" }}>
      <HeaderOfDetails name="Thông tin chung">
        <Grid2 container marginTop={3}>
          <Grid2 size={4}>
            <Typography variant="body2" sx={{ color: "gray" }}>
              Mô hình công ty
            </Typography>
          </Grid2>
          <Grid2 size={4}>
            <Typography variant="body2" sx={{ color: "gray" }}>
              Lĩnh vực công ty
            </Typography>
          </Grid2>
          <Grid2 size={4}>
            <Typography variant="body2" sx={{ color: "gray" }}>
              Quy mô công ty
            </Typography>
          </Grid2>
          <Grid2 size={4}>
            <Typography variant="body2" sx={{ color: "gray" }}>
              Quốc gia
            </Typography>
          </Grid2>
          <Grid2 size={4}>
            <Typography variant="body2" sx={{ color: "gray" }}>
              Thời gian làm việc
            </Typography>
          </Grid2>
          <Grid2 size={4}>
            <Typography variant="body2" sx={{ color: "gray" }}>
              Làm việc ngoài giờ
            </Typography>
          </Grid2>
        </Grid2>
      </HeaderOfDetails>
      <HeaderOfDetails name="Giới thiệu công ty">
        <p className="mt-5">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
          consectetur fugiat reprehenderit obcaecati quo alias veniam maiores
          iste hic. Veritatis, culpa eaque. Ipsam voluptas dolore veritatis vero
          mollitia accusamus omnis.
        </p>
        <ListOfHighlightComp listHighlights={coreOfCompany} />
      </HeaderOfDetails>
      <HeaderOfDetails name="Chuyên môn của chúng tôi">
        <Typography sx={{ marginBlock: "1rem" }}>Tech Stack</Typography>
        <ListOfRequirement listOfRequire={listOfTechStack} />
        <ListOfHighlightComp listHighlights={listHiglights} />
      </HeaderOfDetails>
      <HeaderOfDetails name="Tại sao bạn sẽ yêu thích làm việc tại đây?">
        <ListOfHighlightComp listHighlights={reasonOfLoves} />
      </HeaderOfDetails>
      <HeaderOfDetails name="Về Chúng Tôi">
        <p>Nioce</p>
      </HeaderOfDetails>
      <HeaderOfDetails name="Địa điểm">
        <p>Nice</p>
      </HeaderOfDetails>
    </Box>
  );
};
