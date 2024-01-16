import { Avatar, Box, BoxProps, Button, useTheme } from "@mui/material";
import TextInput from "./TextInput";

const ReplyInput = (props: BoxProps) => {
  const theme = useTheme();

  return (
    <Box display={"flex"} gap={"16px"} alignItems={"center"} {...props}>
      <Avatar />

      <TextInput
        placeholder="Say something nice"
        sx={{
          fontWeight: 700,
          color: theme.palette.secondary.dark,
          flex: "1 1 auto",
        }}
      ></TextInput>
      <Button
        variant="contained"
        sx={{
          background: theme.palette.secondary.light,
          px: "32px",
          py: "10px",
          borderRadius: "20px",
        }}
      >
        Send
      </Button>
    </Box>
  );
};

export default ReplyInput;
