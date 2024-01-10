import { ThumbUp } from "@mui/icons-material";
import { Avatar, Box, Typography, useTheme } from "@mui/material";
import Post from "model/Post";
import PostInteract from "./PostInteract";

interface PostListProps {
  post: Post;
}

const PostList = ({ post }: PostListProps) => {
  const theme = useTheme();
  return (
    <Box display={"flex"} gap="16px">
      <Avatar></Avatar>
      <Box
        bgcolor={"white"}
        borderRadius={"6px"}
        p="12px"
        gap={"12px"}
        display="flex"
        flex={1}
      >
        <Box
          height={"100%"}
          bgcolor={"grey"}
          boxSizing={"border-box"}
          sx={{ aspectRatio: "1/1" }}
        >
          <img src="" alt="" />
        </Box>
        <PostInteract post={post}></PostInteract>
      </Box>
    </Box>
  );
};

export default PostList;
