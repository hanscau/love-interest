import {
  Avatar,
  Box,
  Button,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "components/Image";
import { Favorite } from "@mui/icons-material";
import PostInteract from "components/PostInteract";
import ReplyInput from "components/ReplyInput";
import Comment from "components/Comment";
import { mockComments } from "model/Comment";
import Profile from "components/Profile";
import { mockUsers } from "model/User";
import { useAppSelector } from "reduxHooks";
import { selectAllPosts } from "features/posts/postsSlice";

const Post = () => {
  const theme = useTheme();
  const post = useAppSelector(selectAllPosts)[0];
  const comments = mockComments;
  const user = mockUsers;

  return (
    <Box>
      <Paper sx={{ p: "22px", mb: "25px" }}>
        <Typography
          fontWeight={700}
          fontSize={"20px"}
          color={theme.palette.secondary.dark}
        >
          {post.title}
        </Typography>
        <Typography
          mb={"22px"}
          fontSize={"12px"}
          color={theme.palette.secondary.dark}
        >
          {post.topicID} | {post.created_at}
        </Typography>
        <Image
          sx={{ mb: "22px" }}
          src="https://picsum.photos/id/20/1080/600"
          alt="postImage"
        />
        <Box display={"flex"} alignItems={"flex-end"}>
          <Box display={"flex"} alignItems={"center"}>
            <Profile user={user}></Profile>
            <Button
              variant="contained"
              endIcon={<Favorite />}
              sx={{
                background: theme.palette.primary.light,
              }}
            >
              Show Interest
            </Button>
          </Box>
          <Box sx={{ flex: "1 1 auto" }}></Box>
          <PostInteract post={post}></PostInteract>
        </Box>
      </Paper>
      <ReplyInput mb={"22px"}></ReplyInput>
      {comments.map((comment) => (
        <Box pb={"22px"}>
          <Comment comment={comment}></Comment>
          {comment.Replies.map((reply) => (
            <Comment comment={reply} ml={"64px"} reply></Comment>
          ))}
          <ReplyInput ml={"64px"}></ReplyInput>
        </Box>
      ))}
    </Box>
  );
};

export default Post;
