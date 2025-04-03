import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
export const HeaderOfDetails = ({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) => {
  const stylesForBlock = {
    backgroundColor: "white",
    marginBlock: "2rem",
    padding: "1.5rem",
    border: "1px solid #bfbfbf",
    borderRadius: "0.5rem",
    width: "59.563rem",
  };
  return (
    <Box sx={stylesForBlock} className="generalInfo">
      <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
        {name}
      </Typography>
      <Divider />
      {children}
    </Box>
  );
};
