import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useGetJobByIdQuery } from "../../../redux/feature/job/jobApiSlice";
import { ListOfHighlightComp } from "../../component/lists/ListOfHighlightComp";

export default function DetailsJobBody() {
  const params = useParams();
  const { data: job } = useGetJobByIdQuery(params.id as string, {
    skip: !params.id,
  });

  return (
    <Box sx={{ p: 3 }}>
      {/* Reasons to Join */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Three reasons to join the company
        </Typography>
        <Divider sx={{ my: 2 }} />
      </Box>

      {/* Job Description */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Job Description
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {job?.data?.description.summary}
        </Typography>
        <Divider sx={{ my: 2 }} />
      </Box>

      {/* Job Requirements */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Job Requirements
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {job?.data?.description.keySkills.mainText}
        </Typography>
        <ListOfHighlightComp
          listHighlights={job?.data?.description.keySkills.bulletPoints || []}
        />
        <Divider sx={{ my: 2 }} />
      </Box>

      {/* Why You'll Love It */}
      <Box>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Why You'll Love It
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {job?.data?.description.whyYouLoveIt.mainText}
        </Typography>
        <ListOfHighlightComp
          listHighlights={
            job?.data?.description.whyYouLoveIt.bulletPoints || []
          }
        />
      </Box>
    </Box>
  );
}
