import { useState } from "react";

const useInput = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  return { value, setValue, onChange };
};

export default useInput;
