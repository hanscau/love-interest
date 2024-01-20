import {
  Avatar,
  Box,
  BoxProps,
  Button,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import LikeInteract from "./LikeInteract";
import { useState } from "react";
import ReplyInput from "./ReplyInput";
import { useAppSelector } from "reduxHooks";
import { getCurrentUser } from "features/user/userSlice";
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
            color={theme.palette.secondary.dark}
            fontWeight={700}
            fontSize={"16px"}
            mr={"8px"}
          >
            {reply.user.firstName} {reply.user.lastName}
          </Typography>
          <Typography
            color={theme.palette.secondary.dark}
            fontSize={"10px"}
            mb={"3px"}
          >
            {reply.created_at}
          </Typography>
        </Box>
        <Paper sx={{ p: "12px 16px", borderRadius: "16px" }}>
          <Typography mb={"10px"} fontSize={"16px"}>
            {reply.replyText}
          </Typography>
          <Box display={"flex"} alignItems={"center"} gap={"8px"}>
            <LikeInteract
              fontSize="12px"
              iconSize="14px"
              like={100}
              mb={"2px"}
            ></LikeInteract>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default ReplyListItem;
