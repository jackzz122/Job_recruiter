import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { colorButtonOrange } from "../../themeContext";
import { UserType } from "../../types/UserType";
import { useDeleteRecruiterMutation } from "../../redux/feature/user/recruiterApiSlice";

interface SimpleInforStaffProps {
  staff: UserType[];
}

export const SimpleInforStaff = ({ staff }: SimpleInforStaffProps) => {
  const [deleteStaff, { isLoading }] = useDeleteRecruiterMutation();
  return (
    <TableContainer>
      <Table sx={{ backgroundColor: "white" }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "rgba(255, 108, 48, 0.05)" }}>
            <TableCell>
              <Typography fontWeight="bold">Staff Name</Typography>
            </TableCell>
            <TableCell>
              <Typography fontWeight="bold">Email</Typography>
            </TableCell>
            <TableCell>
              <Typography fontWeight="bold">Actions</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!staff || staff.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3}>
                <Box sx={{ p: 4, textAlign: "center" }}>
                  <Typography color="text.secondary">
                    No staff members found. Add your first staff member to get
                    started.
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            staff?.map((item) => (
              <TableRow
                key={item._id}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 108, 48, 0.04)",
                  },
                }}
              >
                {/* Staff Name */}
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PersonOutlineIcon
                      sx={{ color: colorButtonOrange, fontSize: 20 }}
                    />
                    <Typography variant="body1">{item.fullname}</Typography>
                  </Box>
                </TableCell>

                {/* Email */}
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <EmailOutlinedIcon
                      sx={{ color: colorButtonOrange, fontSize: 20 }}
                    />
                    <Typography variant="body2">{item.email}</Typography>
                  </Box>
                </TableCell>

                {/* Actions */}
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Tooltip title="View Details">
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          minWidth: "36px",
                          p: "6px",
                          border: `1px solid ${colorButtonOrange}`,
                          borderRadius: 1,
                        }}
                      >
                        <RemoveRedEyeOutlinedIcon
                          sx={{ color: colorButtonOrange, fontSize: 20 }}
                        />
                      </Button>
                    </Tooltip>

                    <Tooltip title="Delete Staff">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          deleteStaff(item._id);
                        }}
                        loading={isLoading}
                        sx={{
                          minWidth: "36px",
                          p: "6px 12px",
                          border: `1px solid ${colorButtonOrange}`,
                          color: colorButtonOrange,
                          borderRadius: 1,
                          "&:hover": {
                            backgroundColor: "rgba(255, 108, 48, 0.08)",
                          },
                        }}
                        startIcon={
                          <DeleteOutlineOutlinedIcon fontSize="small" />
                        }
                      >
                        Delete
                      </Button>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
