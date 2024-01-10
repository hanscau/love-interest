import { ThumbUp } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import Post from "model/Post";
import Tag from "./Tag";

interface PostInteractProps {
  post: Post;
}

const PostInteract = ({ post }: PostInteractProps) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography fontWeight={700} sx={{ color: theme.palette.secondary.dark }}>
        {post.Title}
      </Typography>
      <Typography
        fontSize={"12px"}
        mb={"10px"}
        sx={{ color: theme.palette.secondary.dark }}
      >
        {post.TopicID} / {post.DateCreated.toDateString()}
      </Typography>
      <Box display={"flex"} alignItems={"center"}>
        <ThumbUp
          sx={{
            color: theme.palette.primary.main,
            fontSize: "18px",
            mr: "6px",
          }}
        ></ThumbUp>
        <Typography
          fontSize="14px"
          mb={"-2px"}
          mr={"8px"}
          sx={{ color: theme.palette.primary.main }}
        >
          {post.LikeCount}
        </Typography>
        <Box display={"flex"}>
          {post.Tags.map((tag) => (
            <Tag tag={tag}></Tag>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PostInteract;
