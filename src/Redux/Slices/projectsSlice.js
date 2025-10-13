import { createSlice } from "@reduxjs/toolkit";

export const projectsSlice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    setProjects: (state, action) => {
      state.push(...action.payload);
    },
    addProject: (state, action) => {
      state.push(action.payload);
    },
    removeProject: (state, action) => {
      return state.filter((project) => project.id !== action.payload);
    },
    emptyProjects: () => {
      return [];
    },
  },
});

export const { setProjects, addProject, emptyProjects, removeProject } =
  projectsSlice.actions;

export default projectsSlice.reducer;
