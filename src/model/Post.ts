export default interface Post {
  id: number;
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

export const emptyPost: Post = {
  id: 0,
  userID: 0,
  topicID: 0,
  title: "",
  topic: "",
  tags: "",
  content: "",
  contentType: ContentType.TEXT,
  contentImageURL: "",
  profileImageURL: "",
  postLikes: 0,
  created_at: "",
};
