import { LikeReference } from "components/LikeInteract";
import User from "./User";

export default interface Reply {
  id: number;
  commentID: number;
  userID: number;
  user: User;
  replyText: string;
  reply_likes: LikeReference[];
  created_at: string;
}
