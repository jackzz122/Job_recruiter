import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
export const CardItemCompanyList = () => {
  return (
    <Card sx={{ maxHeight: "30rem" }}>
      <CardMedia
        sx={{ height: 250, border: "1px solid gray" }}
        image="/bss_avatar.png"
        title="Company name"
      />
      <CardContent>
        <Typography textAlign="justify">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi enim
          harum blanditiis dolor tempora. Error at delectus unde minus nobis
          praesentium distinctio exercitationem, inventore voluptates? Animi
          saepe aspernatur veniam reiciendis.
        </Typography>
      </CardContent>
      <CardActions>
        <Button>Details</Button>
      </CardActions>
    </Card>
  );
};
