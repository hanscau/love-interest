import { Delete, Search } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import TextInput from "components/TextInput";

const InterestListItem = () => {
  const theme = useTheme();

  return (
    <Paper sx={{ display: "flex", p: "12px", mb: "6px", borderRadius: "16px" }}>
      <Avatar sx={{ mr: "12px" }}></Avatar>
      <Box>
        <Typography
          fontWeight={700}
          sx={{ color: theme.palette.secondary.dark }}
        >
          Interest Name
        </Typography>
        <Typography fontSize={"12px"}>Interest Description</Typography>
      </Box>
      <Box flex={"1 1 auto"}></Box>
      <Box display={"flex"} alignItems={"center"} gap={"12px"}>
        <Typography
          sx={{ background: "#ffe6e6", p: "4px 12px", borderRadius: "6px" }}
        >
          Phone No
        </Typography>
        <IconButton>
          <Delete color="primary" />
        </IconButton>
      </Box>
    </Paper>
  );
};

const InterestPage = () => {
  const theme = useTheme();

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
        {[1, 2, 3, 4, 5].map((item) => (
          <InterestListItem />
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
        {[1, 2, 3, 4, 5].map((item) => (
          <InterestListItem />
        ))}
      </Box>
    </Box>
  );
};
export default InterestPage;
