import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import Post, { ContentType } from "model/Post";
import PostInteract from "./PostInteract";
import { useNavigate } from "react-router-dom";
import { Edit } from "@mui/icons-material";
import TimeAgo from "react-timeago";

interface PostListItemProps {
  post: Post;
  onClick: () => void;
  onEdit?: (id: number) => void;
  edittable?: boolean;
}

const PostListItem = ({
  post,
  onClick,
  onEdit,
  edittable = false,
}: PostListItemProps) => {
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
        position={"relative"}
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
            {post.topic.topic} |{" "}
            <TimeAgo date={new Date(post.created_at).getTime()} />
          </Typography>
          <PostInteract post={post}></PostInteract>
        </Box>
        {edittable && (
          <IconButton
            sx={{
              position: "absolute",
              bottom: "0",
              right: "0",
              m: "12px",
              color: theme.palette.secondary.main,
            }}
            onClick={(e) => {
              e.stopPropagation();
              onEdit && onEdit(post.id);
            }}
          >
            <Edit sx={{ fontSize: "22px" }} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default PostListItem;
