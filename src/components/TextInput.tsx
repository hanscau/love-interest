import { InputBase, Paper, PaperProps, useTheme } from "@mui/material";
import React from "react";

interface TextInputProps extends PaperProps {
  placeholder?: string;
  InputIcon?: React.ReactNode;
}

const TextInput = ({ placeholder, InputIcon, sx = [] }: TextInputProps) => {
  const theme = useTheme();
  return (
    <Paper
      component="form"
      sx={[
        {
          p: "8px 12px",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {InputIcon}
      <InputBase
        placeholder={placeholder}
        sx={{ fontWeight: 700, color: theme.palette.secondary.dark }}
        fullWidth
      ></InputBase>
    </Paper>
  );
};

export default TextInput;
