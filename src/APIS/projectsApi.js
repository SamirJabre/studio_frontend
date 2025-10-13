import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  setProjects,
  addProject,
  removeProject,
} from "../Redux/Slices/projectsSlice.js";
axios.defaults.baseURL = "http://localhost:4000";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchProjects = async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/projects", {
      params: {
        user_id: jwtDecode(token).id,
      },
    });
    dispatch(setProjects(response.data));
    setProjects(response.data);
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

export const createProject = async (projectData, dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const user_id = jwtDecode(token).id;
    const newProject = { ...projectData, user_id };
    const response = await axios.post("/projects", newProject);
    console.log(response.data);
    dispatch(addProject(response.data));
  } catch (error) {
    console.error("Error creating project:", error);
  }
};

export const deleteProject = async (projectId, dispatch) => {
  try {
    await axios.delete(`/projects/${projectId}`);
    dispatch(removeProject(projectId));
  } catch (error) {
    console.error("Error deleting project:", error);
  }
};

export const duplicateProject = async (project, dispatch) => {
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
    dispatch(addProject(response.data));
  } catch (error) {
    console.error("Error duplicating project:", error);
  }
};
