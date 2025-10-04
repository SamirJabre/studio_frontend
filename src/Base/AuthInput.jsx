import { TextField, InputAdornment, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const StyledTextField = styled(TextField)(({ theme }) => ({
  maxHeight: "55px",
  width: "100%",
  backgroundColor: `${theme.palette.action.hover} !important`,
  borderRadius: "8px",
  "& .MuiInputBase-input": {
    color: theme.palette.text.primary,
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.text.secondary,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.primary.main,
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& fieldset": {
      borderRadius: "8px",
      borderColor: theme.palette.divider,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

function AuthInput({ label, type, value, onChange, onBlur, error, touched }) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <StyledTextField
      value={value}
      type={inputType}
      label={label}
      onChange={onChange}
      onBlur={onBlur}
      error={Boolean(error && touched)}
      helperText={error && touched ? error : ""}
      variant="outlined"
      sx={{ outline: "none" }}
      InputProps={
        isPasswordField
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                    size="small"
                    sx={{
                      color: "text.secondary",
                      padding: "4px",
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                    }}
                  >
                    {showPassword ? (
                      <VisibilityOff fontSize="small" />
                    ) : (
                      <Visibility fontSize="small" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : undefined
      }
    />
  );
}

export default AuthInput;
