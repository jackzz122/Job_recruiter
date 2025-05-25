import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { useState } from "react";
import {
  useDeletePendingItemMutation,
  useGetListRecruiterCompanyAccountQuery,
  useUnblockRecruiterCompanyAccountMutation,
} from "../../../redux/feature/pending/pendingApiSlice";
import { toast } from "react-toastify";
import { RecruitItem } from "../components/RecruitItem";
import { TableBody, TableCell, Box, Typography } from "@mui/material";
import { ConfirmationDialog } from "../components/ConfirmationDialog";
import { RecruiterAccount } from "./ApprovedItem";
import BlockIcon from "@mui/icons-material/Block";

export const BlockedItem = () => {
  const { data: recruiterAccounts } = useGetListRecruiterCompanyAccountQuery();
  const [openUnblockDialog, setOpenUnblockDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [unblockRecruiter, { isLoading: isUnblocking }] =
    useUnblockRecruiterCompanyAccountMutation();
  const [id, setId] = useState<string>("");
  const [data, setData] = useState<RecruiterAccount | null>(null);
  const [deletePending, { isLoading: isDeleting }] =
    useDeletePendingItemMutation();

  const handleUnblock = (data: RecruiterAccount) => {
    setOpenUnblockDialog(true);
    setData(data);
  };

  const handleDelete = (id: string) => {
    setOpenDeleteDialog(true);
    setId(id);
  };

  const handleConfirmUnblock = async (data: RecruiterAccount) => {
    try {
      const response = await unblockRecruiter(data._id).unwrap();
      if (response.success) {
        toast.success("Recruiter unblocked successfully!");
        setOpenUnblockDialog(false);
      }
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

  const getBlockedRecruiters = recruiterAccounts?.data
    ?.filter((recruiter: RecruiterAccount) => recruiter.status === "blocked")
    .map((recruiter: RecruiterAccount) => (
      <TableRow key={recruiter._id} hover>
        <RecruitItem props={recruiter}>
          <Button
            fullWidth
            sx={{ marginBottom: 2 }}
            variant="outlined"
            color="success"
            onClick={() => handleUnblock(recruiter)}
            disabled={isUnblocking}
          >
            Unblock
          </Button>
          <Button
            fullWidth
            sx={{ border: "1px solid red", color: "red" }}
            variant="outlined"
            onClick={() => handleDelete(recruiter._id)}
            disabled={isDeleting}
          >
            Delete
          </Button>
        </RecruitItem>
      </TableRow>
    ));

  const hasBlockedRecruiters = recruiterAccounts?.data?.some(
    (recruiter: RecruiterAccount) => recruiter.status === "blocked"
  );

  return (
    <>
      <TableBody>
        {hasBlockedRecruiters ? (
          getBlockedRecruiters
        ) : (
          <TableRow>
            <TableCell colSpan={7}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  py: 8,
                  gap: 2,
                }}
              >
                <BlockIcon
                  sx={{
                    fontSize: 64,
                    color: "text.secondary",
                    opacity: 0.5,
                  }}
                />
                <Typography variant="h6" color="text.secondary">
                  No Blocked Recruiters
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  There are currently no blocked recruiters in the system.
                </Typography>
              </Box>
            </TableCell>
          </TableRow>
        )}
      </TableBody>

      <ConfirmationDialog
        open={openUnblockDialog}
        onClose={() => setOpenUnblockDialog(false)}
        onConfirm={() => handleConfirmUnblock(data as RecruiterAccount)}
        title="Confirm Unblock"
        content="Are you sure you want to unblock this recruiter? They will regain access to the platform."
        confirmText="Unblock"
        cancelText="Cancel"
        isLoading={isUnblocking}
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
