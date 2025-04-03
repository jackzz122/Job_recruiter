import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import { DialogUploadCV } from "../components/Dialog/DialogUploadCV";
import { DialogCreateCV } from "../components/Dialog/DialogCreateCV";
import { DialogDelete } from "../../../shared/components/DialogDelete";
export const CVPages = () => {
  const [openUpload, setOpenUpload] = useState(false);
  const [openCreateCV, setOpenCreateCV] = useState(false);
  const [openDeleteCV, setDeleteCV] = useState(false);
  const handleOpen = () => {
    setOpenUpload(true);
  };
  const handleCloseDialog = () => {
    setOpenUpload(false);
  };
  const handleOpenCreateCV = () => {
    setOpenCreateCV(true);
  };
  const handleCloseCreateCV = () => {
    setOpenCreateCV(false);
  };
  const handleOpenDelete = () => {
    setDeleteCV(true);
  };
  const handleCloseDelete = () => {
    setDeleteCV(false);
  };
  return (
    <Container maxWidth="xl">
      <Stack direction="row" sx={{ marginTop: "5rem", marginBottom: "1rem" }}>
        <Typography
          flexGrow={1}
          variant="h5"
          sx={{ color: "red" }}
          fontWeight="bold"
        >
          CV Managements
        </Typography>
        <Stack flexGrow={0} direction="row" spacing={2}>
          <Button
            sx={{
              border: "1px solid red",
              color: "white",
              display: "flex",
              gap: "0.25rem",
              alignItems: "center",
              backgroundColor: "red",
            }}
            onClick={handleOpen}
          >
            Upload CV <DriveFolderUploadIcon />
          </Button>
          <DialogUploadCV handleClose={handleCloseDialog} open={openUpload} />
          <Button
            sx={{
              border: "1px solid red",
              color: "red",
              display: "flex",
              gap: "0.25rem",
              alignItems: "center",
            }}
            onClick={handleOpenCreateCV}
          >
            Create CV <AddCircleOutlineIcon />
          </Button>
          <DialogCreateCV
            handleClose={handleCloseCreateCV}
            open={openCreateCV}
          />
        </Stack>
      </Stack>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#e5e5e5" }}>
            <TableCell>CV's Name</TableCell>
            <TableCell>Complete status</TableCell>
            <TableCell>Last edited at</TableCell>
            <TableCell>Action</TableCell>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Nguyễn Văn Đình</TableCell>
              <TableCell>Not yet applied for any position.</TableCell>
              <TableCell>27-02-2025 14:33:32</TableCell>
              <TableCell>
                <Stack direction="row" spacing={2}>
                  <Button
                    sx={{ border: "1px solid red", color: "red" }}
                    variant="outlined"
                  >
                    <RemoveRedEyeIcon />
                  </Button>
                  <Button
                    sx={{ border: "1px solid red", color: "red" }}
                    variant="outlined"
                  >
                    <CreateIcon />
                  </Button>
                  <Button
                    sx={{ border: "1px solid red", color: "red" }}
                    variant="outlined"
                  >
                    <DownloadIcon />
                  </Button>
                  <Button
                    sx={{ border: "1px solid red", color: "red" }}
                    variant="outlined"
                    onClick={handleOpenDelete}
                  >
                    <DeleteOutlineIcon />
                  </Button>
                  <DialogDelete
                    handleClose={handleCloseDelete}
                    open={openDeleteCV}
                  />
                </Stack>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
