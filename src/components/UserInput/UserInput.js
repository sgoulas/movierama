import React, { useEffect, memo } from "react";
import TextField from "@material-ui/core/TextField";
import useInput from "../../hooks/useInput";
import useDebounce from "../../hooks/useDebounce";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#dee2e6",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#dee2e6",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#dee2e6",
      },
      "&:hover fieldset": {
        borderColor: "#dee2e6",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#dee2e6",
      },
    },
  },
})(TextField);

const UserInput = ({ updateSearchTerm }) => {
  const { value, onChange } = useInput("");
  const debouncedInput = useDebounce(value, 500);
  const label = (
    <Typography style={{ color: "#fff" }}>Search for a movie</Typography>
  );

  useEffect(() => {
    updateSearchTerm(debouncedInput);
  }, [updateSearchTerm, debouncedInput]);

  return <CssTextField label={label} value={value} onChange={onChange} />;
};

UserInput.propTypes = {
  updateSearchTerm: PropTypes.func.isRequired,
};

const memoizedUserInput = memo(UserInput);

export default memoizedUserInput;
