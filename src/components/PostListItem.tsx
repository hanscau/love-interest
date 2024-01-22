import { ThumbUp } from "@mui/icons-material";
import { Avatar, Box, Typography, useTheme } from "@mui/material";
import Post, { ContentType } from "model/Post";
import PostInteract from "./PostInteract";
import HTMLImage from "./HTMLImage";

interface PostListItemProps {
  post: Post;
  onClick?: () => void;
}

const PostListItem = ({ post, onClick }: PostListItemProps) => {
  const theme = useTheme();
  return (
    <Box display={"flex"} gap="16px" onClick={onClick}>
      <Avatar src={post.user.profileImageURL}></Avatar>
      <Box
        bgcolor={"white"}
        borderRadius={"6px"}
        p="12px"
        gap={"12px"}
        display="flex"
        flex={1}
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
          <Typography
            fontWeight={700}
            sx={{ color: theme.palette.secondary.dark }}
          >
            {post.title}
          </Typography>
          <Typography
            fontSize={"12px"}
            mb={"10px"}
            sx={{ color: theme.palette.secondary.dark }}
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
