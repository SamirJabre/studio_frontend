import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

const AuthTextField = styled(TextField)({
  width: "100%",
  height: "80px",
  marginBottom: "8px", // Add consistent spacing
  "& .MuiInputBase-root": {
    borderRadius: "8px",
    background: "white",
  },
  "& .MuiFormHelperText-root": {
    height: "15px", // Reserve space for error text
    margin: "3px 14px 0",
  },
});

const AuthInput = ({ type, name, value, onChange, onBlur, error, touched }) => {
  return (
    <AuthTextField
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      label={name.charAt(0).toUpperCase() + name.slice(1)}
      variant="outlined"
      error={touched && Boolean(error)}
      helperText={touched && error ? error : " "} // Always show helper text (space when no error)
    />
  );
};

export default AuthInput;
