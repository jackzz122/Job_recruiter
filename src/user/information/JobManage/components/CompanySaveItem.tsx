import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRemoveFavouriteCompanyMutation } from "../../../../redux/feature/user/userApiSlice";
import { handleError } from "../../../../helper/HandleError/handleError";
import { toast } from "react-toastify";
import { CompanySaveResponse } from "../../../../types/UserType";
import { Link } from "react-router-dom";

export const CompanySaveItem = ({
  company,
}: {
  company: CompanySaveResponse;
}) => {
  const [removeCompany, { isLoading }] = useRemoveFavouriteCompanyMutation();
  const handleRemoveCompany = async () => {
    try {
      const response = await removeCompany(company._id);
      if (response.data?.success) {
        toast.success(response.data?.message);
      }
    } catch (err) {
      const error = handleError(err);
      console.log(error);
    }
  };
  return (
    <Stack
      borderRadius={4}
      sx={{ backgroundColor: "white" }}
      direction="row"
      padding={2}
      spacing={2}
      marginBottom={2}
      justifyContent="space-between"
    >
      <Link to={`/company/${company._id}`}>
        <Stack
          alignItems="center"
          direction="row"
          spacing={2}
          className="information company"
        >
          <Box>
            <img
              src={company.logo ? company.logo : "/bss_avatar.png"}
              alt=""
              className="w-20 h-20 rounded-2xl border border-gray-300"
            />
          </Box>
          <Box>
            <Typography fontWeight="bold" marginBottom={1}>
              {company.companyName}
            </Typography>
            <Typography variant="body2" marginBottom={1}>
              {company.address}
            </Typography>
            <Typography variant="body2">{company.country}</Typography>
          </Box>
        </Stack>
      </Link>
      <Box>
        <IconButton onClick={handleRemoveCompany} loading={isLoading}>
          <FavoriteIcon sx={{ color: "red" }} />
        </IconButton>
      </Box>
    </Stack>
  );
};
