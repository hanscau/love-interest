import { Add, Loyalty } from "@mui/icons-material";
import { AppBar, Avatar, Box, Button, Toolbar, useTheme } from "@mui/material";
import Logo from "./Logo";

interface MainAppBarProps {
  openLoginModal: () => void;
}

const MainAppBar = ({ openLoginModal }: MainAppBarProps) => {
  const theme = useTheme();
  return (
    <AppBar position="static" color="transparent" sx={{ boxShadow: "none" }}>
      <Toolbar disableGutters>
        <Logo flex={1}></Logo>
        <Box display={"flex"} gap={"14px"} alignItems={"center"}>
          <Button
            variant="contained"
            endIcon={<Add />}
            sx={{
              background: theme.palette.secondary.light,
            }}
          >
            Share
          </Button>
          <Loyalty fontSize="large" sx={{ color: "#CCABFF" }}></Loyalty>
          <Avatar onClick={() => openLoginModal()}></Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
