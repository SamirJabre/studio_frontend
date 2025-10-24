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
    <nav className="w-full h-16 sm:h-20 flex justify-between items-center bg-white shadow-lg px-2 sm:px-4">
      <div className="flex items-center justify-center">
        <img
          src={logo}
          alt="Logo"
          className="h-8 w-8 sm:h-12 sm:w-12 md:h-14 md:w-14 object-contain"
        />
        <p className="text-lg sm:text-xl md:text-2xl font-semibold font-sans ml-1 sm:ml-2">
          Studio
        </p>
      </div>
      <div className="flex justify-center items-center gap-x-2 sm:gap-x-4">
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt="Walter White"
                src="https://i.sstatic.net/pEihy.png"
                sx={{
                  width: { xs: 32, sm: 40 },
                  height: { xs: 32, sm: 40 },
                }}
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
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
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography sx={{ textAlign: "center" }} onClick={handleLogout}>
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
