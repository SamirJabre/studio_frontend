import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";

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
  async ({ projectId, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/projects/${projectId}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
      return navigate("/404");
    }
  }
);

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async ({ updatedProject }, { rejectWithValue }) => {
    try {
      return updatedProject;
    } catch (error) {
      return rejectWithValue("Failed to update project.");
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState: {
    currentProject: [],
    loading: false,
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
        state.currentProject = action.payload;
      });
  },
});

export default projectSlice.reducer;
