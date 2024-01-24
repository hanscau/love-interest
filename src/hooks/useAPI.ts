import axios, { AxiosRequestConfig } from "axios";
import Post from "model/Post";
import { useEffect, useState } from "react";
import { useAppSelector } from "./useRedux";
import { getCurrentUser } from "features/user/userSlice";
import { API_URL } from "util/url";
import Topic from "model/Topic";
import Comment from "model/Comment";
import User from "model/User";

interface API_Data<T> {
  data: T | null;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
  isLoading: boolean;
  error: any;
}

const API_JOINER = (...path: string[]) => {
  return `${API_URL}/${path.join("/")}`;
};

const useGetAPI = <T>(url: string, withLogin: boolean = false) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentUser = useAppSelector(getCurrentUser);

  const request = (headers: AxiosRequestConfig) => {
    setIsLoading(true);
    axios
      .get(url, headers)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const headers =
      withLogin && currentUser
        ? { Authorization: `Bearer ${currentUser.jwt}` }
        : {};
    request({ headers });
  }, [currentUser]);

  return { data, setData, isLoading, error };
};

const usePostAPI = <T>(url: string) => {
  const currentUser = useAppSelector(getCurrentUser);
  const postRequest = (payload: T) => {
    return axios.post(url, payload, {
      headers: { Authorization: `Bearer ${currentUser?.jwt}` },
    });
  };
  return postRequest;
};

export const useGetUser = (userId: string) => {
  return useGetAPI<User>(API_JOINER("users", userId));
};

export const useGetTopic = (topicId: string) => {
  return useGetAPI<Topic>(API_JOINER("topics", topicId));
};

export const useGetAllPosts = () => {
  return useGetAPI<Post[]>(API_JOINER("posts"));
};

export const useGetAllTopics = () => {
  return useGetAPI<Topic[]>(API_JOINER("topics"));
};

export const useGetTopicPosts = (topicId: string) => {
  return useGetAPI<Post[]>(API_JOINER("posts", "topic", topicId));
};

export const useGetUserPosts = (userId: string) => {
  return useGetAPI<Post[]>(API_JOINER("posts", "user", userId));
};

export const useGetPost = (postId: string) => {
  return useGetAPI<Post>(API_JOINER("posts", postId));
};

export const useGetPostComments = (postId: string) => {
  return useGetAPI<Comment[]>(API_JOINER("comments", postId));
};

export const usePostComment = () => {
  return usePostAPI<{
    user_id: number;
    post_id: number;
    commentText: string;
  }>(API_JOINER("comments"));
};

export const usePostReply = () => {
  return usePostAPI<{
    user_id: number;
    comment_id: number;
    replyText: string;
  }>(API_JOINER("replies"));
};

export const usePostInterest = () => {
  return usePostAPI<{
    sender_id: number;
    recipient_id: number;
  }>(API_JOINER("interest_relations"));
};
