import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import EditLocationAltOutlinedIcon from "@mui/icons-material/EditLocationAltOutlined";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetDetailCompanyQuery } from "../../../redux/feature/company/companyApiSlice";
import { useGetJobPostingsQuery } from "../../../redux/feature/job/jobApiSlice";
import {
  useAddFavouriteCompanyMutation,
  useRemoveFavouriteCompanyMutation,
} from "../../../redux/feature/user/userApiSlice";
import { handleError } from "../../../helper/HandleError/handleError";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/feature/user/userSlice";
import { useEffect, useState } from "react";
import { CompanySaveResponse } from "../../../types/UserType";
export const DetailsHeader = () => {
  const navigate = useNavigate();
  const [isFavourite, setIsFavourite] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { data: companyDetail } = useGetDetailCompanyQuery(id ?? "", {
    skip: !id,
  });
  const { data: jobs } = useGetJobPostingsQuery(id ?? "", {
    skip: !id,
  });
  const user = useSelector(selectUser);
  const [removeFavouriteCompany, { isLoading: removeLoading }] =
    useRemoveFavouriteCompanyMutation();
  const [addFavouriteCompany, { isLoading: addLoading }] =
    useAddFavouriteCompanyMutation();
  const handleAddFavourite = async () => {
    if (!id) return;
    try {
      const response = await addFavouriteCompany(id).unwrap();
      if (response.success) {
        toast.success("Add favourite success");
        setIsFavourite(true);
      }
    } catch (err) {
      const error = handleError(err);
      console.log(error);
    }
  };
  const handleRemoveFavourite = async () => {
    if (!id) return;
    try {
      const response = await removeFavouriteCompany(id).unwrap();
      if (response.success) {
        toast.success("Remove favourite success");
        setIsFavourite(false);
      }
    } catch (err) {
      const error = handleError(err);
      console.log(error);
    }
  };
  useEffect(() => {
    if (id) {
      if (
        (user?.listFavouritesCompanyID as CompanySaveResponse[])?.some(
          (job) => job._id === id
        )
      ) {
        setIsFavourite(true);
      }
    }
  }, [user, id]);
  return (
    <Stack
      justifyContent="space-between"
      direction="row"
      spacing={2}
      sx={{ marginTop: "1.5rem" }}
    >
      <Stack direction="row" spacing={2}>
        <img
          src={companyDetail?.data.logo || "/bss_avatar.png"}
          alt=""
          className="w-1/4 rounded-lg "
        />
        <Box sx={{ color: "white" }}>
          <Typography fontWeight="bold" variant="h5">
            {companyDetail?.data.companyName}
          </Typography>
          <Stack direction="row" spacing={3} sx={{ marginBlock: "0.75rem" }}>
            <Typography>
              {" "}
              <EditLocationAltOutlinedIcon />
              {companyDetail?.data.address}
            </Typography>
            <Typography>
              {" "}
              <WorkOutlineOutlinedIcon /> {jobs?.data?.length} việc làm đang
              tuyển dụng
            </Typography>
          </Stack>
          <br />
          <Button
            onClick={() =>
              navigate(
                `/writeReview?companyName=${companyDetail?.data.companyName}&companyId=${companyDetail?.data._id}`
              )
            }
            sx={{
              backgroundColor: "red",
              color: "white",
              minWidth: "10rem",
              padding: "0.75rem",
            }}
          >
            Viết đánh giá
          </Button>
          {!isFavourite ? (
            <Button
              onClick={handleAddFavourite}
              loading={addLoading}
              sx={{
                backgroundColor: "white",
                color: "red",
                border: "1px solid red",
                minWidth: "10rem",
                marginLeft: "1rem",
                padding: "0.75rem",
              }}
            >
              Theo Dõi
            </Button>
          ) : (
            <Button
              onClick={handleRemoveFavourite}
              loading={removeLoading}
              sx={{
                backgroundColor: "white",
                color: "red",
                border: "1px solid red",
                minWidth: "10rem",
                marginLeft: "1rem",
                padding: "0.75rem",
              }}
            >
              Hủy Theo Dõi
            </Button>
          )}
        </Box>
      </Stack>
      <Box
        sx={{
          backgroundColor: "transparent",
          maxHeight: "4.625rem",
          minWidth: "27.875rem",
          color: "white",
          border: "1px solid #f3f5f7",
        }}
      >
        <Stack
          direction="row"
          height="100%"
          alignItems="center"
          paddingInline="2rem"
          justifyContent="space-between"
          spacing={2}
        >
          <Stack direction="row" alignItems="center" gap={2} flexGrow={1}>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ fontSize: "25px" }}
            >
              4.1
            </Typography>
            <Box>
              <Rating value={4} size="small" />
              <Typography>131 Đánh giá</Typography>
            </Box>
          </Stack>
          <Stack
            direction="row"
            flexWrap="wrap"
            alignItems="center"
            spacing={2}
            flexGrow={1}
          >
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ fontSize: "25px" }}
            >
              93%{" "}
            </Typography>
            <Typography sx={{ width: "70%" }}>
              Khuyến khích làm việc tại đây
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};
