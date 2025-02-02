import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
const stylesForTextField = {
  text: {
    marginBottom: "1rem",
  },
};
export const ChangePass = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#f3f5f7",
          height: "100vh",
        }}
      >
        <Container
          sx={{
            paddingTop: "40px",
          }}
        >
          <Typography variant="h6" color="textSecondary">
            Thay đổi mật khẩu đăng nhập
          </Typography>
          <Box
            sx={{
              backgroundColor: "white",
              padding: 2,
            }}
          >
            <form>
              <TextField
                id="email"
                variant="filled"
                label="Email Đăng nhập"
                fullWidth
                disabled
                color="success"
                defaultValue="vuongducluong0369@gmail.com"
                sx={stylesForTextField.text}
              />
              <TextField
                id="password"
                type="password"
                fullWidth
                color="success"
                label="Nhập lại mật khẩu cũ"
                sx={stylesForTextField.text}
              />
              <TextField
                id="password"
                type="password"
                fullWidth
                color="success"
                label="Mật khẩu mới"
                sx={stylesForTextField.text}
              />
              <TextField
                id="password"
                type="password"
                fullWidth
                color="success"
                label="Nhập lại mật khẩu mới"
                sx={stylesForTextField.text}
              />
              <Button
                sx={{
                  marginTop: "1rem",
                  backgroundColor: "green",
                }}
                type="submit"
                variant="contained"
              >
                Lưu
              </Button>
            </form>
          </Box>
        </Container>
      </Box>
    </>
  );
};
