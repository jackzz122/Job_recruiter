import Divider from "@mui/material/Divider";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { handleError } from "../../../../helper/HandleError/handleError";
import { useUpdateUserInfoMutation } from "../../../../redux/feature/user/userApiSlice";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
type ItemListProps = {
  type: string;
  id: string;
  children: React.ReactNode;
  onEdit?: (id: string) => void;
};

export const ItemList = ({ id, children, onEdit, type }: ItemListProps) => {
  const handleEdit = () => {
    if (onEdit) {
      onEdit(id);
    } else {
      toast.error(`Edit item with id: ${id}`);
    }
  };
  const [updateUser, { isLoading }] = useUpdateUserInfoMutation();
  const handleDelete = async <T extends string>(field: T, id: string) => {
    try {
      const response = await updateUser({
        [field]: {
          _id: id,
        } as { _id: string } & Partial<Omit<T, "_id">>,
      });
      if (response.data?.success) {
        toast.success(response.data?.message || "Delete success");
      }
    } catch (err) {
      const error = handleError(err);
      toast.error(error?.message || "Delete failed");
    }
  };

  return (
    <>
      <>
        <Stack
          direction="row"
          spacing={2}
          position="relative"
          marginBlock={1}
          justifyContent="space-between"
        >
          <Box maxWidth="750px">{children}</Box>
          <Stack
            position="absolute"
            right={0}
            top="50%"
            sx={{ transform: "translateY(-50%)" }}
            direction="row"
            spacing={1}
          >
            <IconButton onClick={handleEdit} aria-label="Edit item">
              <DriveFileRenameOutlineOutlinedIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDelete(type, id)}
              loading={isLoading}
              aria-label="Delete item"
            >
              <DeleteRoundedIcon color="error" />
            </IconButton>
          </Stack>
        </Stack>
        <Divider />
      </>
    </>
  );
};
