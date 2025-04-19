import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const tabs = [
  { name: "Job applied", href: "." },
  { name: "Jobs Save", href: "saved" },
  { name: "Company Saves", href: "companySaves" },
];

export const JobManage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            bgcolor: "white",
            borderTopRightRadius: "1rem",
            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
            borderTopLeftRadius: "1rem",
          }}
        >
          <Stack direction="row" role="tablist">
            {tabs.map((tab, index) => (
              <NavLink
                key={tab.name}
                to={tab.href}
                onClick={() => handleTabChange(index)}
                style={{ textDecoration: "none", flex: 1 }}
                end
                className={({ isActive }) =>
                  isActive ? "active font-bold text-red-500" : ""
                }
                aria-current={activeTab === index ? "page" : undefined}
              >
                <Box
                  sx={{
                    p: 2,
                    textAlign: "center",
                    borderBottom: "2px solid",
                    borderColor: "transparent",
                    transition: "all 0.3s ease",
                    "&.active": {
                      borderColor: "#d32f2f",
                      color: "#d32f2f",
                    },
                    "&:hover": {
                      borderColor: "#ffcdd2",
                      color: "#d32f2f",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: activeTab === index ? "bold" : "normal",
                      fontSize: "1.1rem",
                    }}
                  >
                    {tab.name}
                  </Typography>
                </Box>
              </NavLink>
            ))}
          </Stack>
        </Box>
        <Box
          sx={{
            height: "calc(100vh - 150px)",
            overflowY: "auto",
            mt: 2,
          }}
        >
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
};
