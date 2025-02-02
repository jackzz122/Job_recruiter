import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";

export default function DetailsJobBody() {
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
            As a Support Site Reliability Engineer (SRE), you’ll work closely
            with Money Forward Japan’s Product SRE team to increase their
            productivity. The ideal candidate will address operational tasks by
            both directly supporting Product SRE teams as well as designing
            standardized solutions to streamline operational work. The role
            requires technical expertise and a passion for improving operational
            efficiency.
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
        </ListItem>
      </List>
      {/* <Box>
        <Typography variant="h6">3 lý do để gia nhập công ty</Typography>
      </Box>
      <Box>
        <Typography variant="h6">Mô Tả công việc</Typography>
        <Typography variant="body1">
          As a Support Site Reliability Engineer (SRE), you’ll work closely with
          Money Forward Japan’s Product SRE team to increase their productivity.
          The ideal candidate will address operational tasks by both directly
          supporting Product SRE teams as well as designing standardized
          solutions to streamline operational work. The role requires technical
          expertise and a passion for improving operational efficiency.
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6">Yêu cầu công việc</Typography>
      </Box>
      <Box>
        <Typography variant="h6">Tại sao bạn thích làm ở đây</Typography>
      </Box> */}
    </Box>
  );
}
