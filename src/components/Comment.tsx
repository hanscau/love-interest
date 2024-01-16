import {
  Avatar,
  Box,
  BoxProps,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import Comments from "model/Comment";
import LikeInteract from "./LikeInteract";

export interface CommentProps extends BoxProps {
  comment: Comments;
  children?: React.ReactNode;
  reply?: boolean;
}

const Comment = (props: CommentProps) => {
  const { reply, comment, children, ...rest } = props;
  const theme = useTheme();

  return (
    <Box
      display={"flex"}
      gap={"16px"}
      alignItems={"flex-start"}
      mb={"16px"}
      {...rest}
    >
      <Avatar />
      <Box>
        <Box display={"flex"} alignItems={"flex-end"} mb={"8px"}>
          <Typography
            color={theme.palette.secondary.dark}
            fontWeight={700}
            fontSize={"16px"}
            mr={"8px"}
          >
            {comment.UserID}
          </Typography>
          <Typography
            color={theme.palette.secondary.dark}
            fontSize={"10px"}
            mb={"3px"}
          >
            2s ago
          </Typography>
        </Box>
        <Paper sx={{ p: "12px 16px", borderRadius: "16px" }}>
          <Typography mb={"10px"} fontSize={"16px"}>
            {comment.Comment}
          </Typography>
          <Box display={"flex"} alignItems={"center"} gap={"8px"}>
            <LikeInteract
              fontSize="12px"
              iconSize="14px"
              like={100}
              mb={"2px"}
            ></LikeInteract>
            {!reply && (
              <Typography
                fontSize={"12px"}
                color={theme.palette.secondary.dark}
              >
                Reply
              </Typography>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Comment;
