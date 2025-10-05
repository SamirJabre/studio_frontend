import { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import logo from "../Assets/Logo/StudioLogo.png";
import SearchInput from "../Base/SearchInput.jsx";
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
import { changeSortOrder } from "../Redux/Slices/sortSlice.js";
import { useNavigate } from "react-router";

function Navbar({ handleSearch }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  // const sortingOptions = ["Default", "Ascending", "Descending"];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    dispatch(changeSortOrder());
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    dispatch(logout());
    navigate("/login");
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
        <div className="hidden sm:block">
          <SearchInput handleSearch={handleSearch} />
        </div>
        <button
          type="button"
          onClick={toggleSort}
          aria-label={`Sort ${
            sortOrder === "asc" ? "ascending" : "descending"
          }`}
          className="group flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 h-[32px] sm:h-[40px] rounded-[5px] border border-opacity-70 border-[#5664F5] text-black hover:bg-[#5664F5] hover:text-white transition-colors"
        >
          <span className="flex flex-col leading-none">
            <FaArrowUp
              size={6}
              className={`sm:hidden ${
                sortOrder === "asc" ? "opacity-100" : "opacity-40"
              } group-hover:opacity-80`}
            />
            <FaArrowUp
              size={8}
              className={`hidden sm:block ${
                sortOrder === "asc" ? "opacity-100" : "opacity-40"
              } group-hover:opacity-80`}
            />
            <FaArrowDown
              size={6}
              className={`sm:hidden ${
                sortOrder === "desc" ? "opacity-100" : "opacity-40"
              } group-hover:opacity-80`}
            />
            <FaArrowDown
              size={8}
              className={`hidden sm:block ${
                sortOrder === "desc" ? "opacity-100" : "opacity-40"
              } group-hover:opacity-80`}
            />
          </span>
          <span className="font-medium text-xs sm:text-sm">Sort</span>
        </button>
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

      {/* Mobile Search - Show below navbar on small screens */}
      <div className="sm:hidden absolute top-16 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-10">
        <SearchInput handleSearch={handleSearch} />
      </div>
    </nav>
  );
}

export default Navbar;
