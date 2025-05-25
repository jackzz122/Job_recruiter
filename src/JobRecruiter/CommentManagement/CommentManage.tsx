import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import {
  Search as SearchIcon,
  Sort as SortIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from "@mui/icons-material";
import { ContainerBox } from "../component/ContainerBox";
import { CommentItem } from "./component/CommentItem";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/feature/user/userSlice";
import { useGetCommentsQuery } from "../../redux/feature/comment/commentApiSlice";
import { CompanyType } from "../../types/CompanyType";
import { CommentType } from "../../types/CommentType";
import { colorButtonOrange } from "../../themeContext";

const ITEMS_PER_PAGE = 5;

type SortOption = "newest" | "oldest" | "rating-high" | "rating-low";

export const CommentManage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [sortOption, setSortOption] = useState<SortOption>("newest");

  const user = useSelector(selectUser);
  const companyId = useMemo(
    () => (user?.companyId as CompanyType)?._id,
    [user]
  );

  const { data: commentList, isLoading } = useGetCommentsQuery(companyId, {
    skip: !companyId,
  });

  // Memoize filtered and sorted comments
  const filteredComments = useMemo(() => {
    if (!commentList?.data) return [];

    return (commentList.data as CommentType[])
      .filter((comment) => comment.status === "active")
      .filter((comment) => {
        const searchLower = searchQuery.toLowerCase();
        return (
          comment.title.toLowerCase().includes(searchLower) ||
          comment.details.whyLove.toLowerCase().includes(searchLower) ||
          comment.details.suggest.toLowerCase().includes(searchLower) ||
          comment.account_id?.fullname?.toLowerCase().includes(searchLower) ||
          comment.account_id?.email?.toLowerCase().includes(searchLower)
        );
      })
      .sort((a, b) => {
        switch (sortOption) {
          case "newest":
            return (
              new Date(b.createdDate).getTime() -
              new Date(a.createdDate).getTime()
            );
          case "oldest":
            return (
              new Date(a.createdDate).getTime() -
              new Date(b.createdDate).getTime()
            );
          case "rating-high":
            return b.rating - a.rating;
          case "rating-low":
            return a.rating - b.rating;
          default:
            return 0;
        }
      });
  }, [commentList?.data, searchQuery, sortOption]);

  // Calculate paginated comments
  const paginatedComments = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return filteredComments.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredComments, page]);

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const handleSortSelect = (option: SortOption) => {
    setSortOption(option);
    setSortAnchorEl(null);
    setPage(1); // Reset to first page when sorting changes
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(1); // Reset to first page when search changes
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const getSortIcon = () => {
    switch (sortOption) {
      case "newest":
      case "rating-high":
        return <ArrowDownwardIcon fontSize="small" />;
      case "oldest":
      case "rating-low":
        return <ArrowUpwardIcon fontSize="small" />;
      default:
        return <SortIcon />;
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
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, color: colorButtonOrange }}
          >
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
              placeholder="Search by title, content, or user..."
              variant="standard"
              value={searchQuery}
              onChange={handleSearch}
              sx={{ "& .MuiInputBase-root": { fontSize: "0.875rem" } }}
            />
          </Paper>
          <Button
            variant="outlined"
            startIcon={getSortIcon()}
            onClick={handleSortClick}
            sx={{
              borderColor: "divider",
              color: "text.primary",
              minWidth: "120px",
              "&:hover": { borderColor: "primary.main", color: "primary.main" },
            }}
          >
            {sortOption.replace("-", " ")}
          </Button>
          <Menu
            anchorEl={sortAnchorEl}
            open={Boolean(sortAnchorEl)}
            onClose={handleSortClose}
          >
            <MenuItem onClick={() => handleSortSelect("newest")}>
              Newest First
            </MenuItem>
            <MenuItem onClick={() => handleSortSelect("oldest")}>
              Oldest First
            </MenuItem>
            <MenuItem onClick={() => handleSortSelect("rating-high")}>
              Highest Rating
            </MenuItem>
            <MenuItem onClick={() => handleSortSelect("rating-low")}>
              Lowest Rating
            </MenuItem>
          </Menu>
        </Box>

        {/* Comments List */}
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        ) : filteredComments.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              textAlign: "center",
              border: "1px dashed",
              borderColor: "divider",
            }}
          >
            <Typography color="text.secondary">
              {searchQuery
                ? "No comments found matching your search"
                : "No comments found"}
            </Typography>
          </Paper>
        ) : (
          <>
            <Stack spacing={2}>
              {paginatedComments.map((comment) => (
                <CommentItem key={comment._id} comment={comment} />
              ))}
            </Stack>

            {/* Pagination */}
            {filteredComments.length > ITEMS_PER_PAGE && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Pagination
                  count={Math.ceil(filteredComments.length / ITEMS_PER_PAGE)}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: colorButtonOrange,
                    },
                    "& .Mui-selected": {
                      backgroundColor: `${colorButtonOrange} !important`,
                      color: "white !important",
                    },
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Stack>
    </ContainerBox>
  );
};
