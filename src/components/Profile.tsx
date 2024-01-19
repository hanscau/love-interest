import { Avatar, Box, BoxProps, Typography, useTheme } from "@mui/material";
import User from "model/User";

interface ProfileProps extends BoxProps {
  firstName: string;
  lastName: string;
  imageURL: string;
}

const Profile = (props: ProfileProps) => {
  const theme = useTheme();
  const { firstName, lastName, imageURL, ...rest } = props;

  return (
    <Box display={"flex"} alignItems={"center"} {...rest}>
      <Avatar sx={{ mr: "16px" }} src={imageURL} />
      <Box mr={"22px"}>
        <Typography
          fontSize={"20px"}
          fontWeight={700}
          color={theme.palette.secondary.dark}
        >
          {firstName} {lastName}
        </Typography>
        <Typography fontSize={"12px"} color={theme.palette.secondary.dark}>
          20 posts
        </Typography>
      </Box>
    </Box>
  );
};

export default Profile;
