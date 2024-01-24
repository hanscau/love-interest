import {
  Box,
  BoxProps,
  InputBase,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

interface TextInputProps extends BoxProps {
  placeholder?: string;
  InputIcon?: React.ReactNode;
  bold?: boolean;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter?: () => void;
  errorText?: string;
  error?: boolean;
}

const TextInput = ({
  bold,
  placeholder,
  InputIcon,
  type,
  value,
  onChange,
  onEnter,
  errorText,
  error,
  sx = [],
}: TextInputProps) => {
  const theme = useTheme();
  error = error || false;
  return (
    <Box sx={sx}>
      <Paper
        component="div"
        sx={[
          {
            p: "8px 12px",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
          },
        ]}
      >
        {InputIcon ? InputIcon : <Box sx={{ width: "8px" }}></Box>}
        <InputBase
          placeholder={placeholder}
          sx={{ fontWeight: bold ? 700 : 0, color: theme.palette.black }}
          type={type ? type : "text"}
          value={value}
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onEnter && onEnter();
            }
          }}
          fullWidth
        ></InputBase>
      </Paper>
      {error && (
        <Typography fontSize={"12px"} ml={"12px"} mt={"4px"} color={"red"}>
          {errorText}
        </Typography>
      )}
    </Box>
  );
};

export default TextInput;
