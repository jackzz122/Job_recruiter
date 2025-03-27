import { Typography } from "@mui/material";

import { Avatar } from "@mui/material";

import CardContent from "@mui/material/CardContent";

import CardHeader from "@mui/material/CardHeader";

import Card from "@mui/material/Card";

export const CardInforStaff = () => {
  return (
    <Card>
      <CardHeader avatar={<Avatar />} />
      <CardContent>
        <Typography>
          <p>Name</p>
        </Typography>
      </CardContent>
    </Card>
  );
};
