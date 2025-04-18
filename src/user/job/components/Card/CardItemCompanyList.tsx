import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { CompanyType } from "../../../../types/CompanyType";
import { Link } from "react-router-dom";
export const CardItemCompanyList = ({ company }: { company: CompanyType }) => {
  return (
    <Card sx={{ maxHeight: "30rem" }}>
      <CardMedia
        sx={{ height: 250, border: "1px solid gray" }}
        image={company.logo || "/bss_avatar.png"}
        title={company.companyName}
      />
      <CardContent>
        <Typography variant="h5" fontWeight="bold">
          {company.companyName}
        </Typography>
        <Typography display="block" marginTop={1} textAlign="justify">
          {company.description[0].about}
        </Typography>
      </CardContent>
      <CardActions>
        <Link
          className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-all duration-300 min-w-20 text-center"
          to={`/company/${company._id}`}
        >
          Details
        </Link>
      </CardActions>
    </Card>
  );
};
