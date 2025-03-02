import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";
export const LayoutForCV_infor = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" paddingBlock={1}>
        {title}
      </Typography>
      <Box
        sx={{
          backgroundColor: "white",
          paddingBlock: "0.75rem",
          paddingInline: "0.5rem",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
