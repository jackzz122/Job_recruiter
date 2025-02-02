import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
export const Register = () => {
  return (
    <>
      <Typography variant="h6" sx={{ color: "red" }}>
        Chào mừng bạn đến với Web tuyển dụng
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Cùng xây dựng 1 hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng
      </Typography>
      <form>
        <TextField
          id="name"
          label="Nhập họ và tên"
          fullWidth
          sx={{ marginBlock: "0.75rem" }}
        />
        <TextField
          id="email"
          type="email"
          label="Nhập Email"
          fullWidth
          sx={{ marginBlock: "0.75rem" }}
        />
        <TextField
          id="password"
          type="password"
          label="Nhập mật khẩu"
          fullWidth
          sx={{ marginBlock: "0.75rem" }}
        />
        <TextField
          id="password"
          type="password"
          label="Nhập lại mật khẩu"
          fullWidth
          sx={{ marginBlock: "0.75rem" }}
        />
        <Button
          type="submit"
          sx={{ backgroundColor: "red", color: "white" }}
          fullWidth
        >
          Đăng ký
        </Button>
      </form>
      <p className="flex justify-center my-5">
        Bạn có tài khoản?{" "}
        <Link className="text-green-500 hover:underline" to="/login">
          Đăng nhập ngay
        </Link>
      </p>
    </>
  );
};
