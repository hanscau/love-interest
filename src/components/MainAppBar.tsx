import { Add, Loyalty } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  useTheme,
} from "@mui/material";
import Logo from "./Logo";
import { useAppSelector } from "hooks/useRedux";
import { getCurrentUser } from "features/user/userSlice";
import { useNavigate } from "react-router-dom";

interface MainAppBarProps {
  openLoginModal: () => void;
}

const MainAppBar = ({ openLoginModal }: MainAppBarProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const currentUser = useAppSelector(getCurrentUser);

  const onCreatePostClick = () => {
    if (currentUser === null) {
      openLoginModal();
    } else {
      navigate("/post/create");
    }
  };

  const onInterestClick = () => {
    if (currentUser === null) {
      openLoginModal();
    } else {
      navigate("/interest");
    }
  };

  const onProfileClick = () => {
    if (currentUser === null) {
      openLoginModal();
    } else {
      navigate(`/user/${currentUser.id}`);
    }
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ boxShadow: "none", p: "8px 0px" }}
    >
      <Toolbar disableGutters>
        <Logo onClick={() => navigate("/")}></Logo>
        <Box flex="1 1"></Box>
        <Box display={"flex"} gap={"8px"} alignItems={"center"}>
          <Tooltip title="Create Post">
            <Button
              variant="contained"
              endIcon={<Add />}
              onClick={() => onCreatePostClick()}
              color="secondary"
            >
              Share
            </Button>
          </Tooltip>
          <Tooltip title="My Interest">
            <IconButton onClick={() => onInterestClick()}>
              <Loyalty fontSize="large" color="secondary"></Loyalty>
            </IconButton>
          </Tooltip>
          <Tooltip title="My Profile">
            <IconButton onClick={() => onProfileClick()}>
              <Avatar src={currentUser?.profileImageURL}></Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
