import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { pendingType } from "../../../types/pendingType";
import { useState } from "react";
import {
  useConfirmPendingMutation,
  useDeletePendingItemMutation,
  useGetPendingListQuery,
} from "../../../redux/feature/pending/pendingApiSlice";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { RecruitItem } from "../components/RecruitItem";
import { TableBody } from "@mui/material";
import { PendingStatus } from "../../../types/PendingStatus";
import { ConfirmationDialog } from "../components/ConfirmationDialog";
import TableCell from "@mui/material/TableCell";
export const PendingItem = () => {
  const { data: pendingList } = useGetPendingListQuery();

  const [openVerifyDialog, setOpenVerifyDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [confirmPending, { isLoading }] = useConfirmPendingMutation();
  const [id, setId] = useState<string>("");
  const [data, setData] = useState<pendingType | null>(null);
  const [deletePending, { isLoading: isDeleting }] =
    useDeletePendingItemMutation();

  const handleVerify = (data: pendingType) => {
    setOpenVerifyDialog(true);
    setData(data);
  };

  const handleCancel = (id: string) => {
    setOpenCancelDialog(true);
    setId(id);
  };

  const handleConfirmVerify = async (data: pendingType) => {
    try {
      await confirmPending({
        id: data.accountID._id,
        body: {
          accountID: data.accountID,
          email: data.accountID.email,
          companyName: data.companyName,
          phoneNumber: data.phoneNumber,
          address: data.address,
          websiteUrl: data.websiteUrl,
          createdAt: data.createdAt,
        },
      }).unwrap();
      toast.success("Recruiter verified successfully!");
      setOpenVerifyDialog(false);
    } catch (err) {
      toast.error("Failed to verify recruiter. Please try again.");
      console.error("Verification error:", err);
    }
  };

  const handleConfirmCancel = async (id: string) => {
    try {
      await deletePending(id).unwrap();
      toast.success("Recruiter deleted successfully!");
      setOpenCancelDialog(false);
    } catch (err) {
      toast.error("Failed to delete recruiter. Please try again.");
      console.error("Delete error:", err);
    }
  };
  const filterForPending = pendingList?.filter(
    (pending) => pending.status === PendingStatus.PENDING
  );
  const getPending = filterForPending?.map((pending) => {
    return (
      <TableRow key={pending._id} hover>
        <RecruitItem props={pending}>
          <Button
            fullWidth
            sx={{ marginBottom: 2 }}
            variant="outlined"
            color="primary"
            onClick={() => handleVerify(pending)}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Verify"}
          </Button>
          <Button
            fullWidth
            sx={{ border: "1px solid red", color: "red" }}
            variant="outlined"
            onClick={() => handleCancel(pending._id)}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </RecruitItem>
      </TableRow>
    );
  });
  return (
    <>
      <TableBody>
        {filterForPending && filterForPending?.length > 0 ? (
          getPending
        ) : (
          <TableRow>
            <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
              No approved recruiters found
            </TableCell>
          </TableRow>
        )}
      </TableBody>

      <ConfirmationDialog
        open={openVerifyDialog}
        onClose={() => setOpenVerifyDialog(false)}
        onConfirm={() => handleConfirmVerify(data as pendingType)}
        title="Confirm Verification"
        content="Are you sure you want to verify this recruiter? This action cannot be undone."
        confirmText="Verify"
        cancelText="Cancel"
        isLoading={isLoading}
        confirmColor="primary"
      />

      <ConfirmationDialog
        open={openCancelDialog}
        onClose={() => setOpenCancelDialog(false)}
        onConfirm={() => handleConfirmCancel(id)}
        title="Confirm Cancellation"
        content="Are you sure you want to cancel this recruiter's verification? This action cannot be undone."
        confirmText="Yes, Cancel"
        cancelText="No, Keep"
        isLoading={isDeleting}
        confirmColor="error"
        titleColor="error.main"
      />
    </>
  );
};
