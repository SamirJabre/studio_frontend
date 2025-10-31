import axios from "axios";
axios.defaults.baseURL = "https://studio-backend-mjka.onrender.com/";

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

export const saveProject = async (projectId, currentProject, projectTitle) => {
  try {
    const response = await axios.put(`projects/${projectId}`, {
      ...currentProject,
      title: projectTitle,
      metadata: {
        ...currentProject.metadata,
        lastModified: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error saving project:", error);
  }
};
