import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { pendingType } from "../../../types/pendingType";
import { useState } from "react";
import {
  useBlockPendingMutation,
  useDeletePendingItemMutation,
  useGetPendingListQuery,
} from "../../../redux/feature/pending/pendingApiSlice";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { RecruitItem } from "../components/RecruitItem";
import { TableBody, TableCell } from "@mui/material";
import { PendingStatus } from "../../../types/PendingStatus";
import { ConfirmationDialog } from "../components/ConfirmationDialog";

export const ApprovedItem = () => {
  const { data: pendingList } = useGetPendingListQuery();

  const [openBlockDialog, setOpenBlockDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [blockPending, { isLoading }] = useBlockPendingMutation();
  const [id, setId] = useState<string>("");
  const [data, setData] = useState<pendingType | null>(null);
  const [deletePending, { isLoading: isDeleting }] =
    useDeletePendingItemMutation();

  const handleBlock = (data: pendingType) => {
    setOpenBlockDialog(true);
    setData(data);
  };

  const handleDelete = (id: string) => {
    setOpenDeleteDialog(true);
    setId(id);
  };

  const handleConfirmBlock = async (data: pendingType) => {
    try {
      await blockPending(data._id).unwrap();
      toast.success("Recruiter blocked successfully!");
      setOpenBlockDialog(false);
    } catch (err) {
      toast.error("Failed to block recruiter. Please try again.");
      console.error("Block error:", err);
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
  const filterForApproved = pendingList?.data?.filter(
    (approved) => approved.status === PendingStatus.APPROVED
  );
  const getApproved = filterForApproved?.map((approved) => {
    return (
      <TableRow key={approved._id} hover>
        <RecruitItem props={approved}>
          <Button
            fullWidth
            sx={{ marginBottom: 2 }}
            variant="outlined"
            color="warning"
            onClick={() => handleBlock(approved)}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Block"}
          </Button>
          <Button
            fullWidth
            sx={{ border: "1px solid red", color: "red" }}
            variant="outlined"
            onClick={() => handleDelete(approved._id)}
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
        {filterForApproved && filterForApproved?.length > 0 ? (
          getApproved
        ) : (
          <TableRow>
            <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
              No approved recruiters found
            </TableCell>
          </TableRow>
        )}
      </TableBody>

      <ConfirmationDialog
        open={openBlockDialog}
        onClose={() => setOpenBlockDialog(false)}
        onConfirm={() => handleConfirmBlock(data as pendingType)}
        title="Confirm Block"
        content="Are you sure you want to block this recruiter? They will no longer be able to access the platform."
        confirmText="Block"
        cancelText="Cancel"
        isLoading={isLoading}
        confirmColor="warning"
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
