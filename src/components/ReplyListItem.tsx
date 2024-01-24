import {
  Avatar,
  Box,
  BoxProps,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import LikeInteract, { ContentType } from "./LikeInteract";
import Reply from "model/Reply";

export interface ReplyListItemProps extends BoxProps {
  reply: Reply;
}

const ReplyListItem = (props: ReplyListItemProps) => {
  const { reply, ...rest } = props;
  const theme = useTheme();

  return (
    <Box display={"flex"} gap={"16px"} alignItems={"flex-start"} {...rest}>
      <Avatar src={reply.user.profileImageURL} />
      <Box>
        <Box display={"flex"} alignItems={"flex-end"} mb={"8px"}>
          <Typography
            color={theme.palette.black}
            fontWeight={700}
            fontSize={"16px"}
            mr={"8px"}
          >
            {reply.user.firstName} {reply.user.lastName}
          </Typography>
          <Typography color={theme.palette.black} fontSize={"10px"} mb={"3px"}>
            {reply.created_at}
          </Typography>
        </Box>
        <Paper sx={{ p: "12px 16px 8px 8px", borderRadius: "16px" }}>
          <Typography mb={"10px"} fontSize={"16px"} ml={"16px"}>
            {reply.replyText}
          </Typography>
          <Box display={"flex"} alignItems={"center"}>
            <LikeInteract
              fontSize="12px"
              iconSize="14px"
              contentType={ContentType.REPLY}
              contentId={reply.id}
              like={reply.reply_likes}
              mb={"2px"}
            ></LikeInteract>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default ReplyListItem;
