import React from "react";
import Routes from "Routes";
import { Container } from "@mui/material";
import MainAppBar from "components/MainAppBar";
import Login from "components/Login";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "reduxHooks";
import { closeModal, openModal } from "features/loginModal/loginModalSlice";

function App() {
  const isOpen = useAppSelector((state) => state.loginModal.isOpen);
  const dispatch = useAppDispatch();

  const openLoginModal = () => {
    dispatch(openModal());
  };

  const closeLoginModal = () => {
    dispatch(closeModal());
  };

  return (
    <Container maxWidth="lg" sx={{ pb: "64px" }}>
      <MainAppBar openLoginModal={openLoginModal} />
      <Routes />
      <Login isOpen={isOpen} closeLoginModal={closeLoginModal} />
    </Container>
  );
}

export default App;
