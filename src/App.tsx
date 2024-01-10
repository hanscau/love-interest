import React from "react";
import Routes from "Routes";
import { Container } from "@mui/material";
import MainAppBar from "components/MainAppBar";

function App() {
  return (
    <Container maxWidth="lg">
      <MainAppBar />
      <Routes />
    </Container>
  );
}

export default App;
