import { useState } from "react";
import logo from "../Assets/Logo/StudioLogo.png";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/Slices/authSlice.js";
import { emptyProjects } from "../Redux/Slices/projectsSlice.js";
import { emptyCurrentProject } from "../Redux/Slices/projectSlice.js";
import { useNavigate } from "react-router";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  // const sortingOptions = ["Default", "Ascending", "Descending"];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    dispatch(emptyProjects());
    dispatch(emptyCurrentProject());
    navigate("/");
  };

  return (
    <nav className="w-full h-14 sm:h-16 md:h-18 flex justify-between items-center bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 px-3 sm:px-6 md:px-8 sticky top-0 z-50">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-md hover:shadow-lg transition-shadow duration-300">
          <img
            src={logo}
            alt="Logo"
            className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 object-contain"
          />
        </div>
        <h1 className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
          Studio
        </h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Account settings" arrow>
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{
                p: 0,
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <Avatar
                alt="User Avatar"
                src="https://i.sstatic.net/pEihy.png"
                sx={{
                  width: { xs: 36, sm: 40, md: 44 },
                  height: { xs: 36, sm: 40, md: 44 },
                  border: "2px solid",
                  borderColor: "transparent",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#667eea",
                    boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
                  },
                }}
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{
              mt: "50px",
              "& .MuiPaper-root": {
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                minWidth: "160px",
                border: "1px solid rgba(0,0,0,0.05)",
              },
            }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem
              onClick={() => {
                handleCloseUserMenu();
                handleLogout();
              }}
              sx={{
                borderRadius: "8px",
                mx: 1,
                my: 0.5,
                "&:hover": {
                  backgroundColor: "rgba(239, 68, 68, 0.08)",
                },
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: { xs: "0.875rem", sm: "0.95rem" },
                  fontWeight: 500,
                  color: "#dc2626",
                  width: "100%",
                }}
              >
                Log Out
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      </div>
    </nav>
  );
}

export default Navbar;
