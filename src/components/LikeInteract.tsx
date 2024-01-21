import { ThumbUp, ThumbUpAltOutlined } from "@mui/icons-material";
import { Box, BoxProps, IconButton, Typography, useTheme } from "@mui/material";
import axios from "axios";
import { getCurrentUser } from "features/user/userSlice";
import { useEffect, useState } from "react";
import { useAppSelector } from "reduxHooks";
import { API_URL } from "util/url";

export enum ContentType {
  POST = 0,
  COMMENT = 1,
  REPLY = 2,
}

export interface LikeReference {
  id: number;
  user_id: number;
  post_id?: number;
  comment_id?: number;
  reply_id?: number;
}
interface LikeInteractProp extends BoxProps {
  like: LikeReference[];
  contentId: number;
  contentType: ContentType;
  fontSize: string;
  iconSize: string;
}

const LikeInteract = ({
  like,
  contentId,
  contentType,
  fontSize,
  iconSize,
  ...rest
}: LikeInteractProp) => {
  const theme = useTheme();
  const currentUser = useAppSelector(getCurrentUser);

  const [currentLike, setCurrentLike] = useState<LikeReference | null>(null);
  const [likeCount, setLikeCount] = useState(like.length);

  const likesURL = ["post_likes", "comment_likes", "reply_likes"];
  const likesIdName = ["post_id", "comment_id", "reply_id"];

  useEffect(() => {
    setLikeCount(like.length);
    like.forEach((like) => {
      if (like.user_id === currentUser?.id) {
        setCurrentLike(like);
      }
    });
  }, [like, currentUser]);

  const onLike = () => {
    if (!currentUser) return;

    const likesObject: any = { user_id: currentUser?.id };
    likesObject[likesIdName[contentType]] = contentId;

    axios
      .post(`${API_URL}/${likesURL[contentType]}`, likesObject, {
        headers: { Authorization: `Bearer ${currentUser?.jwt}` },
      })
      .then((res) => {
        console.log(`Successfully liked ${contentType} ${contentId}`);
        setLikeCount(likeCount + 1);
        setCurrentLike(res.data);
      })
      .catch((err) => {});
  };

  const onDislike = () => {
    if (!currentUser || !currentLike) return;

    axios
      .delete(`${API_URL}/${likesURL[contentType]}/${currentLike.id}`, {
        headers: { Authorization: `Bearer ${currentUser?.jwt}` },
      })
      .then((res) => {
        console.log(`Successfully disliked ${contentType} ${contentId}`);
        setLikeCount(likeCount - 1);
        setCurrentLike(null);
      })
      .catch((err) => {});
  };

  return (
    <Box display={"flex"} alignItems={"center"} {...rest}>
      {currentLike ? (
        <IconButton onClick={() => onDislike()}>
          <ThumbUp
            sx={{
              color: theme.palette.primary.main,
              fontSize: iconSize,
            }}
          ></ThumbUp>
        </IconButton>
      ) : (
        <IconButton onClick={() => onLike()}>
          <ThumbUpAltOutlined
            sx={{
              color: theme.palette.primary.main,
              fontSize: iconSize,
            }}
          ></ThumbUpAltOutlined>
        </IconButton>
      )}
      <Typography
        fontSize={fontSize}
        mb={"-2px"}
        mr={"8px"}
        sx={{ color: theme.palette.primary.main }}
      >
        {likeCount}
      </Typography>
    </Box>
  );
};

export default LikeInteract;
