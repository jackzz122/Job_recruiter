import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { ListOfRequirement } from "../../component/lists/ListOfRequirement";
import { Link } from "react-router-dom";
import { ListOfInformation } from "../../component/lists/ListOfInformation";
import { JobResponse, statusJob } from "../../../types/JobType";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

export const RecruiterComp = ({
  jobDetail,
  isChoose,
  isHotOrNot,
}: {
  jobDetail: JobResponse;
  isChoose?: boolean;
  isHotOrNot?: boolean;
}) => {
  const company = jobDetail.companyId;
  const isString = typeof company === "string";
  const isActive =
    new Date(jobDetail.applicationDeadline) > new Date() &&
    jobDetail.status === statusJob.OnGoing;

  return (
    <Link to={`/job/${jobDetail._id}`} style={{ textDecoration: "none" }}>
      <Box
        padding={3}
        sx={{
          border: "1px solid #fff4ec",
          borderRadius: "1rem",
          backgroundColor: `${isHotOrNot ? "#fff4ec" : "white"}`,
          borderColor: `${isChoose ? "red" : "#fff4ec"}`,
          marginBottom: "1.5rem",
          position: "relative",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            borderColor: isChoose ? "red" : "#ffe0cc",
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography
            variant="body2"
            sx={{
              color: "gray",
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
          >
            {formatDistanceToNow(new Date(jobDetail?.startDate), {
              addSuffix: true,
              locale: enUS,
            })}
          </Typography>
          <Chip
            icon={isActive ? <CheckCircleOutlineIcon /> : <AccessTimeIcon />}
            label={isActive ? "Hiring" : "Ended"}
            size="small"
            sx={{
              backgroundColor: isActive
                ? "rgba(76, 175, 80, 0.1)"
                : "rgba(158, 158, 158, 0.1)",
              color: isActive ? "#4caf50" : "#9e9e9e",
              fontWeight: 500,
              borderRadius: "6px",
              "& .MuiChip-icon": {
                color: "inherit",
              },
            }}
          />
        </Stack>

        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            mb: 2,
            fontSize: "1.25rem",
            color: "#1a1a1a",
            lineHeight: 1.4,
          }}
        >
          {jobDetail.title}
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{
            mb: 2,
            p: 1,
            borderRadius: "8px",
            backgroundColor: "rgba(0, 0, 0, 0.02)",
          }}
        >
          <img
            src={
              isString
                ? "/defaultAvatar.png"
                : company.logo
                ? company.logo
                : "/defaultAvatar.png"
            }
            alt={isString ? company : company.companyName}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "8px",
              objectFit: "cover",
              border: "1px solid #f0f0f0",
            }}
          />
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: "#424242",
            }}
          >
            {isString ? company : company.companyName}
          </Typography>
        </Stack>

        <Typography
          fontWeight="bold"
          sx={{
            color: "#2e7d32",
            marginBlock: "1rem",
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            fontSize: "1.1rem",
          }}
        >
          <MonetizationOnIcon sx={{ fontSize: "1.25rem" }} />
          {jobDetail.minRange} - {jobDetail.maxRange} USD
        </Typography>

        <Divider
          sx={{
            borderBottomStyle: "dotted",
            borderColor: "rgba(0, 0, 0, 0.1)",
            my: 2,
          }}
        />

        <Box marginTop={2}>
          <ListOfInformation place={jobDetail.location} />
        </Box>

        <Box sx={{ mt: 2 }}>
          <ListOfRequirement
            listOfRequire={jobDetail.majorId.map((major) => ({
              value: major.value,
            }))}
          />
        </Box>
      </Box>
    </Link>
  );
};
