import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { UserType } from "../../types/UserType";

export const CandidateItem = ({ candidate }: { candidate: UserType }) => {
  return (
    <TableRow key={candidate._id} hover>
      <TableCell>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src={candidate.avatarImg ? candidate.avatarImg : ""} />
          <Box>
            <Typography variant="subtitle2">{candidate.fullname}</Typography>
            <Typography variant="body2" color="text.secondary">
              ID: {candidate._id}
            </Typography>
          </Box>
        </Stack>
      </TableCell>
      <TableCell>
        <Typography fontWeight="bold" fontStyle="italic">
          {candidate.role}
        </Typography>
      </TableCell>
      <TableCell>
        {candidate.phone ? candidate.phone : "Not provided phone"}
      </TableCell>
      <TableCell>
        <Typography variant="body2">{candidate.email}</Typography>
      </TableCell>
      <TableCell>
        {new Date(candidate.createdAt).toLocaleTimeString()} -{" "}
        {new Date(candidate.createdAt).toLocaleDateString()}
      </TableCell>

      <TableCell align="right">
        <Button variant="contained" color="error">
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};
