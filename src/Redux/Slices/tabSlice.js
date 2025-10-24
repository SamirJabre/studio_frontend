import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
  name: "tab",
  initialState: {
    activeTab: "dashboard",
  },
  reducers: {
    setActivetab(state, action) {
      state.activeTab = action.payload;
    },
  },
});

export const { setActivetab } = tabSlice.actions;
export default tabSlice.reducer;
