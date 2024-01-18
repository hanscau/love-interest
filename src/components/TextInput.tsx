import { Box, InputBase, Paper, PaperProps, useTheme } from "@mui/material";
import React from "react";

interface TextInputProps extends PaperProps {
  placeholder?: string;
  InputIcon?: React.ReactNode;
  bold?: boolean;
  type?: string;
}

const TextInput = ({
  bold,
  placeholder,
  InputIcon,
  type,
  sx = [],
}: TextInputProps) => {
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
      {InputIcon ? InputIcon : <Box sx={{ width: "8px" }}></Box>}
      <InputBase
        placeholder={placeholder}
        sx={{ fontWeight: bold ? 700 : 0, color: theme.palette.secondary.dark }}
        type={type ? type : "text"}
        fullWidth
      ></InputBase>
    </Paper>
  );
};

export default TextInput;
