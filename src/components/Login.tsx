import { Box, Button, Modal, Paper, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import TextInput from "./TextInput";
import { AccountCircle, Password, Person } from "@mui/icons-material";
import axios from "axios";
import { useAppDispatch } from "reduxHooks";
import User from "model/User";
import { login } from "features/user/userSlice";

interface LoginProps {
  isOpen: boolean;
  closeLoginModal: () => void;
}

const Login = ({ isOpen, closeLoginModal }: LoginProps) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [isRegister, setIsRegister] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = () => {
    axios
      .post("http://localhost:3001/auth/login", { username, password })
      .then((res) => {
        const { token, user }: { token: string; user: User } = res.data;
        dispatch(login({ jwt: token, ...user }));
        closeLoginModal();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  const close = () => {
    closeLoginModal();
    setIsRegister(false);
  };

  return (
    <Modal open={isOpen} onClose={() => close()}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#f8f8f8",
          p: "22px",
          borderRadius: "16px",
        }}
      >
        <Typography
          color={theme.palette.secondary.dark}
          fontWeight={700}
          fontSize={"20px"}
        >
          {isRegister ? "Register" : "Login/Register"}
        </Typography>
        <Typography
          color={theme.palette.secondary.dark}
          fontSize={"12px"}
          mb={"22px"}
        >
          Join the community, find your love interest
        </Typography>
        <Box
          width={"370px"}
          display={"flex"}
          gap={"8px"}
          flexDirection={"column"}
          mb={"22px"}
        >
          <TextInput
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputIcon={
              <AccountCircle
                sx={{ color: theme.palette.secondary.dark, mr: "12px" }}
              />
            }
          ></TextInput>
          {isRegister && (
            <Box display={"flex"} gap={"12px"} mb={"16px"}>
              <TextInput
                placeholder="First Name"
                InputIcon={
                  <Person
                    sx={{ color: theme.palette.secondary.dark, mr: "12px" }}
                  />
                }
              ></TextInput>
              <TextInput placeholder="Last Name"></TextInput>
            </Box>
          )}
          <TextInput
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputIcon={
              <Password
                sx={{ color: theme.palette.secondary.dark, mr: "12px" }}
              />
            }
          ></TextInput>
          {isRegister && (
            <TextInput
              placeholder="Confirm Password"
              type="password"
            ></TextInput>
          )}
        </Box>
        <Box display={"flex"} justifyContent={"flex-end"} gap={"12px"}>
          <Button
            variant="contained"
            size="large"
            onClick={() => setIsRegister(true)}
            sx={{ background: theme.palette.secondary.light }}
          >
            Register
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => submitLogin()}
            sx={{ background: theme.palette.primary.light }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default Login;