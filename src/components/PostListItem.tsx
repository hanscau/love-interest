import { ThumbUp } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import Post, { ContentType } from "model/Post";
import PostInteract from "./PostInteract";
import HTMLImage from "./HTMLImage";
import { useNavigate } from "react-router-dom";

interface PostListItemProps {
  post: Post;
  onClick?: () => void;
}

const PostListItem = ({ post, onClick }: PostListItemProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box display={"flex"} gap="16px">
      <Avatar
        src={post.user.profileImageURL}
        onClick={() => navigate(`/user/${post.user.id}`)}
        sx={{ cursor: "pointer" }}
      ></Avatar>
      <Box
        bgcolor={"white"}
        borderRadius={"6px"}
        p="12px"
        gap={"12px"}
        display="flex"
        flex={1}
        boxShadow={theme.shadows[1]}
        onClick={onClick}
        sx={{
          transition: "all 0.2s ease-in-out",
          cursor: "pointer",
          "&:hover": { boxShadow: theme.shadows[6] },
        }}
      >
        {post.contentType === ContentType.IMAGE && (
          <Box
            sx={{
              background: `url("${post.contentImageURL}")`,
              backgroundSize: "cover",
              aspectRatio: "1/1",
              height: "100%",
            }}
          ></Box>
        )}

        <Box alignItems={"center"}>
          <Typography fontWeight={700} sx={{ color: theme.palette.black }}>
            {post.title}
          </Typography>
          <Typography
            fontSize={"12px"}
            mb={"10px"}
            sx={{ color: theme.palette.black }}
          >
            {post.topic.topic} / {post.created_at}
          </Typography>
          <PostInteract post={post}></PostInteract>
        </Box>
      </Box>
    </Box>
  );
};

export default PostListItem;
