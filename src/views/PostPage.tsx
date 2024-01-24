import {
  Avatar,
  Box,
  Button,
  Paper,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import HTMLImage from "components/HTMLImage";
import { Favorite } from "@mui/icons-material";
import PostInteract from "components/PostInteract";
import ReplyInput from "components/ReplyInput";
import CommentListItem from "components/CommentListItem";
import { useAppSelector } from "hooks/useRedux";
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ContentType } from "model/Post";
import { getCurrentUser } from "features/user/userSlice";
import ReplyListItem from "components/ReplyListItem";
import {
  useGetPost,
  useGetPostComments,
  usePostComment,
  usePostInterest,
  usePostReply,
} from "hooks/useAPI";

const PostPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { postID } = useParams<{ postID: string }>();

  const [userComment, setUserComment] = useState("");
  const currentUser = useAppSelector(getCurrentUser);

  const {
    data: post,
    isLoading: isPostLoading,
    error: postError,
  } = useGetPost(postID || "");

  const {
    data: comments,
    setData: setComments,
    isLoading: isCommentsLoading,
    error: commentsError,
  } = useGetPostComments(postID || "");

  const sendPostComment = usePostComment();
  const sendPostReply = usePostReply();
  const sendInterest = usePostInterest();

  const onPostComment = () => {
    if (userComment === "" || currentUser == null || postID === undefined)
      return;
    sendPostComment({
      user_id: currentUser?.id,
      post_id: parseInt(postID),
      commentText: userComment,
    })
      .then((res) => {
        res.data.comment_likes = [];
        if (comments === null) setComments([res.data]);
        else setComments([res.data, ...comments]);
        setUserComment("");
        console.log(res.data);
      })
      .catch((err) => {});
  };

  const onPostReply = (commentId: number, userReply: string) => {
    if (userReply === "" || currentUser == null || postID === undefined) return;
    sendPostReply({
      user_id: currentUser?.id,
      comment_id: commentId,
      replyText: userReply,
    })
      .then((res) => {
        res.data.reply_likes = [];
        comments &&
          setComments(
            comments.map((comment) => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  replies: [...comment.replies, res.data],
                };
              }
              return comment;
            })
          );
        console.log(res.data);
      })
      .catch((err) => {});
  };

  const onShowInterest = (recipientId: number) => {
    if (currentUser === null) return;
    sendInterest({
      sender_id: currentUser?.id,
      recipient_id: recipientId,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {});
  };

  return (
    <Box>
      <Paper sx={{ p: "22px", mb: "25px", borderRadius: "12px" }}>
        {isPostLoading ? (
          <Box mb={"22px"}>
            <Skeleton width="450px" sx={{ fontSize: "20px" }}></Skeleton>
            <Skeleton width="260px" sx={{ fontSize: "12px" }}></Skeleton>
          </Box>
        ) : (
          post && (
            <Box mb={"22px"}>
              <Typography
                fontWeight={700}
                fontSize={"20px"}
                color={theme.palette.black}
              >
                {post.title}
              </Typography>
              <Typography fontSize={"12px"} color={theme.palette.black}>
                {post.topic.topic} | {post.created_at}
              </Typography>
            </Box>
          )
        )}

        {isPostLoading ? (
          <Skeleton
            variant="rounded"
            height={"60vh"}
            sx={{ mb: "22px" }}
          ></Skeleton>
        ) : (
          post &&
          (post.contentType === ContentType.TEXT ? (
            <Typography
              mb={"22px"}
              fontSize={"22px"}
              color={theme.palette.black}
            >
              {post.content}
            </Typography>
          ) : (
            <HTMLImage
              sx={{ mb: "22px" }}
              src={post.contentImageURL}
              alt="postImage"
            />
          ))
        )}
        <Box display={"flex"} alignItems={"flex-end"}>
          <Box display={"flex"} alignItems={"center"}>
            {isPostLoading ? (
              <Box display="flex" alignItems="center" gap={"16px"}>
                <Skeleton
                  variant="circular"
                  width={"40px"}
                  height={"40px"}
                ></Skeleton>
                <Box>
                  <Skeleton width="200px" sx={{ fontSize: "20px" }}></Skeleton>
                  <Skeleton width="120px" sx={{ fontSize: "12px" }}></Skeleton>
                </Box>
              </Box>
            ) : (
              post && (
                <Box display={"flex"} alignItems={"center"}>
                  <Box
                    sx={{ mr: "16px", cursor: "pointer" }}
                    onClick={() => navigate(`/user/${post.user.id}`)}
                  >
                    <Avatar src={post.user.profileImageURL} />
                  </Box>
                  <Box mr={"22px"}>
                    <Typography
                      fontSize={"20px"}
                      fontWeight={700}
                      color={theme.palette.black}
                    >
                      {post.user.firstName} {post.user.lastName}
                    </Typography>
                    <Typography fontSize={"12px"} color={theme.palette.black}>
                      Member since {post.user.created_at}
                    </Typography>
                  </Box>
                </Box>
              )
            )}
            {currentUser && post && currentUser.id !== post.user.id && (
              <Button
                variant="contained"
                endIcon={<Favorite />}
                onClick={() => onShowInterest(post.user.id)}
                sx={{
                  background: theme.palette.primaryGradient,
                }}
              >
                Show Interest
              </Button>
            )}
          </Box>
          <Box sx={{ flex: "1 1 auto" }}></Box>
          {post && !isPostLoading && <PostInteract post={post}></PostInteract>}
        </Box>
      </Paper>
      {currentUser && (
        <ReplyInput
          mb={"22px"}
          value={userComment}
          user={currentUser}
          onChange={(e) => setUserComment(e.target.value)}
          onEnter={() => onPostComment()}
          submit={() => onPostComment()}
        ></ReplyInput>
      )}
      {comments &&
        comments.map((comment, i) => (
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
