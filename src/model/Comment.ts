import Reply from "./Reply";
import User from "./User";

export default interface Comment {
  id: number;
  postID: number;
  userID: number;
  user: User;
  commentText: string;
  replies: Reply[];
  created_at: string;
}
