import Topic, { emptyTopic } from "./Topic";
import User, { emptyUser } from "./User";

export default interface Post {
  id: number;
  userID: number;
  topicID: number;
  title: string;
  tags: string;
  content: string;
  contentType: ContentType;
  contentImageURL: string;
  user: User;
  topic: Topic;
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
  tags: "",
  content: "",
  contentType: ContentType.TEXT,
  contentImageURL: "",
  user: emptyUser,
  topic: emptyTopic,
  created_at: "",
};
