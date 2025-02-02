import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
export const Login = () => {
  return (
    <>
      <Typography variant="h6" sx={{ color: "green" }}>
        Chào mừng bạn đã quay trở lại
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Cùng xây dựng 1 hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng
      </Typography>
      <form>
        <TextField
          id="email"
          type="email"
          label="Email"
          fullWidth
          sx={{ marginBlock: "0.75rem" }}
        />
        <TextField
          id="password"
          type="password"
          label="Password"
          fullWidth
          sx={{ marginBlock: "0.75rem" }}
        />
        <div className="flex items-center justify-end mb-2">
          <Link className="text-green-500 hover:underline" to="/forgot_pass">
            Quên mật khẩu
          </Link>
        </div>
        <Button
          type="submit"
          sx={{ backgroundColor: "red", color: "white" }}
          fullWidth
        >
          Đăng nhập
        </Button>
      </form>

      <p className="flex justify-center my-5">
        Bạn chưa có tài khoản?{" "}
        <Link className="text-green-500 hover:underline" to="/register">
          Đăng ký ngay
        </Link>
      </p>
    </>
  );
};
