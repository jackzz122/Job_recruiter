import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { colorButtonOrange } from "../../themeContext";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { MajorType } from "../../types/MajorType";
import {
  useGetMajorsQuery,
  useAddMajorMutation,
  useUpdateMajorMutation,
  useDeleteMajorMutation,
} from "../../redux/feature/major/majorApiSlice";
import { handleError } from "../../helper/HandleError/handleError";
import { toast } from "react-toastify";

export const MajorsManagement = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState<MajorType | null>(null);
  const [formData, setFormData] = useState({ name: "", level: "" });

  const { data: majors } = useGetMajorsQuery();
  const [addMajor] = useAddMajorMutation();
  const [updateMajor] = useUpdateMajorMutation();
  const [deleteMajor] = useDeleteMajorMutation();

  const handleOpenDialog = (major?: MajorType) => {
    if (major) {
      setSelectedMajor(major);
      setFormData({ name: major.name, level: major.level });
    } else {
      setSelectedMajor(null);
      setFormData({ name: "", level: "" });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMajor(null);
    setFormData({ name: "", level: "" });
  };

  const handleOpenDeleteDialog = (major: MajorType) => {
    setSelectedMajor(major);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedMajor(null);
  };

  const handleSubmit = async () => {
    try {
      if (selectedMajor) {
        await updateMajor({
          _id: selectedMajor._id,
          body: { ...selectedMajor, ...formData },
        });
        toast.success("Major updated successfully");
      } else {
        await addMajor(formData);
        toast.success("Major added successfully");
      }
      handleCloseDialog();
    } catch (error) {
      const err = handleError(error);
      toast.error(err?.message);
    }
  };

  const handleDelete = async () => {
    if (!selectedMajor) return;

    try {
      await deleteMajor(selectedMajor._id);
      toast.success("Major deleted successfully");
      handleCloseDeleteDialog();
    } catch (error) {
      const err = handleError(error);
      toast.error(err?.message);
    }
  };

  return (
    <Box sx={{ height: "100%" }}>
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h5"
          sx={{ color: colorButtonOrange }}
          fontWeight="bold"
          gutterBottom
        >
          Major Management
        </Typography>

        <Paper sx={{ p: 2, mt: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6">Majors</Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: colorButtonOrange }}
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
            >
              Add Major
            </Button>
          </Stack>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Major Name</TableCell>
                  <TableCell>Level</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {majors?.map((major) => (
                  <TableRow key={major._id} hover>
                    <TableCell>
                      {major.name.charAt(0).toUpperCase() + major.name.slice(1)}
                    </TableCell>
                    <TableCell>{major.level}</TableCell>
                    <TableCell align="right">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="flex-end"
                      >
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleOpenDialog(major)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleOpenDeleteDialog(major)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Major Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {selectedMajor ? "Edit Major" : "Add New Major"}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Major Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Software Engineering"
              />
              <TextField
                fullWidth
                label="Level"
                value={formData.level}
                onChange={(e) =>
                  setFormData({ ...formData, level: e.target.value })
                }
                placeholder="e.g., Bachelor's Degree"
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ backgroundColor: colorButtonOrange }}
            >
              {selectedMajor ? "Update" : "Save"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete the major "{selectedMajor?.name}"?
              This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};
