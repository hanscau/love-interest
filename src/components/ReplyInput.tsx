import { Avatar, Box, BoxProps, Button, useTheme } from "@mui/material";
import TextInput from "./TextInput";
import User from "model/User";

interface ReplyInputProps extends BoxProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submit?: () => void;
  user: User | null;
  show?: boolean;
}

const ReplyInput = ({
  value,
  onChange,
  submit,
  user,
  show = true,
  ...rest
}: ReplyInputProps) => {
  const theme = useTheme();

  return (
    <Box
      display={show ? "flex" : "none"}
      gap={"16px"}
      alignItems={"center"}
      {...rest}
    >
      <Avatar src={user ? user.profileImageURL : ""} />

      <TextInput
        placeholder="Say something nice"
        value={value}
        onChange={onChange}
        onSubmit={submit}
        sx={{
          fontWeight: 700,
          color: theme.palette.secondary.dark,
          flex: "1 1 auto",
        }}
      ></TextInput>
      <Button
        variant="contained"
        onClick={submit}
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
