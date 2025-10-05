import { createSlice } from "@reduxjs/toolkit";

export const sortSlice = createSlice({
  name: "sort",
  initialState: {
    sort: "Ascending",
  },
  reducers: {
    changeSortOrder: (state) => {
      state.sort = state.sort === "Ascending" ? "Descending" : "Ascending";
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeSortOrder } = sortSlice.actions;

export default sortSlice.reducer;
