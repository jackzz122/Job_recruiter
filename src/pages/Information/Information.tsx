import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Link } from "react-router-dom";
export const Information = () => {
  const stylesForWhite = "bg-white px-2 py-4";
  return (
    <div className="w-full ">
      <div className={`infor flex gap-3 ${stylesForWhite}`}>
        <Avatar src="./avatar.png" sx={{ width: "6rem", height: "6rem" }} />
        <div>
          <Typography variant="h5" fontWeight="bold">
            Vương Đức Lương
          </Typography>
          <Typography variant="body2" sx={{ marginTop: "0.5rem" }}>
            <WorkOutlineOutlinedIcon /> Lập trình viên FrontEnd
          </Typography>
          <Typography variant="body2" sx={{ marginTop: "0.5rem" }}>
            <EmailOutlinedIcon /> vuongducluong0369@gmail.com
          </Typography>
          <Link to="" className="hover:text-blue-700 text-blue-500 mt-3 block">
            Cập nhập hồ sơ của bạn
          </Link>
        </div>
      </div>
      <br />
      <div className={`infor flex gap-3 ${stylesForWhite}`}>
        <Typography variant="h5" fontWeight="bold">
          Hồ sơ đính kèm của bạn
        </Typography>
      </div>
    </div>
  );
};
