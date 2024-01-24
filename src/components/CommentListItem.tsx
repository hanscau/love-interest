import {
  Avatar,
  Box,
  BoxProps,
  Button,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import Comment from "model/Comment";
import LikeInteract, { ContentType } from "./LikeInteract";
import { useState } from "react";
import ReplyInput from "./ReplyInput";
import { useAppSelector } from "hooks/useRedux";
import { getCurrentUser } from "features/user/userSlice";
import { useNavigate } from "react-router-dom";

export interface CommentProps extends BoxProps {
  comment: Comment;
  children?: React.ReactNode;
  onReply?: (replyText: string) => void;
}

const CommentListItem = (props: CommentProps) => {
  const { onReply, comment, children, ...rest } = props;
  const theme = useTheme();
  const navigate = useNavigate();
  const currentUser = useAppSelector(getCurrentUser);

  const [showReply, setShowReply] = useState<boolean>(false);
  const [userReply, setUserReply] = useState<string>("");

  const submitReply = () => {
    if (onReply && userReply !== "") {
      onReply(userReply);
      setUserReply("");
    }
  };

  return (
    <Box>
      <Box display={"flex"} gap={"16px"} alignItems={"flex-start"} {...rest}>
        <Box
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(`/user/${comment.user.id}`)}
        >
          <Avatar src={comment.user.profileImageURL} />
        </Box>
        <Box>
          <Box display={"flex"} alignItems={"flex-end"} mb={"8px"}>
            <Typography
              color={theme.palette.black}
              fontWeight={700}
              fontSize={"16px"}
              mr={"8px"}
            >
              {comment.user.firstName} {comment.user.lastName}
            </Typography>
            <Typography
              color={theme.palette.black}
              fontSize={"10px"}
              mb={"3px"}
            >
              {comment.created_at}
            </Typography>
          </Box>
          <Paper sx={{ p: "12px 16px 8px 8px", borderRadius: "16px" }}>
            <Typography mb={"10px"} ml={"8px"} fontSize={"16px"}>
              {comment.commentText}
            </Typography>
            <Box display={"flex"} alignItems={"center"}>
              <LikeInteract
                fontSize="12px"
                iconSize="14px"
                contentType={ContentType.COMMENT}
                contentId={comment.id}
                like={comment.comment_likes}
                mb={"2px"}
              ></LikeInteract>
              <Button
                size="small"
                variant="text"
                sx={{
                  color: theme.palette.black,
                  fontSize: "12px",
                  borderRadius: "12px",
                }}
                onClick={() => setShowReply(!showReply)}
              >
                Reply
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
      {children}
      <ReplyInput
        ml={"64px"}
        mt={"16px"}
        user={currentUser}
        show={showReply}
        value={userReply}
        onChange={(e) => setUserReply(e.target.value)}
        onEnter={() => submitReply()}
        submit={() => submitReply()}
      />
    </Box>
  );
};

export default CommentListItem;
