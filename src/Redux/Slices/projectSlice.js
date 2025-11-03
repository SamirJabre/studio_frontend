import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

export const fetchProject = createAsyncThunk(
  "project/fetchProject",
  async ({ projectId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/projects/${projectId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch project.");
    }
  }
);

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async ({ updatedProject }, { rejectWithValue }) => {
    try {
      return {
        ...updatedProject,
        metadata: {
          ...updatedProject.metadata,
          lastModified: new Date().toISOString(),
        },
      };
    } catch (error) {
      return rejectWithValue("Failed to update project.");
    }
  }
);

export const saveProject = createAsyncThunk(
  "project/saveProjectApi",
  async ({ projectId, currentProject, projectTitle }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`projects/${projectId}`, {
        ...currentProject,
        title: projectTitle,
        metadata: {
          ...currentProject.metadata,
          lastModified: new Date().toISOString(),
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error saving project:", error);
      return rejectWithValue("Failed to save project.");
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState: {
    currentProject: [],
    loading: false,
    modified: false,
  },
  reducers: {
    emptyCurrentProject: (state) => {
      state.currentProject = [];
    },
    modificationAdded: (state) => {
      state.modified = true;
    },
    discardModifications: (state) => {
      state.modified = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProject = action.payload;
      });
    builder
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        state.modified = true;
        state.currentProject = action.payload;
      });
    builder
      .addCase(saveProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveProject.fulfilled, (state, action) => {
        state.loading = false;
        state.modified = false;
        state.currentProject = action.payload;
      });
  },
});

export const { emptyCurrentProject, discardModifications, modificationAdded } =
  projectSlice.actions;
export default projectSlice.reducer;
