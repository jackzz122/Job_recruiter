import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Grid2";
import { HeaderOfDetails } from "./HeaderOfDetails";
import { ListOfRequirement } from "../../component/lists/ListOfRequirement";
import { ListOfHighlightComp } from "../../component/lists/ListOfHighlightComp";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { useGetDetailCompanyQuery } from "../../../redux/feature/company/companyApiSlice";
// const listOfTechStack = ["Java", "JavaScript", "ProjectManager", "Japanese"];
const listHiglights = [
  { value: "CRM Development & Cloud Service" },
  { value: "Web/Mobile Application Development Service" },
  { value: "AI/Blockchain Development Service" },
  { value: "Digital Consulting (DX)" },
];
// const reasonOfLoves = [
//   " Nâng cao kĩ thuật với các kĩ sư giàu kinh nghiệm",
//   "Môi trường văn hóa Nhật Bản chuyên nghiệp",
//   "Thu nhập cạnh tranh, chế độ phúc lợi hấp dẫn",
// ];
// const coreOfCompany = [
//   "Giao tiếp (Communication): Chủ động đối thoại không ngần ngại",
//   "Giải pháp (Solution): Đưa ra giải pháp khả thi nhất, phù hợp với mọi nhu cầu, hoàn cảnh",
//   "Mối quan hệ (Relation): Xây dựng mối quan hệ đồng hành, phát triển bền vững và đáng tin cậy",
// ];
export const DetailsComp = () => {
  const { id } = useParams();
  const { data: companyDetail } = useGetDetailCompanyQuery(id || "");
  return (
    <Box sx={{ backgroundColor: "#f3f5f7" }}>
      <HeaderOfDetails name="Thông tin chung">
        <Grid2 container marginTop={3} spacing={2}>
          <Grid2 size={4}>
            <Typography variant="body2" sx={{ color: "gray" }}>
              Ngày thành lập: {companyDetail?.data.years}
            </Typography>
          </Grid2>
          <Grid2 size={4}>
            <Typography variant="body2" sx={{ color: "gray" }}>
              Url Công ty:{" "}
              <a
                className="text-blue-400"
                href={companyDetail?.data.websiteUrl}
                target="_blank"
              >
                {companyDetail?.data.websiteUrl}
              </a>
            </Typography>
          </Grid2>
          <Grid2 size={4}>
            <Typography variant="body2" sx={{ color: "gray" }}>
              Quy mô công ty: {companyDetail?.data.description[0].companySize}
            </Typography>
          </Grid2>
          <Grid2 size={4}>
            <Typography variant="body2" sx={{ color: "gray" }}>
              Quốc gia : {companyDetail?.data.country}
            </Typography>
          </Grid2>
          <Grid2 size={4}>
            <Typography variant="body2" sx={{ color: "gray" }}>
              Thời gian làm việc :{" "}
              {companyDetail?.data.description[0].workingDays} days
            </Typography>
          </Grid2>
          <Grid2 size={4}>
            <Typography variant="body2" sx={{ color: "gray" }}>
              Làm việc ngoài giờ :{" "}
              {companyDetail?.data.overTime ? "Có" : "Không"}
            </Typography>
          </Grid2>
        </Grid2>
      </HeaderOfDetails>
      <HeaderOfDetails name="Giới thiệu công ty">
        <p className="mt-5">{companyDetail?.data.description[0].about}</p>
        {/* <ListOfHighlightComp listHighlights={coreOfCompany} /> */}
      </HeaderOfDetails>
      <HeaderOfDetails name="Chuyên môn của chúng tôi">
        <Typography sx={{ marginBlock: "1rem" }}>Tech Stack</Typography>
        <ListOfRequirement
          listOfRequire={
            companyDetail && companyDetail?.data.keySkills
              ? companyDetail?.data.keySkills
              : []
          }
        />
        <ListOfHighlightComp listHighlights={listHiglights} />
      </HeaderOfDetails>
      {/* <HeaderOfDetails name="Tại sao bạn sẽ yêu thích làm việc tại đây?">
        <ListOfHighlightComp listHighlights={reasonOfLoves} />
      </HeaderOfDetails>
      <HeaderOfDetails name="Về Chúng Tôi">
        <p>Nioce</p>
      </HeaderOfDetails> */}
      <HeaderOfDetails name="Địa điểm">
        <p>Nice</p>
      </HeaderOfDetails>
    </Box>
  );
};
