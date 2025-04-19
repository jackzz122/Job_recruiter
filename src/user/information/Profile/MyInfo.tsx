import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import { selectUser } from "../../../redux/feature/user/userSlice";
import { useSelector } from "react-redux";
import LinkIcon from "@mui/icons-material/Link";
import WorkIcon from "@mui/icons-material/Work";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Container from "@mui/material/Container";

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const EditDialog = ({ open, onClose, title, children }: EditDialogProps) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{children}</DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button variant="contained" color="primary" onClick={onClose}>
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

export const MyInfo = () => {
  const user = useSelector(selectUser);
  const [openBasicInfo, setOpenBasicInfo] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [openSkills, setOpenSkills] = useState(false);
  const [openEducation, setOpenEducation] = useState(false);
  const [openCertificates, setOpenCertificates] = useState(false);
  const [openProjects, setOpenProjects] = useState(false);
  const [openExperience, setOpenExperience] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          pb: 3,
        }}
      >
        <Stack spacing={3} sx={{ flex: 1 }}>
          <Paper sx={{ p: 3, position: "relative" }}>
            <IconButton
              sx={{ position: "absolute", right: 8, top: 8 }}
              onClick={() => setOpenBasicInfo(true)}
            >
              <EditIcon />
            </IconButton>
            <Stack direction="row" spacing={3}>
              <Avatar
                src={user?.avatarImg ?? "/avatar.png"}
                sx={{ width: 120, height: 120 }}
              />
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {user?.fullname ?? "Your Name"}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  {user?.email}
                </Typography>
                <Typography color="text.secondary">
                  {user?.phone ?? "Not found phone number"}
                </Typography>
                <Typography color="text.secondary">
                  {user?.address ?? "Quan 1, TP Ho Chi Minh"}
                </Typography>
              </Box>
            </Stack>
          </Paper>

          {/* About Me */}
          <Paper sx={{ p: 3, position: "relative" }}>
            <IconButton
              sx={{ position: "absolute", right: 8, top: 8 }}
              onClick={() => setOpenAbout(true)}
            >
              <EditIcon />
            </IconButton>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              About Me
            </Typography>
            <Typography color="text.secondary">
              I am a passionate frontend developer with experience in React and
              TypeScript
            </Typography>
          </Paper>

          {/* Skills */}
          <Paper sx={{ p: 3, position: "relative" }}>
            <IconButton
              sx={{ position: "absolute", right: 8, top: 8 }}
              onClick={() => setOpenSkills(true)}
            >
              <EditIcon />
            </IconButton>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Skills
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {["React", "TypeScript", "JavaScript", "HTML", "CSS"].map(
                (skill) => (
                  <Chip key={skill} label={skill} />
                )
              )}
            </Box>
          </Paper>

          {/* Education */}
          <Paper sx={{ p: 3, position: "relative" }}>
            <IconButton
              sx={{ position: "absolute", right: 8, top: 8 }}
              onClick={() => setOpenEducation(true)}
            >
              <EditIcon />
            </IconButton>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Education
            </Typography>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                Công nghệ thông tin
              </Typography>
              <Typography color="text.secondary">
                Đại học Kinh Tế Quốc Dân
              </Typography>
              <Typography color="text.secondary">10/2020 - 12/2024</Typography>
            </Box>
          </Paper>

          {/* Work Experience */}
          <Paper sx={{ p: 3, position: "relative" }}>
            <IconButton
              sx={{ position: "absolute", right: 8, top: 8 }}
              onClick={() => setOpenExperience(true)}
            >
              <EditIcon />
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <WorkIcon color="primary" />
              <Typography variant="h6" fontWeight="bold">
                Work Experience
              </Typography>
            </Box>
            <Stack spacing={3}>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Senior Frontend Developer
                </Typography>
                <Typography color="text.secondary">
                  Company Name • 2022 - Present
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  • Developed and maintained multiple React applications • Led a
                  team of 3 frontend developers • Improved application
                  performance by 40%
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Frontend Developer
                </Typography>
                <Typography color="text.secondary">
                  Previous Company • 2020 - 2022
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  • Built responsive web applications using React and TypeScript
                  • Collaborated with backend team for API integration
                </Typography>
              </Box>
            </Stack>
          </Paper>

          {/* Personal Projects */}
          <Paper sx={{ p: 3, position: "relative" }}>
            <IconButton
              sx={{ position: "absolute", right: 8, top: 8 }}
              onClick={() => setOpenProjects(true)}
            >
              <EditIcon />
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <LinkIcon color="primary" />
              <Typography variant="h6" fontWeight="bold">
                Personal Projects
              </Typography>
            </Box>
            <Stack spacing={3}>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    E-commerce Platform
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<LinkIcon />}
                    href="https://github.com/yourusername/project"
                    target="_blank"
                  >
                    GitHub
                  </Button>
                </Box>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  • Built with React, TypeScript, and Material-UI • Implemented
                  user authentication and shopping cart functionality •
                  Integrated with Stripe for payments
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Task Management App
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<LinkIcon />}
                    href="https://github.com/yourusername/project2"
                    target="_blank"
                  >
                    GitHub
                  </Button>
                </Box>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  • Developed using Next.js and TailwindCSS • Real-time updates
                  with WebSocket • Drag-and-drop task organization
                </Typography>
              </Box>
            </Stack>
          </Paper>

          {/* Certificates */}
          <Paper sx={{ p: 3, position: "relative" }}>
            <IconButton
              sx={{ position: "absolute", right: 8, top: 8 }}
              onClick={() => setOpenCertificates(true)}
            >
              <EditIcon />
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <EmojiEventsIcon color="primary" />
              <Typography variant="h6" fontWeight="bold">
                Certificates
              </Typography>
            </Box>
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  AWS Certified Developer
                </Typography>
                <Typography color="text.secondary">
                  Amazon Web Services • 2023
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Meta Frontend Developer
                </Typography>
                <Typography color="text.secondary">
                  Meta (Facebook) • 2022
                </Typography>
              </Box>
            </Stack>
          </Paper>

          {/* Edit Dialogs */}
          <EditDialog
            open={openBasicInfo}
            onClose={() => setOpenBasicInfo(false)}
            title="Edit Basic Information"
          >
            <Stack spacing={2} sx={{ mt: 2 }}>
              <TextField
                label="Full Name"
                defaultValue={user?.fullname}
                fullWidth
              />
              <TextField label="Phone" defaultValue={user?.phone} fullWidth />
              <TextField
                label="Address"
                defaultValue={user?.address}
                fullWidth
              />
            </Stack>
          </EditDialog>

          <EditDialog
            open={openAbout}
            onClose={() => setOpenAbout(false)}
            title="Edit About Me"
          >
            <TextField
              multiline
              rows={4}
              fullWidth
              label="About Me"
              sx={{ mt: 2 }}
            />
          </EditDialog>

          <EditDialog
            open={openSkills}
            onClose={() => setOpenSkills(false)}
            title="Edit Skills"
          >
            <TextField
              label="Skills (comma-separated)"
              defaultValue="React, TypeScript, JavaScript, HTML, CSS"
              fullWidth
              sx={{ mt: 2 }}
            />
          </EditDialog>

          <EditDialog
            open={openEducation}
            onClose={() => setOpenEducation(false)}
            title="Edit Education"
          >
            <Stack spacing={2} sx={{ mt: 2 }}>
              <TextField
                label="Major"
                defaultValue="Công nghệ thông tin"
                fullWidth
              />
              <TextField
                label="School"
                defaultValue="Đại học Kinh Tế Quốc Dân"
                fullWidth
              />
              <TextField
                label="Time Period"
                defaultValue="10/2020 - 12/2024"
                fullWidth
              />
            </Stack>
          </EditDialog>

          {/* Work Experience Dialog */}
          <EditDialog
            open={openExperience}
            onClose={() => setOpenExperience(false)}
            title="Edit Work Experience"
          >
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Current Position</Typography>
              <TextField label="Job Title" fullWidth />
              <TextField label="Company" fullWidth />
              <TextField label="Duration" fullWidth />
              <TextField
                label="Responsibilities"
                multiline
                rows={4}
                fullWidth
                placeholder="• List your responsibilities
• One per line
• Be specific"
              />
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2">Previous Position</Typography>
              <TextField label="Job Title" fullWidth />
              <TextField label="Company" fullWidth />
              <TextField label="Duration" fullWidth />
              <TextField
                label="Responsibilities"
                multiline
                rows={4}
                fullWidth
              />
            </Stack>
          </EditDialog>

          {/* Projects Dialog */}
          <EditDialog
            open={openProjects}
            onClose={() => setOpenProjects(false)}
            title="Edit Projects"
          >
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Project 1</Typography>
              <TextField label="Project Name" fullWidth />
              <TextField label="GitHub Link" fullWidth />
              <TextField
                label="Description"
                multiline
                rows={4}
                fullWidth
                placeholder="• Technologies used
• Key features
• Your role"
              />
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2">Project 2</Typography>
              <TextField label="Project Name" fullWidth />
              <TextField label="GitHub Link" fullWidth />
              <TextField label="Description" multiline rows={4} fullWidth />
            </Stack>
          </EditDialog>

          {/* Certificates Dialog */}
          <EditDialog
            open={openCertificates}
            onClose={() => setOpenCertificates(false)}
            title="Edit Certificates"
          >
            <Stack spacing={2} sx={{ mt: 2 }}>
              <TextField label="Certificate Name" fullWidth />
              <TextField label="Issuing Organization" fullWidth />
              <TextField label="Issue Date" fullWidth />
              <Divider sx={{ my: 2 }} />
              <TextField label="Certificate Name" fullWidth />
              <TextField label="Issuing Organization" fullWidth />
              <TextField label="Issue Date" fullWidth />
            </Stack>
          </EditDialog>
        </Stack>
      </Container>
    </Box>
  );
};
