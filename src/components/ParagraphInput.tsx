import { InputBase, Paper, PaperProps, useTheme } from "@mui/material";

interface ParagraphInputProps extends PaperProps {
  placeholder?: string;
  value: string;
  onChange: (e: any) => void;
}

const ParagraphInput = ({
  value,
  onChange,
  placeholder,
  sx,
}: ParagraphInputProps) => {
  const theme = useTheme();
  return (
    <Paper
      component="form"
      sx={[
        {
          p: "8px 17px",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <InputBase
        placeholder={placeholder}
        sx={{ color: theme.palette.secondary.dark }}
        multiline
        value={value}
        onChange={onChange}
        minRows={10}
        maxRows={17}
        fullWidth
      ></InputBase>
    </Paper>
  );
};

export default ParagraphInput;
