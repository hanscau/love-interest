export default interface Comment {
  id: number;
  postID: number;
  userID: number;
  commentText: string;
  replies: Comment[];
  created_at: Date;
}
