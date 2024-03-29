import Post, { ContentType } from "model/Post";
import Topic from "model/Topic";
import User from "model/User";
import { useState } from "react";

export const useSearch = () => {
  const [search, setSearch] = useState("");

  const filterPost = (post: Post) => {
    if (search === "") return true;
    if (post.title.toLowerCase().includes(search.toLowerCase())) return true;
    if (post.topic.topic.toLowerCase().includes(search.toLowerCase()))
      return true;
    if (post.contentType === ContentType.TEXT) {
      if (post.content.toLowerCase().includes(search.toLowerCase()))
        return true;
    }
    return false;
  };

  const filterTopic = (topic: Topic) => {
    if (search === "") return true;
    if (topic.topic.toLowerCase().includes(search.toLowerCase())) return true;
    return false;
  };

  const filterUser = (user: User) => {
    if (search === "") return true;
    if (user.firstName.toLowerCase().includes(search.toLowerCase()))
      return true;
    if (user.lastName.toLowerCase().includes(search.toLowerCase())) return true;
    return false;
  };

  return { search, setSearch, filterPost, filterTopic, filterUser };
};
