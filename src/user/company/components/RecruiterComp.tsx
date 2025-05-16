import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { ListOfRequirement } from "../../component/lists/ListOfRequirement";
import { ListOfHighlightComp } from "../../component/lists/ListOfHighlightComp";
import { Link } from "react-router-dom";
import { ListOfInformation } from "../../component/lists/ListOfInformation";
import { JobResponse } from "../../../types/JobType";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
export const RecruiterComp = ({
  jobDetail,
  isChoose,
  isHotOrNot,
}: {
  jobDetail: JobResponse;
  isChoose?: boolean;
  isHotOrNot?: boolean;
}) => {
  const highlights = [
    { value: "Nâng cao kĩ thuật với các kĩ sư giàu kinh nghiệm" },
    { value: "Làm việc trong công nghệ Nhật Bản chuyên nghiệp" },
    { value: "Thu nhập cạnh tranh, nhiều chế độ hấp dẫn" },
  ];
  const company = jobDetail.companyId;
  const isString = typeof company === "string";

  const isActive = new Date(jobDetail.applicationDeadline) > new Date();

  return (
    <Link to={`/job/${jobDetail._id}`}>
      <Box
        padding={3}
        sx={{
          border: "1px solid #fff4ec",
          borderRadius: "0.75rem",
          backgroundColor: `${isHotOrNot ? "#fff4ec" : "white"}`,
          borderColor: `${isChoose && "red"}`,
          marginBottom: "1rem",
          position: "relative",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="body2" sx={{ color: "gray" }}>
            {formatDistanceToNow(new Date(jobDetail?.startDate), {
              addSuffix: true,
              locale: vi,
            })}
          </Typography>
          <Chip
            icon={isActive ? <CheckCircleOutlineIcon /> : <AccessTimeIcon />}
            label={isActive ? "Đang tuyển" : "Đã kết thúc"}
            size="small"
            sx={{
              backgroundColor: isActive
                ? "rgba(76, 175, 80, 0.1)"
                : "rgba(158, 158, 158, 0.1)",
              color: isActive ? "#4caf50" : "#9e9e9e",
              fontWeight: 500,
              "& .MuiChip-icon": {
                color: "inherit",
              },
            }}
          />
        </Stack>
        <Typography variant="h6" fontWeight="bold">
          {jobDetail.title}
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <img
            src={
              isString
                ? "/bss_avatar.png"
                : company.logo
                ? company.logo
                : "/bss_avatar.png"
            }
            alt={isString ? company : company.companyName}
            className="w-1/6 border "
          />
          <Typography variant="body2">
            {isString ? company : company.companyName}
          </Typography>
        </Stack>
        <Typography
          fontWeight="bold"
          sx={{ color: "green", marginBlock: "0.5rem" }}
        >
          <MonetizationOnIcon />
          {jobDetail.minRange} - {jobDetail.maxRange} USD
        </Typography>
        <Divider
          sx={{
            borderBottomStyle: "dotted",
            borderColor: "rgba(0, 0, 0, 0.2)",
          }}
        />
        <Box marginTop={2}>
          <ListOfInformation
            workType="Tại công ty"
            place={jobDetail.location}
          />
        </Box>
        <ListOfRequirement listOfRequire={jobDetail.majorId} />
        {isHotOrNot && <ListOfHighlightComp listHighlights={highlights} />}
      </Box>
    </Link>
  );
};
