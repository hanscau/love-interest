import { Favorite, Search } from "@mui/icons-material";
import { Box, Button, Paper, Typography, useTheme } from "@mui/material";
import axios from "axios";
import PostListItem from "components/PostListItem";
import PostFilter from "components/PostsFilter";
import Profile from "components/Profile";
import TextInput from "components/TextInput";
import { selectAllPosts } from "features/posts/postsSlice";
import { getCurrentUser, logout } from "features/user/userSlice";
import User, { emptyUser, mockUsers } from "model/User";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "reduxHooks";
import { API_URL } from "util/url";

const UserPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { userID } = useParams<{ userID: string }>();
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);
  const currentUser = useAppSelector(getCurrentUser);

  const [navigatedUser, setNavigatedUser] = useState<User>(emptyUser);
  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);

  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/users/${userID}`)
      .then((res) => {
        const navUser = res.data.data;
        setNavigatedUser(navUser);
        if (currentUser && navUser.id === currentUser.id) {
          setIsCurrentUser(true);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
  }, [userID, currentUser]);

  return (
    <Box>
      <Paper sx={{ p: "22px", borderRadius: "16px", mb: "22px" }}>
        <Box display={"flex"} alignItems={"center"}>
          <Profile
            firstName={navigatedUser?.firstName}
            lastName={navigatedUser?.lastName}
            imageURL={navigatedUser?.profileImageURL}
          ></Profile>
          <Box sx={{ flex: "1 1 auto" }}></Box>
          {isCurrentUser ? (
            <Button
              onClick={() => onLogout()}
              sx={{ color: theme.palette.secondary.dark }}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="contained"
              endIcon={<Favorite />}
              sx={{ background: theme.palette.primary.light }}
            >
              Show Interest
            </Button>
          )}
        </Box>
        {navigatedUser?.bio && (
          <Typography mt={"16px"}>{navigatedUser.bio}</Typography>
        )}
      </Paper>
      <Box display={"flex"} gap={"12px"} mb={"22px"}>
        <TextInput
          placeholder="Search"
          sx={{ flex: "1" }}
          InputIcon={
            <Search sx={{ color: theme.palette.secondary.dark, mr: "12px" }} />
          }
        ></TextInput>
        <PostFilter />
      </Box>
      <Box display="flex" flexDirection="column" gap="4px" mt={"16px"}>
        {posts.map((post, i) => (
          <PostListItem post={post} key={i}></PostListItem>
        ))}
      </Box>
    </Box>
  );
};

export default UserPage;
