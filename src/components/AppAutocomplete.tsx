import {
  Autocomplete,
  TextField,
  createFilterOptions,
  useTheme,
} from "@mui/material";
import { TopicOption } from "model/Topic";
import { ChangeEvent } from "react";

interface AppAutocompleteProps {
  value: TopicOption | null;
  options: TopicOption[];
  onChange: (e: ChangeEvent<{}>, value: TopicOption | string | null) => void;
}

const filter = createFilterOptions<TopicOption>();

const AppAutocomplete = ({
  value,
  onChange,
  options,
}: AppAutocompleteProps) => {
  const theme = useTheme();

  return (
    <Autocomplete
      freeSolo
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      value={value}
      options={options}
      onChange={onChange}
      renderInput={(params) => {
        return (
          <TextField
            placeholder={"Topic"}
            sx={{
              "& fieldset": { border: "none" },
            }}
            {...params}
          />
        );
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some(
          (option) => inputValue === option.topic
        );
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            topic: `Add "${inputValue}"`,
            id: -1,
          });
        }

        return filtered;
      }}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.topic
      }
      sx={{
        display: "inline-block",
        width: "300px",
        bgcolor: "background.paper",
        boxShadow: theme.shadows[1],
        borderRadius: "16px",
        p: "0px",
        "& input": {
          width: "300px",
          bgcolor: "background.paper",
          borderRadius: "16px",
          color: (theme) =>
            theme.palette.getContrastText(theme.palette.background.paper),
        },
      }}
    ></Autocomplete>
  );
};

export default AppAutocomplete;
