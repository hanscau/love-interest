import { Delete, Search } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import TextInput from "components/TextInput";
import { getCurrentUser } from "features/user/userSlice";
import User from "model/User";
import { useEffect, useState } from "react";
import { useAppSelector } from "reduxHooks";
import { API_URL } from "util/url";

interface UserLite {
  id: number;
  firstName: string;
  lastName: string;
  profileImageURL: string;
  phoneNumber?: string;
  created_at: string;
}

const InterestListItem = ({
  user,
  match = false,
}: {
  user: UserLite;
  match: boolean;
}) => {
  const theme = useTheme();

  return (
    <Paper sx={{ display: "flex", p: "12px", mb: "6px", borderRadius: "16px" }}>
      <Avatar src={user.profileImageURL} sx={{ mr: "12px" }}></Avatar>
      <Box>
        <Typography
          fontWeight={700}
          sx={{ color: theme.palette.secondary.dark }}
        >
          {user.firstName} {user.lastName}
        </Typography>
        <Typography fontSize={"12px"}>
          {match
            ? `Matched on ${user.created_at}`
            : `Shown Interest on ${user.created_at}`}
        </Typography>
      </Box>
      <Box flex={"1 1 auto"}></Box>
      <Box display={"flex"} alignItems={"center"} gap={"12px"}>
        {match && (
          <Typography
            sx={{ background: "#ffe6e6", p: "4px 12px", borderRadius: "6px" }}
          >
            {user.phoneNumber}
          </Typography>
        )}
        <IconButton>
          <Delete color="primary" />
        </IconButton>
      </Box>
    </Paper>
  );
};

const InterestPage = () => {
  const theme = useTheme();

  const currentUser = useAppSelector(getCurrentUser);
  const [interests, setInterests] = useState<User[]>([]);
  const [matches, setMatches] = useState<User[]>([]);

  useEffect(() => {
    if (currentUser) {
      axios
        .get(`${API_URL}/interest_relations/${currentUser.id}`, {
          headers: {
            Authorization: `Bearer ${currentUser?.jwt}`,
          },
        })
        .then((res) => {
          setInterests(res.data.no_match_users);
          setMatches(res.data.match_users);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentUser]);

  return (
    <Box>
      <Paper
        sx={{
          display: "flex",
          p: "12px",
          alignItems: "center",
          gap: "12px",
          borderRadius: "16px",
          mb: "12px",
        }}
      >
        <Avatar></Avatar>
        <Typography
          fontWeight={700}
          fontSize={"18px"}
          sx={{ color: theme.palette.secondary.dark }}
        >
          Username's interest
        </Typography>
      </Paper>
      <TextInput
        sx={{ mb: "22px" }}
        placeholder="Search"
        InputIcon={<Search sx={{ mr: "8px" }} />}
      ></TextInput>
      <Typography
        fontWeight={700}
        fontSize={"18px"}
        mb={"12px"}
        sx={{ color: theme.palette.secondary.dark }}
      >
        Matched Interest
      </Typography>
      <Box mb={"22px"}>
        {matches.map((user, i) => (
          <InterestListItem user={user} key={i} match />
        ))}
      </Box>
      <Typography
        fontWeight={700}
        fontSize={"18px"}
        mb={"12px"}
        sx={{ color: theme.palette.secondary.dark }}
      >
        Interest Shown
      </Typography>
      <Box>
        {interests.map((user, i) => (
          <InterestListItem user={user} match={false} key={i} />
        ))}
      </Box>
    </Box>
  );
};
export default InterestPage;
