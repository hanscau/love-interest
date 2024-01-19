import { Add, Loyalty } from "@mui/icons-material";
import { AppBar, Avatar, Box, Button, Toolbar, useTheme } from "@mui/material";
import Logo from "./Logo";
import { useAppSelector } from "reduxHooks";
import { getCurrentUser } from "features/user/userSlice";
import { useNavigate } from "react-router-dom";

interface MainAppBarProps {
  openLoginModal: () => void;
}

const MainAppBar = ({ openLoginModal }: MainAppBarProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const user = useAppSelector(getCurrentUser);

  const onProfileClick = () => {
    if (user === null) {
      openLoginModal();
    } else {
      navigate(`/user/${user.id}`);
    }
  };

  return (
    <AppBar position="static" color="transparent" sx={{ boxShadow: "none" }}>
      <Toolbar disableGutters>
        <Logo onClick={() => navigate("/")}></Logo>
        <Box flex="1 1"></Box>
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
          <Avatar onClick={() => onProfileClick()}></Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
