import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { Link, useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { useGetJobByIdQuery } from "../../../redux/feature/job/jobApiSlice";
import { CompanyType } from "../../../types/CompanyType";

export default function DetailsInforCompany() {
  const params = useParams();
  const { data: job } = useGetJobByIdQuery(params.id as string, {
    skip: !params.id,
  });
  console.log(job);
  const companyField = job?.data?.companyId as CompanyType;
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
          src={companyField?.logo}
          alt="company_name"
          className="w-1/3 border border-gray-400"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {companyField?.companyName}
          </Typography>
          <Link
            to={`/company/${companyField?._id}`}
            className="hover:underline text-blue-500"
          >
            Xem Công ty
          </Link>
        </Box>
      </Stack>
      <br />
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
