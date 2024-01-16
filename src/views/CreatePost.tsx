import {
  Avatar,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import ParagraphInput from "components/ParagraphInput";
import Tag from "components/Tag";
import TextInput from "components/TextInput";
import { useState } from "react";

const CreatePost = () => {
  const theme = useTheme();
  const [postType, setPostType] = useState("Text");

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
            sx={{ flex: "1 1 auto" }}
          ></TextInput>
          <TextInput
            placeholder="Topic"
            sx={{ width: "300px", mb: "28px" }}
          ></TextInput>
          <Box>
            <Box display={"flex"} gap={"2px"}>
              <Box
                p={"12px 32px"}
                bgcolor={postType === "Text" ? "white" : "grey.200"}
                borderRadius={"12px 12px 0px 0px"}
                sx={{ cursor: "pointer" }}
                onClick={() => setPostType("Text")}
              >
                <Typography>Text</Typography>
              </Box>
              <Box
                p={"12px 32px"}
                bgcolor={postType === "Image" ? "white" : "grey.200"}
                borderRadius={"12px 12px 0px 0px"}
                sx={{ cursor: "pointer" }}
                onClick={() => setPostType("Image")}
              >
                <Typography>Image</Typography>
              </Box>
            </Box>
            {postType === "Text" ? (
              <ParagraphInput
                placeholder="Share something"
                sx={{ borderRadius: "0px 16px 16px 16px" }}
              />
            ) : (
              <Paper
                sx={{
                  height: "255px",
                  borderRadius: "0px 16px 16px 16px",
                  p: "8px 17px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  color={theme.palette.secondary.dark}
                  fontWeight={700}
                  fontSize={"28px"}
                >
                  Upload an Image
                </Typography>
              </Paper>
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
              ></TextInput>
              <Box display={"flex"}>
                <Tag tag="Tag1"></Tag>
                <Tag tag="Tag2"></Tag>
                <Tag tag="Tag3"></Tag>
              </Box>
            </Box>
            <Button
              variant="contained"
              size="large"
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
