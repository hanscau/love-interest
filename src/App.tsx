import React from "react";
import Routes from "Routes";
import { Container } from "@mui/material";
import MainAppBar from "components/MainAppBar";
import Login from "components/Login";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import {
  closeLoginModal,
  openLoginModal,
} from "features/loginModal/loginModalSlice";
import UpdateProfile from "components/UpdateProfile";
import { closeUpdateModal } from "features/updateModal/updateModalSlice";

function App() {
  const isLoginOpen = useAppSelector((state) => state.loginModal.isOpen);
  const isUpdateOpen = useAppSelector((state) => state.updateModal.isOpen);
  const dispatch = useAppDispatch();

  const onOpenLoginModal = () => {
    dispatch(openLoginModal());
  };

  const onCloseLoginModal = () => {
    dispatch(closeLoginModal());
  };

  const onCloseUpdateModal = () => {
    dispatch(closeUpdateModal());
  };

  return (
    <Container maxWidth="lg" sx={{ pb: "64px" }}>
      <MainAppBar openLoginModal={onOpenLoginModal} />
      <Routes />
      <Login isOpen={isLoginOpen} closeLoginModal={onCloseLoginModal} />
      <UpdateProfile
        isOpen={isUpdateOpen}
        closeLoginModal={onCloseUpdateModal}
      />
    </Container>
  );
}

export default App;
