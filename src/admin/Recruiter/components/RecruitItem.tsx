import TableCell from "@mui/material/TableCell";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import BusinessIcon from "@mui/icons-material/Business";
type RecruitItemProps = {
  accountID: {
    _id: string;
    fullname: string;
    email: string;
    avatarIMG?: string;
  };
  companyName: string;
  phoneNumber: string;
  createdAt: Date | string;
  _id: string;
  status?: string;
  address?: string;
  websiteUrl?: string;
};
export const RecruitItem = ({
  props,
  children,
}: {
  props: RecruitItemProps;
  children: React.ReactNode;
}) => {
  return (
    <>
      <TableCell>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src={props.accountID.avatarIMG || "/default-avatar.png"} />
          <Box>
            <Typography variant="subtitle2">
              {props.accountID.fullname}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.accountID._id}
            </Typography>
          </Box>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack direction="row" spacing={1} alignItems="center">
          <BusinessIcon color="action" fontSize="small" />
          <Typography>{props.companyName}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Box>
          <Typography variant="body2" color="text.secondary">
            {props.phoneNumber}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Box>
          <Typography variant="body2">{props.accountID.email}</Typography>
        </Box>
      </TableCell>
      <TableCell>{new Date(props.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>
        <Chip
          label={props.status}
          color={props.status === "approve" ? "success" : "error"}
          size="small"
        />
      </TableCell>
      <TableCell>{children}</TableCell>
    </>
  );
};
