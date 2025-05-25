import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { useState } from "react";
import {
  useDeletePendingItemMutation,
  useGetListRecruiterCompanyAccountQuery,
  useBlockRecruiterCompanyAccountMutation,
} from "../../../redux/feature/pending/pendingApiSlice";
import { toast } from "react-toastify";
import { RecruitItem } from "../components/RecruitItem";
import { TableBody, TableCell, Box, Typography } from "@mui/material";
import { ConfirmationDialog } from "../components/ConfirmationDialog";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export interface RecruiterAccount {
  _id: string;
  avatarIMG: string;
  name: string;
  companyName: string;
  email: string;
  status: string;
  phone: string;
  createdAt: string;
}

export const ApprovedItem = () => {
  const { data: recruiterAccounts } = useGetListRecruiterCompanyAccountQuery();
  const [openBlockDialog, setOpenBlockDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [blockRecruiter, { isLoading: isBlocking }] =
    useBlockRecruiterCompanyAccountMutation();
  const [id, setId] = useState<string>("");
  const [data, setData] = useState<RecruiterAccount | null>(null);
  const [deletePending, { isLoading: isDeleting }] =
    useDeletePendingItemMutation();

  const handleBlock = (data: RecruiterAccount) => {
    setOpenBlockDialog(true);
    setData(data);
  };

  const handleDelete = (id: string) => {
    setOpenDeleteDialog(true);
    setId(id);
  };

  const handleConfirmBlock = async (data: RecruiterAccount) => {
    try {
      const response = await blockRecruiter(data._id).unwrap();
      if (response.success) {
        toast.success("Recruiter blocked successfully!");
        setOpenBlockDialog(false);
      }
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

  const getApprovedRecruiters = recruiterAccounts?.data
    ?.filter((recruiter: RecruiterAccount) => recruiter.status === "approve")
    .map((recruiter: RecruiterAccount) => (
      <TableRow key={recruiter._id} hover>
        <RecruitItem props={recruiter}>
          <Button
            fullWidth
            sx={{ marginBottom: 2 }}
            variant="outlined"
            color="warning"
            onClick={() => handleBlock(recruiter)}
            disabled={isBlocking}
          >
            Block
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

  const hasApprovedRecruiters = recruiterAccounts?.data?.some(
    (recruiter: RecruiterAccount) => recruiter.status === "approve"
  );

  return (
    <>
      <TableBody>
        {hasApprovedRecruiters ? (
          getApprovedRecruiters
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
                <CheckCircleIcon
                  sx={{
                    fontSize: 64,
                    color: "text.secondary",
                    opacity: 0.5,
                  }}
                />
                <Typography variant="h6" color="text.secondary">
                  No Approved Recruiters
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  There are currently no approved recruiters in the system.
                </Typography>
              </Box>
            </TableCell>
          </TableRow>
        )}
      </TableBody>

      <ConfirmationDialog
        open={openBlockDialog}
        onClose={() => setOpenBlockDialog(false)}
        onConfirm={() => handleConfirmBlock(data as RecruiterAccount)}
        title="Confirm Block"
        content="Are you sure you want to block this recruiter? They will no longer be able to access the platform."
        confirmText="Block"
        cancelText="Cancel"
        isLoading={isBlocking}
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
