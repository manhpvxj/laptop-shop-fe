import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// @mui
import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
// components
import axiosClient from "../../../api/axiosClient";
import { setAccessToken, setLoggedIn } from "../../../redux/auth.slice";
import {
  passwordSelector,
  setPassword,
  setShowPassword,
  setUsername,
  showPasswordSelector,
  usernameSelector,
  setRememberMe,
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
    rememberMe: useSelector(state => state.login.rememberMe),
  };

  const handleSubmit = async () => {
    if (!loginData) return;
    try {
      const res = await axiosClient.post("/auth/login", {
        username: loginData.username,
        password: loginData.password,
      });
      if(loginData.rememberMe) {
        dispatch(setAccessToken(res.token));
        localStorage.setItem("accessToken", res.token);
      }
      dispatch(setPassword(""));
      dispatch(setLoggedIn(true));
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
        <FormControlLabel 
          control={<Checkbox
                       checked={loginData.rememberMe}
                       onChange={(e) => dispatch(setRememberMe(e.target.checked))}/> 
           } label="Remember me"/>
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
