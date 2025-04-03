import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
export const ListOfInformation = ({
  place,
  workType,
  time,
}: {
  place?: string;
  workType?: string;
  time?: string;
}) => {
  return (
    <>
      <Typography sx={{ marginBlock: "1rem" }} variant="body2">
        {place && <LocationOnOutlinedIcon sx={{ marginRight: "0.5rem" }} />}
        {place}
      </Typography>
      <Typography sx={{ marginBlock: "1rem" }} variant="body2">
        {workType && (
          <EmojiEmotionsOutlinedIcon sx={{ marginRight: "0.5rem" }} />
        )}
        {workType}
      </Typography>
      <Typography sx={{ marginBlock: "1rem" }} variant="body2">
        {time && <AccessTimeIcon sx={{ marginRight: "0.5rem" }} />}
        {time}
      </Typography>
    </>
  );
};
