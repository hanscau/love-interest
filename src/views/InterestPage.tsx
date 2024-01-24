import { Delete, Phone, Search } from "@mui/icons-material";
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
import { useAppSelector } from "hooks/useRedux";
import { API_URL } from "util/url";
import { useSearch } from "hooks/useSearch";

interface UserLite {
  id: number;
  firstName: string;
  lastName: string;
  profileImageURL: string;
  phoneNo?: string;
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
    <Paper
      sx={{ display: "flex", p: "12px 14px", mb: "6px", borderRadius: "16px" }}
    >
      <Avatar src={user.profileImageURL} sx={{ mr: "12px" }}></Avatar>
      <Box>
        <Typography fontWeight={700} sx={{ color: theme.palette.black }}>
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
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={"8px"}
            sx={{ background: "#ffe6e6", p: "4px 12px", borderRadius: "6px" }}
          >
            <Phone sx={{ color: theme.palette.black, fontSize: "18px" }} />
            <Typography
              sx={{
                color: theme.palette.black,
              }}
              fontWeight={700}
            >
              {user.phoneNo}
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

const InterestPage = () => {
  const theme = useTheme();

  const currentUser = useAppSelector(getCurrentUser);
  const [interests, setInterests] = useState<User[]>([]);
  const [matches, setMatches] = useState<User[]>([]);

  const { search, setSearch, filterUser } = useSearch();

  useEffect(() => {
    if (currentUser) {
      axios
        .get(`${API_URL}/interest_relations/matches/${currentUser.id}`, {
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
        <Avatar src={currentUser?.profileImageURL}></Avatar>
        <Typography
          fontWeight={700}
          fontSize={"18px"}
          sx={{ color: theme.palette.black }}
        >
          {currentUser?.firstName} {currentUser?.lastName}'s interest
        </Typography>
      </Paper>
      <TextInput
        sx={{ mb: "22px" }}
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputIcon={<Search sx={{ mr: "8px" }} />}
      ></TextInput>
      <Typography
        fontWeight={700}
        fontSize={"18px"}
        mb={"12px"}
        sx={{ color: theme.palette.black }}
      >
        Matched Interest
      </Typography>
      <Box mb={"22px"}>
        {matches.filter(filterUser).map((user, i) => (
          <InterestListItem user={user} key={i} match />
        ))}
      </Box>
      <Typography
        fontWeight={700}
        fontSize={"18px"}
        mb={"12px"}
        sx={{ color: theme.palette.black }}
      >
        Interest Shown
      </Typography>
      <Box>
        {interests.filter(filterUser).map((user, i) => (
          <InterestListItem user={user} match={false} key={i} />
        ))}
      </Box>
    </Box>
  );
};
export default InterestPage;
