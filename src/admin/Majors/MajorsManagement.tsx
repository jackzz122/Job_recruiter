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
  const [formData, setFormData] = useState({ name: "" });

  const { data: majors } = useGetMajorsQuery();
  const [addMajor] = useAddMajorMutation();
  const [updateMajor] = useUpdateMajorMutation();
  const [deleteMajor] = useDeleteMajorMutation();

  const handleOpenDialog = (major?: MajorType) => {
    if (major) {
      setSelectedMajor(major);
      setFormData({ name: major.name });
    } else {
      setSelectedMajor(null);
      setFormData({ name: "" });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMajor(null);
    setFormData({ name: "" });
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
    if (!formData.name.trim()) {
      toast.error("Major name cannot be empty");
      return;
    }

    try {
      if (selectedMajor) {
        await updateMajor({
          _id: selectedMajor._id,
          body: { name: formData.name },
        });
        toast.success("Major updated successfully");
      } else {
        await addMajor({ name: formData.name });
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
    <Box sx={{ height: "100%", p: 3 }}>
      <Stack spacing={3}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5" fontWeight="bold" color={colorButtonOrange}>
            Major Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              bgcolor: colorButtonOrange,
              "&:hover": { bgcolor: colorButtonOrange },
              px: 3,
            }}
          >
            Add New Major
          </Button>
        </Stack>

        <Paper
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "background.default" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Major Name</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {majors?.data?.map((major) => (
                  <TableRow
                    key={major._id}
                    hover
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": { bgcolor: "action.hover" },
                    }}
                  >
                    <TableCell sx={{ fontSize: "1rem" }}>
                      {major.name.charAt(0).toUpperCase() + major.name.slice(1)}
                    </TableCell>
                    <TableCell align="right">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="flex-end"
                      >
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(major)}
                          sx={{
                            color: "primary.main",
                            "&:hover": { bgcolor: "primary.lighter" },
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDeleteDialog(major)}
                          sx={{
                            color: "error.main",
                            "&:hover": { bgcolor: "error.lighter" },
                          }}
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
      </Stack>

      {/* Add/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 1,
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          {selectedMajor ? "Edit Major" : "Add New Major"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Major Name"
            value={formData.name}
            onChange={(e) => setFormData({ name: e.target.value })}
            placeholder="e.g., Software Engineering"
            sx={{ mt: 2 }}
            autoFocus
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              color: "text.secondary",
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              bgcolor: colorButtonOrange,
              "&:hover": { bgcolor: colorButtonOrange },
              px: 3,
            }}
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
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 1,
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the major "{selectedMajor?.name}"?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleCloseDeleteDialog}
            sx={{
              color: "text.secondary",
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            sx={{ px: 3 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
