export default interface Post {
  postID: number;
  userID: number;
  topicID: number;
  title: string;
  topic: string;
  tags: string;
  content: string;
  contentType: ContentType;
  contentImageURL: string;
  profileImageURL: string;
  postLikes: number;
  created_at: string;
}

export enum ContentType {
  TEXT = 0,
  IMAGE = 1,
  VIDEO = 2,
}
