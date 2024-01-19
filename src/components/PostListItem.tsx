import { ThumbUp } from "@mui/icons-material";
import { Avatar, Box, Typography, useTheme } from "@mui/material";
import Post from "model/Post";
import PostInteract from "./PostInteract";
import Image from "./Image";

interface PostListItemProps {
  post: Post;
}

const PostListItem = ({ post }: PostListItemProps) => {
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
        <Image
          src={post.contentImageURL}
          alt=""
          boxSizing={"border-box"}
          bgcolor={"grey"}
          height={"100%"}
          sx={{
            aspectRatio: "1/1",
          }}
        ></Image>
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
            {post.topicID} / {post.created_at}
          </Typography>
          <PostInteract post={post}></PostInteract>
        </Box>
      </Box>
    </Box>
  );
};

export default PostListItem;
