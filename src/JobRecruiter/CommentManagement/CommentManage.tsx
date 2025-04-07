import { useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Search as SearchIcon, Sort as SortIcon } from "@mui/icons-material";
import { ContainerBox } from "../component/ContainerBox";
import { CommentItem } from "./component/CommentItem";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/feature/user/userSlice";
import { useGetCommentsQuery } from "../../redux/feature/comment/commentApiSlice";
import { CompanyType } from "../../types/CompanyType";

export const CommentManage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const user = useSelector(selectUser);
  const companyId = useMemo(
    () => (user?.companyId as CompanyType)?._id,
    [user]
  );
  const { data: commentList } = useGetCommentsQuery(companyId, {
    skip: !companyId,
  });
  console.log(commentList);
  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
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
          {commentList?.map((comment) => (
            <CommentItem key={comment._id} comment={comment} />
          ))}
        </Stack>
      </Stack>
    </ContainerBox>
  );
};
