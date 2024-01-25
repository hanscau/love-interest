import { Avatar, Box, Button, Typography, useTheme } from "@mui/material";
import axios from "axios";
import ImageInput from "components/ImageInput";
import ParagraphInput from "components/ParagraphInput";
import Tag from "components/Tag";
import TextInput from "components/TextInput";
import { getCurrentUser } from "features/user/userSlice";
import { ContentType } from "model/Post";
import Topic, { TopicOption } from "model/Topic";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "hooks/useRedux";
import { API_URL } from "util/url";
import AppAutocomplete from "components/AppAutocomplete";
import { useDeletePost, useGetPost } from "hooks/useAPI";

const EditPost = () => {
  const theme = useTheme();
  const { postID } = useParams<{ postID: string }>();
  const navigate = useNavigate();

  const user = useAppSelector(getCurrentUser);
  const deletePost = useDeletePost();

  const emptyValidation = { title: "", topic: "", content: "" };

  const { data: post, isLoading: isPostLoading } = useGetPost(postID || "");

  const [contentType, setContentType] = useState(ContentType.TEXT);
  const [validation, setValidation] = useState(emptyValidation);
  const [title, setTitle] = useState("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [topic, setTopic] = useState<TopicOption | null>(null);
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [src, setSrc] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const deleteTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log(file);
    setImage(file);
  };

  const onDelete = () => {
    deletePost(post?.id.toString() || "")
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {});
  };

  const onUpdate = async () => {
    if (user === null) return;
    const error = { ...emptyValidation };

    if (title === "") error.title = "Title is required";
    if (topic === null) error.topic = "Topic is required";
    if (contentType === ContentType.TEXT) {
      if (content === "") error.content = "Content is required";
    } else {
      if (image === null) error.content = "Image is required";
    }

    setValidation(error);
    if (error.title !== "" || error.topic !== "" || error.content !== "") {
      return;
    }

    const formData = new FormData();
    formData.append("user_id", user?.id.toString());
    formData.append("topic_id", topic?.id.toString() || "");
    formData.append("title", title);
    formData.append("content", content);
    formData.append("contentType", contentType.toString());
    formData.append("tags", tags.join("#"));
    if (image?.name !== "empty_file") {
      image && formData.append("image", image as Blob, image?.name);
    }

    console.log(formData);

    axios
      .put(`${API_URL}/posts/${post?.id}`, formData, {
        headers: {
          Authorization: `Bearer ${user?.jwt}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate(`/post/${res.data.id}`);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    setContentType(post?.contentType || ContentType.TEXT);
    setTitle(post?.title || "");
    setTopic(post?.topic || null);
    setContent(post?.content || "");
    setImage(post?.contentImageURL ? new File([], "empty_file") : null);
    setSrc(post?.contentImageURL || "");
    setTags(post?.tags.split("#") || []);
  }, [post]);

  return (
    <Box>
      <Typography
        fontSize={"22px"}
        color={theme.palette.black}
        fontWeight={700}
        mb={"22px"}
      >
        Create a Post
      </Typography>
      <Box display={"flex"} gap={"12px"}>
        <Avatar></Avatar>

        <Box
          display={"flex"}
          flexDirection={"column"}
          flex={"1 1 auto"}
          gap={"12px"}
        >
          <TextInput
            placeholder="Post Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={validation.title !== ""}
            errorText={validation.title}
            sx={{ flex: "1 1 auto" }}
          ></TextInput>
          <Box mb={"18px"}>
            <AppAutocomplete
              value={topic}
              options={topics}
              onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                  setTopic({
                    topic: newValue,
                    id: -1,
                  });
                } else if (newValue && newValue.topic) {
                  if (newValue.id === -1) {
                    const newTopic = newValue.topic.split('"')[1];
                    setTopic({
                      topic: newTopic,
                      id: newValue.id,
                    });
                  } else {
                    setTopic({
                      topic: newValue.topic,
                      id: newValue.id,
                    });
                  }
                } else {
                  setTopic(newValue);
                }
              }}
            ></AppAutocomplete>
            {validation.topic !== "" && (
              <Typography
                fontSize={"12px"}
                ml={"12px"}
                mt={"4px"}
                color={"red"}
              >
                {validation.topic}
              </Typography>
            )}
          </Box>
          <Box>
            <Box display={"flex"} gap={"2px"}>
              <Box
                p={"12px 32px"}
                bgcolor={
                  contentType === ContentType.TEXT ? "white" : "grey.200"
                }
                borderRadius={"12px 12px 0px 0px"}
                sx={{ cursor: "pointer" }}
                onClick={() => setContentType(ContentType.TEXT)}
              >
                <Typography>Text</Typography>
              </Box>
              <Box
                p={"12px 32px"}
                bgcolor={
                  contentType === ContentType.IMAGE ? "white" : "grey.200"
                }
                borderRadius={"12px 12px 0px 0px"}
                sx={{ cursor: "pointer" }}
                onClick={() => setContentType(ContentType.IMAGE)}
              >
                <Typography>Image</Typography>
              </Box>
            </Box>
            {contentType === ContentType.TEXT ? (
              <ParagraphInput
                placeholder="Share something"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                sx={{ borderRadius: "0px 16px 16px 16px" }}
              />
            ) : (
              <ImageInput
                deleteImage={() => {
                  setSrc("");
                  setImage(null);
                }}
                value={image}
                src={src === "" ? "" : src}
                onChange={onUploadImage}
                sx={{ borderRadius: "0px 16px 16px 16px" }}
              />
            )}
            {validation.content !== "" && (
              <Typography
                fontSize={"12px"}
                ml={"12px"}
                mt={"4px"}
                color={"red"}
              >
                {validation.content}
              </Typography>
            )}
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems={"flex-start"}
            >
              <TextInput
                placeholder="Tags"
                sx={{ width: "300px", mb: "12px" }}
                value={tag}
                onEnter={() => {
                  tag && setTags([...tags, tag]);
                  setTag("");
                }}
                onChange={(e) => setTag(e.target.value)}
              ></TextInput>
              <Box
                display={"flex"}
                minHeight={"26px"}
                width={"300px"}
                sx={{ scrollBehavior: "auto", overflow: "auto" }}
              >
                {tags.map((tag, i) => (
                  <Tag
                    tag={tag}
                    key={i}
                    onDelete={() => deleteTag(tag)}
                    deletable
                  ></Tag>
                ))}
              </Box>
            </Box>
            <Box>
              <Button
                variant="contained"
                size="large"
                onClick={() => onDelete()}
                type="button"
                color="secondary"
                sx={{ mr: "12px" }}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={() => onUpdate()}
                type="button"
                sx={{ background: theme.palette.primaryGradient }}
              >
                Update
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EditPost;
