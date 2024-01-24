import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import ImageInput from "components/ImageInput";
import ParagraphInput from "components/ParagraphInput";
import Tag from "components/Tag";
import TextInput from "components/TextInput";
import { getCurrentUser } from "features/user/userSlice";
import { ContentType } from "model/Post";
import Topic from "model/Topic";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "hooks/useRedux";
import { API_URL } from "util/url";

const CreatePost = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const user = useAppSelector(getCurrentUser);

  const [contentType, setContentType] = useState(ContentType.TEXT);
  const [title, setTitle] = useState("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
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

  const onSubmit = () => {
    console.log(title, topic, content, user);
    if (title === "" || topic === "" || !user) return;

    const topicExist = topics.filter((t) => t.topic === topic)[0];

    if (topicExist === undefined) {
      //TODO: create new topic
    }

    const formData = new FormData();
    formData.append("user_id", user?.id.toString());
    formData.append("topic_id", topicExist.id.toString());
    formData.append("title", title);
    formData.append("content", content);
    formData.append("contentType", contentType.toString());
    formData.append("tags", tags.join("#"));
    image && formData.append("image", image as Blob, image?.name);

    console.log(formData);

    axios
      .post(`${API_URL}/posts`, formData, {
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
    if (topics.length === 0) {
      axios
        .get(`${API_URL}/topics`)
        .then((res) => {
          console.log(res.data);
          setTopics(res.data);
        })
        .catch((err) => {});
    }
  }, [topics]);

  return (
    <Box>
      <Typography
        fontSize={"22px"}
        color={theme.palette.secondary.dark}
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
            sx={{ flex: "1 1 auto" }}
          ></TextInput>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            freeSolo
            options={topics.map((topic) => topic.topic)}
            renderInput={(params) => <TextField {...params} label="Topic" />}
            onChange={(e: ChangeEvent<{}>, value: string | null) => {
              if (value) {
                setTopic(value);
              }
            }}
            sx={{
              width: "300px",
              mb: "28px",
            }}
          ></Autocomplete>

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
                deleteImage={() => setImage(null)}
                value={image}
                onChange={onUploadImage}
                sx={{ borderRadius: "0px 16px 16px 16px" }}
              />
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
            <Button
              variant="contained"
              size="large"
              onClick={() => onSubmit()}
              type="button"
              sx={{ background: theme.palette.primary.light }}
            >
              Posts
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreatePost;
