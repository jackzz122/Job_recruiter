import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { ListOfRequirement } from "../../component/lists/ListOfRequirement";
import { ListOfInformation } from "../../component/lists/ListOfInformation";
import { DialogApplication } from "../components/DialogApplication";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetJobByIdQuery } from "../../../redux/feature/job/jobApiSlice";
import { vi } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";
export default function DetailsJobHeader() {
  const { id } = useParams();
  const [openApplication, setOpenApplication] = useState(false);
  const { data: job } = useGetJobByIdQuery(id as string, {
    skip: !id,
  });
  const company = job?.data.companyId;
  const isString = typeof company === "string";
  return (
    <Box
      sx={{
        flexGrow: 2,
        backgroundColor: "white",
        borderRadius: "0.3rem",
        paddingBlock: "0.75rem",
        paddingInline: "1.25rem",
        marginBottom: "0.75rem",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        {job?.data?.title}
      </Typography>
      <Typography variant="body1" sx={{ marginBlock: "1rem" }}>
        {isString ? company : company?.companyName}
      </Typography>
      <Typography
        sx={{ color: "green", marginBlock: "0.5rem" }}
        fontWeight="bold"
      >
        {" "}
        <MonetizationOnIcon /> {job?.data.minRange}$ - {job?.data.maxRange}$
      </Typography>
      <Stack direction="row" spacing={1}>
        <Button
          sx={{
            flexGrow: 1,
            backgroundColor: "#e50000",
            color: "white",
            padding: "1rem",
          }}
          onClick={() => setOpenApplication(true)}
          variant="contained"
        >
          Ứng tuyển
        </Button>
        <DialogApplication
          handleClose={() => setOpenApplication(false)}
          title="Ứng tuyển cho vị trí"
          open={openApplication}
        />
        <Button sx={{ flexGrow: 0, border: "1px solid red" }}>
          <FavoriteIcon sx={{ color: "#e50000" }} fontSize="large" />
        </Button>
      </Stack>
      <br />
      <ImageList
        sx={{ width: "100%", height: "12.5rem" }}
        cols={3}
        rowHeight={150}
      >
        <ImageListItem>
          <img src="../../../public/bss_avatar.png" alt="" />
        </ImageListItem>
        <ImageListItem>
          <img src="../../../public/bss_avatar.png" alt="" />
        </ImageListItem>
        <ImageListItem>
          <img src="../../../public/bss_avatar.png" alt="" />
        </ImageListItem>
      </ImageList>
      <Box>
        <ListOfInformation
          place={job?.data?.location}
          workType="Tại công ty"
          time={
            job?.data?.createdAt
              ? formatDistanceToNow(new Date(job.data.createdAt), {
                  addSuffix: true,
                  locale: vi,
                })
              : "Đang tải..."
          }
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Typography variant="body2">Kỹ năng</Typography>
          <ListOfRequirement
            listOfRequire={job?.data?.description.keySkills.bulletPoints}
          />
        </Box>
      </Box>
    </Box>
  );
}
