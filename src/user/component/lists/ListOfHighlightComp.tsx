import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
export const ListOfHighlightComp = ({
  listHighlights,
}: {
  listHighlights: string[];
}) => {
  const stylesForBox = {
    marginBlock: "0.75rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  };
  return (
    <Box sx={{ marginTop: "0.25rem" }}>
      {listHighlights.map((highlight, index) => {
        return (
          <Box sx={stylesForBox} key={index}>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <Typography>{highlight}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};
