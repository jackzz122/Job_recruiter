import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Search as SearchIcon,
  Sort as SortIcon,
  MoreVert as MoreVertIcon,
  Flag as FlagIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
} from "@mui/icons-material";
import { ContainerBox } from "../component/ContainerBox";

interface Comment {
  id: string;
  name: string;
  email: string;
  comment: string;
  date: string;
  status: "active" | "reported" | "blocked";
}

export const CommentManage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [actionAnchorEl, setActionAnchorEl] = useState<null | HTMLElement>(
    null
  );

  // Mock data
  const comments: Comment[] = [
    {
      id: "1",
      name: "Nguyen Van A",
      email: "nguyenvana@gmail.com",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "2025-03-23",
      status: "active",
    },
    // Add more mock comments as needed
  ];

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const handleActionClick = (
    event: React.MouseEvent<HTMLElement>,
    comment: Comment
  ) => {
    setSelectedComment(comment);
    setActionAnchorEl(event.currentTarget);
  };

  const handleActionClose = () => {
    setActionAnchorEl(null);
    setSelectedComment(null);
  };

  const getStatusColor = (status: Comment["status"]) => {
    switch (status) {
      case "reported":
        return "error";
      case "blocked":
        return "warning";
      default:
        return "success";
    }
  };

  return (
    <ContainerBox>
      <Stack spacing={3}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Comment Management
          </Typography>
        </Box>

        {/* Search and Sort */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Paper
            elevation={0}
            sx={{
              flex: 1,
              p: 2,
              display: "flex",
              alignItems: "center",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
            }}
          >
            <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
            <TextField
              fullWidth
              placeholder="Search comments..."
              variant="standard"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ "& .MuiInputBase-root": { fontSize: "0.875rem" } }}
            />
          </Paper>
          <Button
            variant="outlined"
            startIcon={<SortIcon />}
            onClick={handleSortClick}
            sx={{
              borderColor: "divider",
              color: "text.primary",
              "&:hover": { borderColor: "primary.main", color: "primary.main" },
            }}
          >
            Sort
          </Button>
          <Menu
            anchorEl={sortAnchorEl}
            open={Boolean(sortAnchorEl)}
            onClose={handleSortClose}
          >
            <MenuItem onClick={handleSortClose}>Sort by Date</MenuItem>
            <MenuItem onClick={handleSortClose}>Sort A-Z</MenuItem>
          </Menu>
        </Box>

        {/* Comments List */}
        <Stack spacing={2}>
          {comments.map((comment) => (
            <Paper
              key={comment.id}
              elevation={0}
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                "&:hover": {
                  boxShadow: 2,
                  borderColor: "primary.main",
                },
              }}
            >
              <Stack spacing={2}>
                {/* Comment Header */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {comment.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {comment.email}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Chip
                      label={comment.status}
                      color={getStatusColor(comment.status)}
                      size="small"
                      sx={{ textTransform: "capitalize" }}
                    />
                    <IconButton
                      size="small"
                      onClick={(e) => handleActionClick(e, comment)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </Box>

                {/* Comment Content */}
                <Typography variant="body2" color="text.secondary">
                  {comment.comment}
                </Typography>

                {/* Comment Footer */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Posted on {comment.date}
                  </Typography>
                  <Button
                    startIcon={<FlagIcon />}
                    color="error"
                    size="small"
                    onClick={() => console.log("Report comment:", comment.id)}
                  >
                    Report
                  </Button>
                </Box>
              </Stack>
            </Paper>
          ))}
        </Stack>

        {/* Action Menu */}
        <Menu
          anchorEl={actionAnchorEl}
          open={Boolean(actionAnchorEl)}
          onClose={handleActionClose}
        >
          <MenuItem onClick={handleActionClose}>
            <BlockIcon sx={{ mr: 1 }} /> Block User
          </MenuItem>
          <MenuItem onClick={handleActionClose}>
            <DeleteIcon sx={{ mr: 1 }} /> Delete Comment
          </MenuItem>
        </Menu>
      </Stack>
    </ContainerBox>
  );
};
