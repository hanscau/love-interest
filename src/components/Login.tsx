import { Box, Button, Modal, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import TextInput from "./TextInput";
import { AccountCircle, Password, Person, Phone } from "@mui/icons-material";
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

  const emptyValidation = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
    phoneNo: "",
  };

  const [validation, setValidation] = useState(emptyValidation);
  const [authValidation, setAuthValidation] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("+65 ");
  const [confirmPassword, setConfirmPassword] = useState("");

  const reset = () => {
    setFirstName("");
    setLastName("");
    setUsername("");
    setPassword("");
    setPhoneNo("+65 ");
    setConfirmPassword("");
    setIsRegister(false);
    setValidation(emptyValidation);
    setAuthValidation("");
  };

  const onPhoneNumberChange = (value: string) => {
    if (value.length < 4 || value.length > 12) return;
    setPhoneNo(value);
  };

  const onLogin = () => {
    const error = emptyValidation;
    if (username === "") error.username = "Username is required";
    if (password === "") error.password = "Password is required";

    setValidation(error);
    if (Object.values(error).some((value) => value !== "")) {
      return;
    }

    axios
      .post(`${API_URL}/auth/login`, { username, password })
      .then((res) => {
        setAuthValidation("");
        const { token, user }: { token: string; user: User } = res.data;
        dispatch(login({ jwt: token, ...user }));
        reset();
        closeLoginModal();
      })
      .catch((err) => {
        console.log(err.response.data);
        setAuthValidation(err.response.data.errors);
      })
      .finally(() => {});
  };

  const onRegister = () => {
    if (!isRegister) return setIsRegister(true);

    const error = emptyValidation;
    if (username.length < 6)
      error.username = "Username must be at least 6 characters long";
    if (username.length > 20)
      error.username = "Username too long, maximum 20 characters";
    if (firstName === "") error.firstName = "First name is required";
    if (lastName === "") error.lastName = "Last name is required";
    if (phoneNo.length < 12 || phoneNo.length > 12)
      error.phoneNo = "Phone number invalid, SG phone number is 8 digits long";
    if (password !== confirmPassword)
      error.confirmPassword = "Password does not match";
    if (password.length < 6)
      error.password = "Password must be at least 6 characters long";
    if (password === "") error.password = "Password is required";
    if (confirmPassword === "")
      error.confirmPassword = "Confirm password is required";

    setValidation(error);
    if (Object.values(error).some((value) => value !== "")) {
      return;
    }

    axios
      .post(`${API_URL}/users`, {
        firstName,
        lastName,
        username,
        password,
        phoneNo,
      })
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
    reset();
    closeLoginModal();
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
          transition: "height 0.2s ease-in-out",
        }}
      >
        <Typography
          color={theme.palette.black}
          fontWeight={700}
          fontSize={"20px"}
        >
          {isRegister ? "Register" : "Login/Register"}
        </Typography>
        <Typography color={theme.palette.black} fontSize={"12px"} mb={"22px"}>
          Join the community, find your love interest
        </Typography>
        <Box
          width={"370px"}
          display={"flex"}
          flexDirection={"column"}
          mb={"22px"}
        >
          <TextInput
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            errorText={validation.username}
            error={validation.username !== ""}
            sx={{ mb: "8px" }}
            InputIcon={
              <AccountCircle sx={{ color: theme.palette.black, mr: "12px" }} />
            }
          ></TextInput>
          {isRegister && (
            <Box
              display={"flex"}
              gap={"12px"}
              mb={isRegister ? "16px" : 0}
              sx={{
                opacity: isRegister ? "1" : "0",
                transition:
                  "opacity 0.15s ease-in-out, height 0.2s ease-in-out",
              }}
            >
              <TextInput
                placeholder="First Name"
                value={firstName}
                errorText={validation.firstName}
                error={validation.firstName !== ""}
                onChange={(e) => setFirstName(e.target.value)}
                InputIcon={
                  <Person sx={{ color: theme.palette.black, mr: "12px" }} />
                }
              ></TextInput>
              <TextInput
                placeholder="Last Name"
                errorText={validation.lastName}
                error={validation.lastName !== ""}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></TextInput>
            </Box>
          )}
          {isRegister && (
            <TextInput
              placeholder="Phone Number"
              value={phoneNo}
              errorText={validation.phoneNo}
              error={validation.phoneNo !== ""}
              onChange={(e) => onPhoneNumberChange(e.target.value)}
              sx={{ mb: "8px" }}
              InputIcon={
                <Phone sx={{ color: theme.palette.black, mr: "12px" }} />
              }
            ></TextInput>
          )}
          <TextInput
            placeholder="Password"
            type="password"
            value={password}
            errorText={validation.password}
            error={validation.password !== ""}
            onChange={(e) => setPassword(e.target.value)}
            onEnter={() => onLogin()}
            sx={{ mb: "8px" }}
            InputIcon={
              <Password sx={{ color: theme.palette.black, mr: "12px" }} />
            }
          ></TextInput>
          {isRegister && (
            <TextInput
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              errorText={validation.confirmPassword}
              error={validation.confirmPassword !== ""}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{
                transition:
                  "opacity 0.15s ease-in-out, height 0.2s ease-in-out",
              }}
              InputIcon={
                <Password sx={{ color: theme.palette.black, mr: "12px" }} />
              }
            ></TextInput>
          )}
        </Box>
        <Box
          display={"flex"}
          justifyContent={"flex-end"}
          alignItems={"center"}
          gap={"12px"}
        >
          <Typography fontSize={"12px"} ml={"12px"} color={"red"}>
            {authValidation}
          </Typography>
          <Box flex={"1 1 auto"}></Box>
          <Button
            variant="contained"
            size="large"
            onClick={() => onRegister()}
            color="secondary"
          >
            Register
          </Button>
          {!isRegister && (
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={() => onLogin()}
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
