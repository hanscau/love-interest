import { LikeReference } from "components/LikeInteract";
import Reply from "./Reply";
import User from "./User";

export default interface Comment {
  id: number;
  postID: number;
  userID: number;
  user: User;
  commentText: string;
  comment_likes: LikeReference[];
  replies: Reply[];
  created_at: string;
}
