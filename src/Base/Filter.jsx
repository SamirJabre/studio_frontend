import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { FaFilter, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { changeFilter } from "../Redux/Slices/filterSlice.js";
import { useDispatch } from "react-redux";

function Filter() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState("ascending");
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (option) => {
    dispatch(changeFilter(option));
    setSelected(option);
    handleClose();
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#5664F5] to-[#4451d9] text-white rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 font-medium"
      >
        <FaFilter className="text-sm" />
        <span>Filter</span>
        <span className="text-xs opacity-75 capitalize">
          ({selected.replace("_", " ")})
        </span>
      </button>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 3,
            sx: {
              minWidth: 200,
              borderRadius: 2,
              mt: 1,
              overflow: "visible",
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 20,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => handleSelect("Ascending")}
          selected={selected === "Ascending"}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "12px",
            py: 1.5,
            px: 2,
            borderRadius: 1,
            mx: 0.5,
            my: 0.25,
            fontWeight: selected === "Ascending" ? 600 : 400,
            backgroundColor:
              selected === "Ascending"
                ? "rgba(86, 100, 245, 0.08)"
                : "transparent",
            "&:hover": {
              backgroundColor:
                selected === "Ascending"
                  ? "rgba(86, 100, 245, 0.12)"
                  : "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          <FaSortAmountUp className="text-[#5664F5]" />
          <span>Ascending (A-Z)</span>
        </MenuItem>
        <MenuItem
          onClick={() => handleSelect("Descending")}
          selected={selected === "Descending"}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "12px",
            py: 1.5,
            px: 2,
            borderRadius: 1,
            mx: 0.5,
            my: 0.25,
            fontWeight: selected === "Descending" ? 600 : 400,
            backgroundColor:
              selected === "Descending"
                ? "rgba(86, 100, 245, 0.08)"
                : "transparent",
            "&:hover": {
              backgroundColor:
                selected === "Descending"
                  ? "rgba(86, 100, 245, 0.12)"
                  : "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          <FaSortAmountDown className="text-[#5664F5]" />
          <span>Descending (Z-A)</span>
        </MenuItem>
        <MenuItem
          onClick={() => handleSelect("last_modified")}
          selected={selected === "last_modified"}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "12px",
            py: 1.5,
            px: 2,
            borderRadius: 1,
            mx: 0.5,
            my: 0.25,
            fontWeight: selected === "last_modified" ? 600 : 400,
            backgroundColor:
              selected === "last_modified"
                ? "rgba(86, 100, 245, 0.08)"
                : "transparent",
            "&:hover": {
              backgroundColor:
                selected === "last_modified"
                  ? "rgba(86, 100, 245, 0.12)"
                  : "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          <MdAccessTime className="text-[#5664F5] text-lg" />
          <span>Last Modified</span>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default Filter;
