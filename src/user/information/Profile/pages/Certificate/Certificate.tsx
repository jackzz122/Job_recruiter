import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import Box from "@mui/material/Box";
import { certificateType } from "../../../../../types/UserType";
import { DialogCerti } from "./components/DialogCerti";
import { CertificateItem } from "./components/CertificateItem";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
export const Certificate = ({
  certificate,
}: {
  certificate: certificateType[];
}) => {
  const [openCertificates, setOpenCertificates] = useState(false);
  return (
    <>
      <Paper sx={{ p: 3, position: "relative" }}>
        <IconButton
          sx={{ position: "absolute", right: 8, top: 8 }}
          onClick={() => setOpenCertificates(true)}
        >
          {certificate.length === 0 ? (
            <EditIcon />
          ) : (
            <AddCircleOutlineRoundedIcon />
          )}
        </IconButton>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <EmojiEventsIcon color="primary" />
          <Typography variant="h6" fontWeight="bold">
            Certificates
          </Typography>
        </Box>
        <Stack spacing={2}>
          {certificate.length === 0 ? (
            <p>Not found list</p>
          ) : (
            certificate.map((certi) => {
              return <CertificateItem key={certi._id} {...certi} />;
            })
          )}
        </Stack>
      </Paper>
      <DialogCerti
        openCertificates={openCertificates}
        setOpenCertificates={setOpenCertificates}
      />
    </>
  );
};
