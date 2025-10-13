import { createSlice } from "@reduxjs/toolkit";

export const projectsSlice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    setProjects: (state, action) => {
      state.push(...action.payload);
    },
    addProject: (state, action) => {
      state.push(...action.payload);
    },
    // updateProject: (state, action) => {
    //   const index = state.findIndex(
    //     (project) => project.id === action.payload.id
    //   );
    //   if (index !== -1) {
    //     state[index] = action.payload;
    //   }
    // },
    // deleteProject: (state, action) => {
    //   return state.filter((project) => project.id !== action.payload);
    // },
  },
});

export const { setProjects, addProject } = projectsSlice.actions;

export default projectsSlice.reducer;
