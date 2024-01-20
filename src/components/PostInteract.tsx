import { ThumbUp } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import Post from "model/Post";
import Tag from "./Tag";
import LikeInteract from "./LikeInteract";

interface PostInteractProps {
  post: Post;
}

const PostInteract = ({ post }: PostInteractProps) => {
  const theme = useTheme();
  return (
    <Box>
      <Box display={"flex"} alignItems={"center"}>
        <LikeInteract fontSize="14px" iconSize="16px" like={20}></LikeInteract>
        <Box display={"flex"}>
          {post.tags.split("#").map((tag, i) => (
            <Tag tag={tag} key={i}></Tag>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PostInteract;
