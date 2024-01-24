import { Edit, Favorite, Search } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import PostListItem from "components/PostListItem";
import PostFilter from "components/PostsFilter";
import TextInput from "components/TextInput";
import { openLoginModal } from "features/loginModal/loginModalSlice";
import { openUpdateModal } from "features/updateModal/updateModalSlice";
import { getCurrentUser, logout } from "features/user/userSlice";
import Post from "model/Post";
import User, { emptyUser, mockUsers } from "model/User";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { API_URL } from "util/url";
import { useGetUser, useGetUserPosts } from "hooks/useAPI";
import PostListItemSkeleton from "components/skeletons/PostLitsItemSkeleton";

const UserPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { userID } = useParams<{ userID: string }>();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(getCurrentUser);

  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);

  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const onProfileUpdate = () => {
    dispatch(openUpdateModal());
  };

  const {
    data: navigatedUser,
    setData: setNavigatedUser,
    isLoading,
    error,
  } = useGetUser(userID || "");

  const {
    data: navigatedUserPosts,
    setData: setNavigatedUserPosts,
    isLoading: navigatedUserPostsLoading,
    error: postError,
  } = useGetUserPosts(userID || "");

  console.log(navigatedUser);

  useEffect(() => {
    if (currentUser && navigatedUser && navigatedUser.id === currentUser.id) {
      setIsCurrentUser(true);
    }
  }, [navigatedUser, currentUser]);

  return (
    <Box>
      <Paper sx={{ p: "22px", borderRadius: "16px", mb: "22px" }}>
        <Box display={"flex"} alignItems={"center"}>
          <Box display={"flex"} alignItems={"center"} gap={"16px"}>
            <Box position={"relative"}>
              <Avatar src={navigatedUser?.profileImageURL} />
              {isCurrentUser && (
                <Box
                  position={"absolute"}
                  top={"0px"}
                  left={"0px"}
                  width={"100%"}
                  height={"100%"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  onClick={() => onProfileUpdate()}
                  sx={{
                    background: "rgba(255, 255, 255, 0)",
                    transition: "background 0.15s ease-in-out, opacity 0.15s",
                    opacity: 0,
                    cursor: "pointer",
                    "&:hover": {
                      background: "rgba(255, 255, 255, 0.4)",
                      opacity: 1,
                    },
                  }}
                >
                  <Edit sx={{ color: theme.palette.black }} />
                </Box>
              )}
            </Box>
            <Box mr={"22px"}>
              <Typography
                fontSize={"20px"}
                fontWeight={700}
                color={theme.palette.black}
              >
                {navigatedUser?.firstName} {navigatedUser?.lastName}
              </Typography>
              <Typography fontSize={"12px"} color={theme.palette.black}>
                {navigatedUserPosts?.length} posts
              </Typography>
            </Box>
          </Box>
          <Box sx={{ flex: "1 1 auto" }}></Box>
          {currentUser &&
            (isCurrentUser ? (
              <Button
                onClick={() => onLogout()}
                sx={{ color: theme.palette.black }}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="contained"
                endIcon={<Favorite />}
                sx={{ background: theme.palette.primaryGradient }}
              >
                Show Interest
              </Button>
            ))}
        </Box>
        {navigatedUser?.bio && (
          <Typography mt={"16px"}>{navigatedUser.bio}</Typography>
        )}
      </Paper>
      <Box display={"flex"} gap={"12px"} mb={"22px"}>
        <TextInput
          placeholder="Search"
          sx={{ flex: "1" }}
          InputIcon={<Search sx={{ color: theme.palette.black, mr: "12px" }} />}
        ></TextInput>
        <PostFilter />
      </Box>
      <Box display="flex" flexDirection="column" gap="4px" mt={"16px"}>
        {navigatedUserPostsLoading
          ? [1, 2, 3].map((i) => <PostListItemSkeleton key={i} />)
          : navigatedUserPosts &&
            navigatedUserPosts.map((post, i) => (
              <PostListItem
                post={post}
                key={i}
                onClick={() => navigate(`/post/${post.id}`)}
              ></PostListItem>
            ))}
      </Box>
    </Box>
  );
};

export default UserPage;
