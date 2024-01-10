import { Search } from "@mui/icons-material";
import { InputBase, Paper, PaperProps, useTheme } from "@mui/material";

const SearchBar = ({ sx = [] }: PaperProps) => {
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
      <Search sx={{ color: theme.palette.secondary.dark, mr: "8px" }}></Search>
      <InputBase
        placeholder="Search"
        sx={{ fontWeight: 700, color: theme.palette.secondary.dark }}
        fullWidth
      ></InputBase>
    </Paper>
  );
};

export default SearchBar;
