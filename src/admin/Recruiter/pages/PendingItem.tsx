import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { useState } from "react";
import {
  useConfirmPendingMutation,
  useDeletePendingItemMutation,
  useGetPendingListQuery,
} from "../../../redux/feature/pending/pendingApiSlice";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { RecruitItem } from "../components/RecruitItem";
import { TableBody, TableCell, Box, Typography } from "@mui/material";
import { ConfirmationDialog } from "../components/ConfirmationDialog";
import PendingIcon from "@mui/icons-material/Pending";
import { pendingType } from "../../../types/pendingType";
import { RecruiterAccount } from "./ApprovedItem";

const transformPendingToRecruiter = (
  pending: pendingType
): RecruiterAccount => {
  return {
    _id: pending._id,
    avatarIMG: pending.accountID.avatarIMG || "",
    name: pending.accountID.fullname,
    companyName: pending.companyName,
    email: pending.accountID.email,
    status: pending.status,
    phone: pending.phoneNumber,
    createdAt:
      pending.createdAt instanceof Date
        ? pending.createdAt.toISOString()
        : typeof pending.createdAt === "string"
        ? pending.createdAt
        : new Date(pending.createdAt).toISOString(),
  };
};

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
          createdAt: new Date(data.createdAt),
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

  const hasPendingRecruiters = pendingList?.data?.some(
    (recruiter) => recruiter.status === "pending"
  );

  const getPendingRecruiters = pendingList?.data
    ?.filter((recruiter) => recruiter.status === "pending")
    .map((recruiter) => (
      <TableRow key={recruiter._id} hover>
        <RecruitItem props={transformPendingToRecruiter(recruiter)}>
          <Button
            fullWidth
            sx={{ marginBottom: 2 }}
            variant="outlined"
            color="primary"
            onClick={() => handleVerify(recruiter)}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Verify"}
          </Button>
          <Button
            fullWidth
            sx={{ border: "1px solid red", color: "red" }}
            variant="outlined"
            onClick={() => handleCancel(recruiter._id)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
        </RecruitItem>
      </TableRow>
    ));

  return (
    <>
      <TableBody>
        {hasPendingRecruiters ? (
          getPendingRecruiters
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
                <PendingIcon
                  sx={{
                    fontSize: 64,
                    color: "text.secondary",
                    opacity: 0.5,
                  }}
                />
                <Typography variant="h6" color="text.secondary">
                  No Pending Recruiters
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  There are currently no pending recruiters waiting for
                  verification.
                </Typography>
              </Box>
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
