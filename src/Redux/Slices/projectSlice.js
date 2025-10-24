import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    currentProject: [],
    loading: false,
  },

  reducers: {
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
    },
  },
});

export const { setCurrentProject } = projectSlice.actions;
export default projectSlice.reducer;
