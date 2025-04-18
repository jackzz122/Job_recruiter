import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import { useGetJobByIdQuery } from "../../../redux/feature/job/jobApiSlice";
import { ListOfHighlightComp } from "../../component/lists/ListOfHighlightComp";

export default function DetailsJobBody() {
  const params = useParams();
  const { data: job } = useGetJobByIdQuery(params.id as string, {
    skip: !params.id,
  });
  console.log(job);
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
      <List>
        <ListItem
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <Typography variant="h6">3 lý do để gia nhập công ty</Typography>
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            alignItems: "start",
          }}
        >
          <Typography variant="h6">Mô Tả công việc</Typography>
          <Typography variant="body1">
            {job?.data?.description.summary}
          </Typography>
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            alignItems: "start",
          }}
        >
          <Typography variant="h6">Yêu cầu công việc</Typography>
          <Typography variant="body1">
            {job?.data?.description.keySkills.mainText}
          </Typography>
          <ListOfHighlightComp
            listHighlights={job?.data?.description.keySkills.bulletPoints || []}
          />
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            alignItems: "start",
          }}
        >
          {" "}
          <Typography variant="h6">Tại sao bạn thích làm ở đây</Typography>
          <Typography variant="body1">
            {job?.data?.description.whyYouLoveIt.mainText}
          </Typography>
          <ListOfHighlightComp
            listHighlights={
              job?.data?.description.whyYouLoveIt.bulletPoints || []
            }
          />
        </ListItem>
      </List>
    </Box>
  );
}
