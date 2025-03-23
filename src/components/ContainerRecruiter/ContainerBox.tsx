import Box from "@mui/material/Box";
export const ContainerBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5", // or any gray color you prefer
        minHeight: "100vh",
        width: "100%",
        paddingBlock: "2rem",
        paddingInline: "1rem",
      }}
    >
      {children}
    </Box>
  );
};
