import { Box, Grid, Typography } from "@mui/material";
import Topic from "model/Topic";
import { theme } from "util/theme";

const TopicListItem = ({
  topic,
  onClick,
}: {
  topic: Topic;
  onClick: () => void;
}) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Box
        onClick={onClick}
        sx={{
          background: `url('${topic.topicImageURL}')`,
          backgroundSize: "cover",
          height: "120px",
          borderRadius: "6px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          position: "relative",
          cursor: "pointer",
          boxShadow: theme.shadows[1],
          transition: "all 0.2s ease-in-out",
          "&:hover": { transform: "scale(1.05)", boxShadow: theme.shadows[6] },
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
            position: "absolute",
            background:
              "linear-gradient(185deg, rgba(109.44, 109.44, 109.44, 0) 0%, rgba(40.25, 40.36, 40.35, 0.50) 100%)",
            borderRadius: "6px",
          }}
        ></Box>
        <Box
          display={"flex"}
          alignItems={"flex-end"}
          gap={"8px"}
          m="8px 12px"
          zIndex={5}
        >
          <Typography fontSize={"20px"} color={"white"} fontWeight={700}>
            {topic.topic}
          </Typography>
          <Typography fontSize={"12px"} color={"white"} mb="2px">
            {topic.topicPosts} Posts
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default TopicListItem;
