import User from "./User";

export default interface Reply {
  id: number;
  commentID: number;
  userID: number;
  user: User;
  replyText: string;
  created_at: string;
}
