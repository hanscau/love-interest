import { InputBase, Paper, PaperProps, useTheme } from "@mui/material";

interface ParagraphInputProps extends PaperProps {
  placeholder?: string;
  value: string;
  onChange: (e: any) => void;
  minRows?: number;
  maxRows?: number;
}

const ParagraphInput = ({
  minRows,
  maxRows,
  value,
  onChange,
  placeholder,
  sx,
}: ParagraphInputProps) => {
  const theme = useTheme();

  minRows = minRows || 10;
  maxRows = maxRows || 17;

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
        minRows={minRows}
        maxRows={maxRows}
        fullWidth
      ></InputBase>
    </Paper>
  );
};

export default ParagraphInput;
