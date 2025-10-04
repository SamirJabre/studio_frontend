import { styled } from "@mui/material/styles";
import { Card, CardContent } from "@mui/material";

// Styled components for Login page
export const StyledCard = styled(Card)(({ theme }) => ({
  width: 500,
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    minWidth: 0,
  },
}));

export const StyledCardContent = styled(CardContent)({});

// Override default MUI components
const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
        padding: "8px 20px",
      },
    },
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiBox: {
    styleOverrides: {
      root: {
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
        padding: "20px",
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
      },
    },
  },
};

export default components;
