import React, { useEffect, memo } from "react";
import TextField from "@material-ui/core/TextField";
import useInput from "../../hooks/useInput";
import useDebounce from "../../hooks/useDebounce";
import PropTypes from "prop-types";

const UserInput = ({ updateSearchTerm }) => {
  const { value, onChange } = useInput("");
  const debouncedInput = useDebounce(value, 500);

  useEffect(() => {
    updateSearchTerm(debouncedInput);
  }, [updateSearchTerm, debouncedInput]);

  return (
    <TextField label="Search for a movie" value={value} onChange={onChange} />
  );
};

UserInput.propTypes = {
  updateSearchTerm: PropTypes.func.isRequired,
};

const memoizedUserInput = memo(UserInput);

export default memoizedUserInput;
