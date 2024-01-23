import {
  Avatar,
  Box,
  Button,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import HTMLImage from "components/HTMLImage";
import { Favorite } from "@mui/icons-material";
import PostInteract from "components/PostInteract";
import ReplyInput from "components/ReplyInput";
import CommentListItem from "components/CommentListItem";
import Comment from "model/Comment";
import { useAppSelector } from "reduxHooks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "util/url";
import Post, { ContentType, emptyPost } from "model/Post";
import { getCurrentUser } from "features/user/userSlice";
import ReplyListItem from "components/ReplyListItem";

const PostPage = () => {
  const theme = useTheme();

  const { postID } = useParams<{ postID: string }>();

  const [post, setPost] = useState<Post>(emptyPost);
  const [comments, setComments] = useState<Comment[]>([]);
  const [userComment, setUserComment] = useState("");

  const currentUser = useAppSelector(getCurrentUser);

  useEffect(() => {
    axios.get(`${API_URL}/posts/${postID}`).then((res) => {
      console.log(res.data);
      const temp = { ...res.data, ...res.data.topic };
      setPost(temp);
    });
    axios
      .get(`${API_URL}/comments/${postID}`)
      .then((res) => {
        console.log(res.data);
        setComments(res.data);
      })
      .catch((err) => {});
  }, [postID]);

  const onPostComment = () => {
    if (userComment === "" && !currentUser) return;
    axios
      .post(
        `${API_URL}/comments`,
        {
          user_id: currentUser?.id,
          post_id: postID,
          commentText: userComment,
        },
        { headers: { Authorization: `Bearer ${currentUser?.jwt}` } }
      )
      .then((res) => {
        res.data.comment_likes = [];
        setComments([...comments, res.data]);
        setUserComment("");
        console.log(res.data);
      })
      .catch((err) => {});
  };

  const onPostReply = (commentId: number, userReply: string) => {
    if (userReply === "" && !currentUser) return;
    axios
      .post(
        `${API_URL}/replies`,
        {
          user_id: currentUser?.id,
          comment_id: commentId,
          replyText: userReply,
        },
        { headers: { Authorization: `Bearer ${currentUser?.jwt}` } }
      )
      .then((res) => {
        res.data.reply_likes = [];
        setComments(
          comments.map((comment) => {
            if (comment.id === commentId) {
              return { ...comment, replies: [...comment.replies, res.data] };
            }
            return comment;
          })
        );
        console.log(res.data);
      })
      .catch((err) => {});
  };

  const onShowInterest = (recipientId: number) => {
    axios
      .post(
        `${API_URL}/interest_relations`,
        {
          sender_id: currentUser?.id,
          recipient_id: recipientId,
        },
        { headers: { Authorization: `Bearer ${currentUser?.jwt}` } }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {});
  };

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
          {post.topic.topic} | {post.created_at}
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
          <HTMLImage
            sx={{ mb: "22px" }}
            src={post.contentImageURL}
            alt="postImage"
          />
        )}
        <Box display={"flex"} alignItems={"flex-end"}>
          <Box display={"flex"} alignItems={"center"}>
            <Box display={"flex"} alignItems={"center"}>
              <Avatar sx={{ mr: "16px" }} src={post.user.profileImageURL} />
              <Box mr={"22px"}>
                <Typography
                  fontSize={"20px"}
                  fontWeight={700}
                  color={theme.palette.secondary.dark}
                >
                  {post.user.firstName} {post.user.lastName}
                </Typography>
              </Box>
            </Box>
            {currentUser && currentUser.id !== post.user.id && (
              <Button
                variant="contained"
                endIcon={<Favorite />}
                onClick={() => onShowInterest(post.user.id)}
                sx={{
                  background: theme.palette.primary.light,
                }}
              >
                Show Interest
              </Button>
            )}
          </Box>
          <Box sx={{ flex: "1 1 auto" }}></Box>
          {<PostInteract post={post}></PostInteract>}
        </Box>
      </Paper>
      {currentUser && (
        <ReplyInput
          mb={"22px"}
          value={userComment}
          user={currentUser}
          onChange={(e) => setUserComment(e.target.value)}
          submit={() => onPostComment()}
        ></ReplyInput>
      )}
      {comments.map((comment, i) => (
        <Box mb={"16px"} key={i}>
          <CommentListItem
            comment={comment}
            onReply={(replyText) => onPostReply(comment.id, replyText)}
          >
            {comment.replies.map((reply, i) => (
              <ReplyListItem
                reply={reply}
                ml={"64px"}
                mt={"16px"}
                key={i}
              ></ReplyListItem>
            ))}
          </CommentListItem>
        </Box>
      ))}
    </Box>
  );
};

export default PostPage;
