import Divider from "@mui/material/Divider";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
export const ItemList = ({ children }: { children: React.ReactNode }) => {
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
          {children}
          <Stack
            position="absolute"
            right={0}
            top="50%"
            sx={{ transform: "translateY(-50%)" }}
            direction="row"
            spacing={1}
          >
            <IconButton>
              <DriveFileRenameOutlineOutlinedIcon />
            </IconButton>
            <IconButton>
              <DeleteRoundedIcon color="error" />
            </IconButton>
          </Stack>
        </Stack>
        <Divider />
      </>
    </>
  );
};
