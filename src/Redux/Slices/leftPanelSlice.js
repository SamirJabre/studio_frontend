import { createSlice } from "@reduxjs/toolkit";

const leftPanelSlice = createSlice({
  name: "leftPanel",
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleLeftPanel: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleLeftPanel } = leftPanelSlice.actions;
export default leftPanelSlice.reducer;
