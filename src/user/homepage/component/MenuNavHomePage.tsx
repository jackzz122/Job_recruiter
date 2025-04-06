import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";

// Job skills data
const jobSkills = [
  "React",
  "Angular",
  "Vue",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Python",
  "Java",
  "C#",
  "PHP",
  "SQL",
  "MongoDB",
  "AWS",
  "Docker",
  "Kubernetes",
  "DevOps",
  "UI/UX",
  "GraphQL",
  "Redux",
  "Next.js",
];

// Job levels data
const jobLevels = [
  "Intern",
  "Junior",
  "Mid-level",
  "Senior",
  "Lead",
  "Manager",
  "Director",
  "VP",
  "CTO",
  "Architect",
  "Full-stack",
  "Frontend",
  "Backend",
  "Mobile",
  "DevOps",
  "Data Scientist",
  "ML Engineer",
];

const listOfNavHomePage: {
  name: string;
  href: string;
  hasPopup?: boolean;
  popupType?: "skills" | "levels";
}[] = [
  {
    name: "Việc làm IT theo kỹ năng",
    href: "",
    hasPopup: true,
    popupType: "skills",
  },
  {
    name: "Việc làm IT theo cấp bậc",
    href: "history",
    hasPopup: true,
    popupType: "levels",
  },
  {
    name: "Việc làm IT theo công ty",
    href: "/save_company",
  },
  {
    name: "Việc làm IT theo thành phố",
    href: "/asdqwe",
  },
];

export const MenuNavHomePage = ({
  menuJobId,
  anchorEl,
  open,
  handleClose,
}: {
  menuJobId: string;
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
}) => {
  const [hoveredItem, setHoveredItem] = useState<"skills" | "levels" | null>(
    null
  );
  const menuRef = useRef<HTMLDivElement>(null);
  const sideMenuRef = useRef<HTMLDivElement>(null);
  const [sideMenuPosition, setSideMenuPosition] = useState({ top: 0, left: 0 });

  // Create a bridge element to connect the two menus
  const [bridgePosition, setBridgePosition] = useState({
    top: 0,
    left: 0,
    height: 0,
    width: 0,
  });

  // Update position of side menu and bridge when menu opens or hoveredItem changes
  useEffect(() => {
    if (open && menuRef.current && hoveredItem) {
      const menuRect = menuRef.current.getBoundingClientRect();

      setSideMenuPosition({
        top: menuRect.top,
        left: menuRect.right,
      });

      setBridgePosition({
        top: menuRect.top,
        left: menuRect.right - 10, // Overlap with main menu
        height: menuRect.height,
        width: 20, // Make bridge wide enough to ensure continuous hover
      });
    }
  }, [open, hoveredItem]);

  // Handle click on a chip item
  const handleChipClick = (item: string) => {
    console.log(
      `Selected ${hoveredItem === "skills" ? "skill" : "level"}: ${item}`
    );
    // You can implement your navigation or filtering logic here
    // handleClose(); // Uncomment if you want to close the menu after selection
  };

  const handleMouseEnter = (popupType?: "skills" | "levels") => {
    if (popupType) {
      setHoveredItem(popupType);
    }
  };

  const renderSideMenu = () => {
    if (!hoveredItem) return null;

    const data = hoveredItem === "skills" ? jobSkills : jobLevels;
    const title =
      hoveredItem === "skills" ? "Kỹ năng công việc" : "Cấp bậc công việc";

    return (
      <>
        {/* Invisible bridge element to maintain hover state between menus */}
        <div
          style={{
            position: "fixed",
            top: bridgePosition.top,
            left: bridgePosition.left,
            height: bridgePosition.height,
            width: bridgePosition.width,
            zIndex: 1999,
            pointerEvents: "none", // Allow events to pass through but preserve hover effect
          }}
          onMouseOver={() => {
            // This won't be triggered due to pointerEvents: none, but kept for clarity
            console.log("Bridge hovered");
          }}
        />

        <Paper
          ref={sideMenuRef}
          sx={{
            position: "fixed",
            top: sideMenuPosition.top,
            left: sideMenuPosition.left,
            width: "300px",
            backgroundColor: "black",
            color: "white",
            p: 2,
            borderRadius: "4px",
            zIndex: 2000,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
          }}
          onMouseEnter={() => {
            // This keeps the side menu visible when hovered
            console.log("Side menu hovered");
          }}
          onMouseLeave={() => {
            // Only hide the side menu when mouse completely leaves it
            // Not when moving back to main menu
            const mainMenuHovered =
              document.querySelector(":hover") === menuRef.current;
            if (!mainMenuHovered) {
              setHoveredItem(null);
            }
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              {title}
            </Typography>
          </Box>
          <Divider sx={{ mb: 2, borderColor: "rgba(255, 255, 255, 0.2)" }} />
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {data.map((item, index) => (
              <Chip
                key={index}
                label={item}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#ff6c2f",
                    color: "white",
                  },
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onClick={() => handleChipClick(item)}
              />
            ))}
          </Box>
        </Paper>
      </>
    );
  };

  return (
    <>
      <Menu
        id={menuJobId}
        anchorEl={anchorEl}
        open={open}
        sx={{
          "& .MuiPaper-root": {
            width: "500",
            maxHeight: "400px",
            padding: "10px",
            backgroundColor: "black",
          },
        }}
        onClose={handleClose}
      >
        <div
          ref={menuRef}
          onMouseLeave={(e) => {
            // Check if we're moving to the side menu
            // Get the element being moved to
            const toElement = e.relatedTarget as HTMLElement;
            // Check if the element is the side menu or a child of it
            if (
              sideMenuRef.current &&
              (sideMenuRef.current === toElement ||
                sideMenuRef.current.contains(toElement))
            ) {
              // Moving to side menu, keep hoveredItem
              return;
            }

            // Otherwise, only clear if not moving to side menu
            setHoveredItem(null);
          }}
        >
          {listOfNavHomePage.map((navHomePage) => (
            <MenuItem
              sx={{
                minWidth: "300px",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
              key={navHomePage.name}
              onMouseEnter={() => handleMouseEnter(navHomePage.popupType)}
            >
              <div className="flex items-center justify-between">
                <div>{navHomePage.name} </div>
                {navHomePage.hasPopup && (
                  <ArrowForwardIosRoundedIcon fontSize="small" />
                )}
              </div>
            </MenuItem>
          ))}
        </div>
      </Menu>
      {renderSideMenu()}
    </>
  );
};
