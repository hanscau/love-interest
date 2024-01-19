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
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "util/url";
import Post, { ContentType, emptyPost } from "model/Post";

const PostPage = () => {
  const theme = useTheme();
  const comments = mockComments;
  const user = mockUsers;

  const { postID } = useParams<{ postID: string }>();

  const [post, setPost] = useState<Post>(emptyPost);

  useEffect(() => {
    axios.get(`${API_URL}/posts/${postID}`).then((res) => {
      console.log(res.data);
      const temp = { ...res.data, ...res.data.topic };
      setPost(temp);
    });
  }, [postID]);

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
          {post.topic} | {post.created_at}
        </Typography>
        {post.contentType === ContentType.TEXT ? (
          <Typography
            mb={"22px"}
            fontSize={"22px"}
            color={theme.palette.secondary.dark}
          >
            {post.content}
          </Typography>
        ) : (
          <Image
            sx={{ mb: "22px" }}
            src={post.contentImageURL}
            alt="postImage"
          />
        )}
        <Box display={"flex"} alignItems={"flex-end"}>
          <Box display={"flex"} alignItems={"center"}>
            <Profile
              firstName={post.firstName}
              lastName={post.lastName}
              imageURL={post.profileImageURL}
            ></Profile>
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
          {<PostInteract post={post}></PostInteract>}
        </Box>
      </Paper>
      <ReplyInput mb={"22px"}></ReplyInput>
      {comments.map((comment, i) => (
        <Box pb={"22px"}>
          <Comment comment={comment} key={i}></Comment>
          {comment.Replies.map((reply, i) => (
            <Comment comment={reply} ml={"64px"} key={i} reply></Comment>
          ))}
          <ReplyInput ml={"64px"}></ReplyInput>
        </Box>
      ))}
    </Box>
  );
};

export default PostPage;
