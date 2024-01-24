import axios from "axios";
import Post from "model/Post";
import { useEffect, useState } from "react";
import { useAppSelector } from "./useRedux";
import { getCurrentUser } from "features/user/userSlice";
import { API_URL } from "util/url";
import Topic from "model/Topic";

interface API_Data<T> {
  data: T | null;
  isLoading: boolean;
  error: any;
}

const API_JOINER = (...path: string[]) => {
  return `${API_URL}/${path.join("/")}`;
};

const useAPI = <T>(
  url: string,
  option: "GET" | "PUT" | "POST" | "DELETE",
  withLogin: boolean = false
) => {
  const axiosFunction = {
    GET: axios.get,
    PUT: axios.put,
    POST: axios.post,
    DELETE: axios.delete,
  };

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentUser = useAppSelector(getCurrentUser);

  const request = (header: { header: { Authorization?: string } }) => {
    setIsLoading(true);
    axiosFunction[option](url, header)
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
    const header =
      withLogin && currentUser
        ? { Authorization: `Bearer ${currentUser.jwt}` }
        : {};
    request({ header });
  }, [currentUser]);

  return { data, isLoading, error };
};

export const useAllPosts = (): API_Data<Post[]> => {
  return useAPI<Post[]>(API_JOINER("posts"), "GET");
};

export const useAllTopics = (): API_Data<Topic[]> => {
  return useAPI<Topic[]>(API_JOINER("topics"), "GET");
};
