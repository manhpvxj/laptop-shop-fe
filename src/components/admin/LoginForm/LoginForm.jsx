import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// @mui
import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
} from "@mui/material";
// components
import axiosClient from "../../../api/axiosClient";
import { setAccessToken } from "../../../redux/auth.slice";
import {
  passwordSelector,
  setPassword,
  setShowPassword,
  setUsername,
  showPasswordSelector,
  usernameSelector,
} from "../../../redux/login.slice";
import Iconify from "../../../utils/Iconify";
// ----------------------------------------------------------------------

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showPassword = useSelector(showPasswordSelector);
  const loginData = {
    username: useSelector(usernameSelector),
    password: useSelector(passwordSelector),
  };

  const handleSubmit = async () => {
    if (!loginData) return;
    try {
      const res = await axiosClient.post("/auth/login", loginData);
      dispatch(setPassword(""));
      dispatch(setAccessToken(res.token));
      localStorage.setItem("accessToken", res.token);
      localStorage.setItem("username", res.username);
      navigate("/admin", { replace: true });
    } catch (e) {
      console.log(e);
      alert(e.response.data.message);
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="username"
          label="Username"
          value={loginData.username}
          onChange={(e) => dispatch(setUsername(e.target.value))}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={loginData.password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => dispatch(setShowPassword(!showPassword))}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover" className="cursor-pointer">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleSubmit}
      >
        Login
      </LoadingButton>
    </>
  );
}
