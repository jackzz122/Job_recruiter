import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useState } from "react";
export const Company_review_list = () => {
  const [value, setValue] = useState<number | null>(2);
  return (
    <Card>
      <CardContent sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Avatar>L</Avatar>
        <Box>
          <Typography variant="h6" marginBottom={0.2}>
            User name
          </Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
          <Typography variant="body2">Very good company</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
