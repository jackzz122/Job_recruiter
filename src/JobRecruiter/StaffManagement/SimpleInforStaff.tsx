import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { UserType } from "../../types/UserType";
import { useDeleteRecruiterMutation } from "../../redux/feature/user/userApiSlice";

export const SimpleInforStaff = ({ staff }: { staff: UserType[] }) => {
  const [deleteStaff, { isLoading }] = useDeleteRecruiterMutation();
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {staff?.map((item) => {
            return (
              <TableRow key={item._id}>
                <TableCell>{item.fullname}</TableCell>
                <TableCell>{item.email}</TableCell>

                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button variant="outlined">
                      <RemoveRedEyeOutlinedIcon />
                    </Button>
                    <Button
                      onClick={() => deleteStaff(item._id)}
                      variant="outlined"
                      loading={isLoading}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
