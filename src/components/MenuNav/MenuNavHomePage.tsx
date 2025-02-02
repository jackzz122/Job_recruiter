import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
const listOfNavHomePage: {
  name: string;
  href: string;
}[] = [
  {
    name: "Việc làm IT theo kỹ năng",
    href: "",
  },
  {
    name: "Việc làm IT theo cấp bậc",
    href: "history",
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
  const classSetColor = (isActive: boolean) => {
    return `p-2 w-full flex items-center justify-between ${
      isActive ? "text-white" : "text-gray-400"
    }`;
  };
  return (
    <Menu
      id={menuJobId}
      anchorEl={anchorEl}
      open={open}
      MenuListProps={{
        "aria-labelledby": "resources_btn",
      }}
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
      {listOfNavHomePage.map((navHomePage) => {
        return (
          <MenuItem
            sx={{ minWidth: "300px", color: "white" }}
            key={navHomePage.name}
            onClick={handleClose}
          >
            <NavLink
              to={navHomePage.href}
              className={({ isActive }) => classSetColor(isActive)}
            >
              <div>{navHomePage.name} </div>
              <ArrowForwardIosRoundedIcon fontSize="small" />
            </NavLink>
          </MenuItem>
        );
      })}
    </Menu>
  );
};
