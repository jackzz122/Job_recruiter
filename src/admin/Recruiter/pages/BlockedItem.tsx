import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { pendingType } from "../../../types/pendingType";
import { useState } from "react";
import {
  //   useUnblockPendingMutation,
  useDeletePendingItemMutation,
  useGetPendingListQuery,
  useUnblockPendingMutation,
} from "../../../redux/feature/pending/pendingApiSlice";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { RecruitItem } from "../components/RecruitItem";
import { TableBody, TableCell } from "@mui/material";
import { PendingStatus } from "../../../types/PendingStatus";
import { ConfirmationDialog } from "../components/ConfirmationDialog";

export const BlockedItem = () => {
  const { data: pendingList } = useGetPendingListQuery();

  const [openUnblockDialog, setOpenUnblockDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [unblockPending, { isLoading }] = useUnblockPendingMutation();
  const [id, setId] = useState<string>("");
  const [data, setData] = useState<pendingType | null>(null);
  const [deletePending, { isLoading: isDeleting }] =
    useDeletePendingItemMutation();

  const handleUnblock = (data: pendingType) => {
    setOpenUnblockDialog(true);
    setData(data);
  };

  const handleDelete = (id: string) => {
    setOpenDeleteDialog(true);
    setId(id);
  };

  const handleConfirmUnblock = async (data: pendingType) => {
    try {
      await unblockPending(data._id).unwrap();
      toast.success("Recruiter unblocked successfully!");
      setOpenUnblockDialog(false);
    } catch (err) {
      toast.error("Failed to unblock recruiter. Please try again.");
      console.error("Unblock error:", err);
    }
  };

  const handleConfirmDelete = async (id: string) => {
    try {
      await deletePending(id).unwrap();
      toast.success("Recruiter deleted successfully!");
      setOpenDeleteDialog(false);
    } catch (err) {
      toast.error("Failed to delete recruiter. Please try again.");
      console.error("Delete error:", err);
    }
  };

  const filterForBlocked = pendingList?.data?.filter(
    (recruiter) => recruiter.status === PendingStatus.BLOCKED
  );
  const getBlocked = filterForBlocked?.map((blocked) => {
    return (
      <TableRow key={blocked._id} hover>
        <RecruitItem props={blocked}>
          <Button
            fullWidth
            sx={{ marginBottom: 2 }}
            variant="outlined"
            color="success"
            onClick={() => handleUnblock(blocked)}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Unblock"}
          </Button>
          <Button
            fullWidth
            sx={{ border: "1px solid red", color: "red" }}
            variant="outlined"
            onClick={() => handleDelete(blocked._id)}
            disabled={isDeleting}
          >
            Delete
          </Button>
        </RecruitItem>
      </TableRow>
    );
  });

  return (
    <>
      <TableBody>
        {filterForBlocked && filterForBlocked?.length > 0 ? (
          getBlocked
        ) : (
          <TableRow>
            <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
              No blocked recruiters found
            </TableCell>
          </TableRow>
        )}
      </TableBody>

      <ConfirmationDialog
        open={openUnblockDialog}
        onClose={() => setOpenUnblockDialog(false)}
        onConfirm={() => handleConfirmUnblock(data as pendingType)}
        title="Confirm Unblock"
        content="Are you sure you want to unblock this recruiter? They will regain access to the platform."
        confirmText="Unblock"
        cancelText="Cancel"
        isLoading={isLoading}
        confirmColor="success"
      />

      <ConfirmationDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={() => handleConfirmDelete(id)}
        title="Confirm Deletion"
        content="Are you sure you want to delete this recruiter? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
        confirmColor="error"
        titleColor="error.main"
      />
    </>
  );
};
