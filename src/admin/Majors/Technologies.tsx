import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CodeIcon from "@mui/icons-material/Code";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { colorButtonOrange } from "../../themeContext";
import { TechnologiesItem } from "./TechnologiesItem";

export const Technologies = () => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <Box sx={{ p: 3, height: "100%" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <CodeIcon color="primary" />
          <Typography variant="h6">Technologies</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            placeholder="Search technologies..."
            size="small"
            sx={{ width: 300 }}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: colorButtonOrange }}
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Add Technology
          </Button>
        </Stack>
      </Stack>

      <TableContainer component={Paper} sx={{ flex: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Technology Name</TableCell>
              <TableCell>Jobs Using</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TechnologiesItem />
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Technology</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Technology Name"
              placeholder="e.g., React"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
