import { Box, Button, Modal, Paper, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import TextInput from "./TextInput";
import { AccountCircle, Password, Person } from "@mui/icons-material";
import axios from "axios";
import { useAppDispatch } from "hooks/useRedux";
import User from "model/User";
import { login } from "features/user/userSlice";
import { API_URL } from "util/url";

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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const reset = () => {
    setFirstName("");
    setLastName("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setIsRegister(false);
  };

  const onLogin = () => {
    axios
      .post(`${API_URL}/auth/login`, { username, password })
      .then((res) => {
        const { token, user }: { token: string; user: User } = res.data;
        dispatch(login({ jwt: token, ...user }));
        closeLoginModal();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        reset();
      });
  };

  const onRegister = () => {
    if (!isRegister) setIsRegister(true);
    if (firstName == "" || lastName == "" || username == "" || password == "")
      return;
    axios
      .post(`${API_URL}/users`, { firstName, lastName, username, password })
      .then((res) => {
        const { token, user }: { token: string; user: User } = res.data;
        dispatch(login({ jwt: token, ...user }));
        closeLoginModal();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        reset();
      });
  };

  const close = () => {
    closeLoginModal();
    reset();
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
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                InputIcon={
                  <Person
                    sx={{ color: theme.palette.secondary.dark, mr: "12px" }}
                  />
                }
              ></TextInput>
              <TextInput
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></TextInput>
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputIcon={
                <Password
                  sx={{ color: theme.palette.secondary.dark, mr: "12px" }}
                />
              }
            ></TextInput>
          )}
        </Box>
        <Box display={"flex"} justifyContent={"flex-end"} gap={"12px"}>
          <Button
            variant="contained"
            size="large"
            onClick={() => onRegister()}
            sx={{ background: theme.palette.secondary.light }}
          >
            Register
          </Button>
          {!isRegister && (
            <Button
              variant="contained"
              size="large"
              onClick={() => onLogin()}
              sx={{ background: theme.palette.primary.light }}
            >
              Login
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default Login;
