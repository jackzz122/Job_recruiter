import { colorButtonOrange, styleButton } from "../../themeContext";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { ContainerBox } from "../../components/ContainerRecruiter/ContainerBox";
export const CommentManage = () => {
  return (
    <ContainerBox>
      <form action="">
        <Stack direction="row" spacing={2}>
          <TextField label="Search" fullWidth />
          <Button
            sx={{
              backgroundColor: colorButtonOrange,
              color: "white",
              border: "none",
            }}
            variant="contained"
          >
            Search
          </Button>
        </Stack>
      </form>
      <Stack direction="row" marginBlock="1rem" spacing={2}>
        <Button sx={styleButton}>Sort Date</Button>
        <Button sx={styleButton}>Sort A-Z</Button>
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell sx={{ width: "50%", maxWidth: 500 }}>
                Comment
              </TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Nguyen Van A</TableCell>
              <TableCell>nguyenvana@gmail.com</TableCell>
              <TableCell>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur illum in recusandae repellat quos hic delectus, iure,
                animi neque aut maiores aliquid sed quia, doloremque accusantium
                itaque qui facere rem. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Officia nostrum fugiat magnam vero eos
                praesentium odio nulla alias, vitae aperiam dolores, quam
                voluptates architecto neque quaerat autem recusandae ex
                corporis.
              </TableCell>
              <TableCell>2025-03-23</TableCell>
              <TableCell>
                <Button sx={{ color: "white", backgroundColor: "red" }}>
                  Reports
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </ContainerBox>
  );
};
