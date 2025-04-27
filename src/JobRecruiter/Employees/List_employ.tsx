import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

import { colorButtonOrange, styleButton } from "../../themeContext";

import { ContainerBox } from "../component/ContainerBox";
import { EmployeeItem } from "./EmployeeItem";
import { useGetCandidateJobPosingListQuery } from "../../redux/feature/job/jobApiSlice";

export const List_employ = () => {
  const { data: jobPosingInfo } = useGetCandidateJobPosingListQuery();

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
      <Stack marginTop={2} direction="row" spacing={1}>
        <Button sx={styleButton} variant="outlined">
          Sort <SortByAlphaIcon />
        </Button>
      </Stack>

      {!jobPosingInfo?.data || jobPosingInfo.data.length === 0 ? (
        <Box sx={{ textAlign: "center", p: 4 }}>
          <Typography variant="h6">No candidate applications found</Typography>
        </Box>
      ) : (
        <Stack spacing={2} sx={{ mt: 2 }}>
          {jobPosingInfo.data.map((jobPosting, index) => (
            <Accordion key={jobPosting.jobId || index} defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  backgroundColor: "rgba(255, 108, 48, 0.08)",
                  "&:hover": { backgroundColor: "rgba(255, 108, 48, 0.12)" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <WorkOutlineIcon sx={{ color: colorButtonOrange }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {jobPosting.jobTitle}
                    </Typography>
                  </Box>
                  <Chip
                    label={`${jobPosting.listAccount.length} Applicants`}
                    size="small"
                    sx={{
                      bgcolor: "rgba(255, 108, 48, 0.1)",
                      color: colorButtonOrange,
                      fontWeight: 500,
                    }}
                  />
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0 }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Application Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {jobPosting.listAccount.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} align="center">
                            <Typography variant="body2" sx={{ py: 2 }}>
                              No applications for this job position yet
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ) : (
                        jobPosting.listAccount.map((account, accountIndex) => (
                          <EmployeeItem
                            key={account.accountId || accountIndex}
                            account={account}
                          />
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      )}
    </ContainerBox>
  );
};
