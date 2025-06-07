import { Link, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { useGetJobByIdQuery } from "../../../redux/feature/job/jobApiSlice";
import { CompanyType } from "../../../types/CompanyType";

export default function DetailsInforCompany() {
  const params = useParams();
  const { data: job } = useGetJobByIdQuery(params.id as string, {
    skip: !params.id,
  });
  const companyField = job?.data?.companyId as CompanyType;
  const companyInfo = [
    {
      label: "Company Size",
      value: companyField?.description[0]?.companySize || ".....",
    },
    { label: "Country", value: companyField?.country || "....." },
    {
      label: "Working day",
      value: `${companyField?.description[0]?.workingDays || "....."} days`,
    },
    {
      label: "Overtime",
      value: companyField?.overTime ? "Yes" : "No",
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: 1,
        border: 1,
        borderColor: "divider",
        overflow: "hidden",
      }}
    >
      {/* Company Header */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: "divider" }}>
        <Stack direction="row" spacing={2}>
          <Box
            component="img"
            src={companyField?.logo || "/companyNotFound.png"}
            alt={companyField?.companyName}
            sx={{
              width: 96,
              height: 96,
              objectFit: "cover",
              borderRadius: 1,
              border: 1,
              borderColor: "divider",
            }}
          />
          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {companyField?.companyName}
            </Typography>
            <Link
              to={`/company/${companyField?._id}`}
              className="text-red-500 font-bold hover:underline"
            >
              View Company Details
            </Link>
          </Box>
        </Stack>
      </Box>

      {/* Company Info List */}
      <Box sx={{ p: 3 }}>
        <Stack spacing={2}>
          {companyInfo.map((info, index) => (
            <Box key={index}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ py: 1 }}
              >
                <Typography color="text.secondary">{info.label}</Typography>
                <Typography fontWeight="medium">{info.value}</Typography>
              </Stack>
              {index < companyInfo.length - 1 && <Divider />}
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
