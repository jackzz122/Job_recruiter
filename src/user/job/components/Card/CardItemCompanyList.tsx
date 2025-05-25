import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CompanyType } from "../../../../types/CompanyType";
import { Link } from "react-router-dom";
import { Box, Chip, Stack, alpha } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import PeopleIcon from "@mui/icons-material/People";

export const CardItemCompanyList = ({ company }: { company: CompanyType }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.2s ease",
        borderRadius: 2,
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: (theme) =>
            `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          sx={{
            height: 140,
            objectFit: "contain",
            bgcolor: "white",
            p: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
          image={company.logo || "/companyNotFound.png"}
          title={company.companyName}
        />
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            display: "flex",
            gap: 0.5,
          }}
        >
          {company.keySkills?.slice(0, 2).map((skill, index) => (
            <Chip
              key={index}
              label={skill.value}
              size="small"
              sx={{
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                color: "primary.main",
                fontWeight: 600,
                fontSize: "0.75rem",
                height: 24,
              }}
            />
          ))}
        </Box>
      </Box>

      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 2 }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            mb: 1,
            fontSize: "1rem",
          }}
        >
          {company.companyName}
        </Typography>

        <Stack spacing={1} sx={{ mb: 1.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocationOnIcon sx={{ color: "text.secondary", fontSize: 18 }} />
            <Typography variant="body2" color="text.secondary" noWrap>
              {company.address || "Location not specified"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PeopleIcon sx={{ color: "text.secondary", fontSize: 18 }} />
            <Typography variant="body2" color="text.secondary" noWrap>
              {company.description?.[0]?.companySize || "Size not specified"}
            </Typography>
          </Box>
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            mb: 2,
            lineHeight: 1.4,
          }}
        >
          {company.description?.[0]?.about || "No description available"}
        </Typography>

        <Box sx={{ mt: "auto" }}>
          <Link
            to={`/company/${company._id}`}
            style={{ textDecoration: "none" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                bgcolor: "primary.main",
                color: "white",
                py: 1,
                borderRadius: 1,
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: "primary.dark",
                  transform: "scale(1.02)",
                },
              }}
            >
              <WorkIcon fontSize="small" />
              <Typography variant="button" sx={{ fontWeight: 600 }}>
                View Details
              </Typography>
            </Box>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};
