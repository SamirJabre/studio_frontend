import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
axios.defaults.baseURL = "https://studio-backend-mjka.onrender.com/";

const token = localStorage.getItem("token")?.toString();

axios.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token")?.toString();
      const response = await axios.get("/projects", {
        params: {
          user_id: jwtDecode(token).id,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue("Server Error, Please Try Again");
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async ({ projectData }, { rejectWithValue }) => {
    try {
      const user_id = jwtDecode(token).id;
      const newProject = {
        ...projectData,
        nodes: [],
        edges: [],
        metadata: {
          createdAt: new Date().toISOString(),
          lastModified: new Date().toISOString(),
          version: 1,
        },
        user_id,
      };
      const response = await axios.post("/projects", newProject);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Error creating project");
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async ({ projectId }, { rejectWithValue }) => {
    try {
      await axios.delete(`/projects/${projectId}`);
      return projectId;
    } catch (error) {
      console.error("Error deleting project:", error);
      return rejectWithValue("Error deleting project");
    }
  }
);

export const duplicateProject = createAsyncThunk(
  "projects/duplicateProject",
  async ({ project }, { rejectWithValue }) => {
    try {
      const duplicatedProject = {
        ...project,
        id: undefined,
        title: `${project.title} (Copy)`,
        metadata: {
          createdAt: new Date().toISOString(),
          lastModified: new Date().toISOString(),
          version: 1,
        },
      };
      const response = await axios.post("/projects", duplicatedProject);
      return response.data;
    } catch (error) {
      console.error("Error duplicating project:", error);
      return rejectWithValue("Error duplicating project");
    }
  }
);

export const importProject = createAsyncThunk(
  "projects/importProject",
  async ({ projectData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token")?.toString();
      const user_id = jwtDecode(token).id;

      const importedProject = {
        ...projectData,
        id: undefined,
        user_id,
        title: projectData.title
          ? `${projectData.title} (Imported)`
          : "Imported Project",
        metadata: {
          ...projectData.metadata,
          createdAt: new Date().toISOString(),
          lastModified: new Date().toISOString(),
          importedAt: new Date().toISOString(),
        },
      };

      const response = await axios.post("/projects", importedProject);
      return response.data;
    } catch (error) {
      console.error("Error importing project:", error);
      return rejectWithValue("Error importing project");
    }
  }
);

export const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    loading: false,
    error: null,
    createProjectLoading: false,
    deleteProjectLoading: false,
    duplicateProjectLoading: false,
    importProjectLoading: false,
  },
  reducers: {
    emptyProjects: (state) => {
      state.projects = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
        state.error = null;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(createProject.pending, (state) => {
        state.createProjectLoading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
        state.createProjectLoading = false;
      });

    builder
      .addCase(deleteProject.pending, (state) => {
        state.deleteProjectLoading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (project) => project.id !== action.payload
        );
        state.deleteProjectLoading = false;
      });

    builder
      .addCase(duplicateProject.pending, (state) => {
        state.duplicateProjectLoading = true;
        state.error = null;
      })
      .addCase(duplicateProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
        state.duplicateProjectLoading = false;
      });

    builder
      .addCase(importProject.pending, (state) => {
        state.importProjectLoading = true;
        state.error = null;
      })
      .addCase(importProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
        state.importProjectLoading = false;
        state.error = null;
      })
      .addCase(importProject.rejected, (state, action) => {
        state.importProjectLoading = false;
        state.error = action.payload;
      });
  },
});

export const { emptyProjects } = projectsSlice.actions;

export default projectsSlice.reducer;
