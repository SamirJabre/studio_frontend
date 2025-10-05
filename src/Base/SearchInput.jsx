import { TextField } from "@mui/material";
import { styled } from "@mui/material";

const StyledTextField = styled(TextField)({
  width: "250px",
  height: "40px",
  fontFamily: "Arial, sans-serif",
  fontSize: "14px",
  fontWeight: "bolder",
  "& .MuiOutlinedInput-root": {
    borderRadius: "5px",
  },
});

function SearchInput({ handleSearch }) {
  return (
    <StyledTextField
      variant="outlined"
      label="Search"
      placeholder="Search projects..."
      multiline={false}
      size="small"
      onChange={(event) => handleSearch(event.target.value)}
    />
  );
}

export default SearchInput;
