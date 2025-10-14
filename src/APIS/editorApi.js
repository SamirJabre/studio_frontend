import axios from "axios";
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

export const fetchProject = async (projectId, setProject, navigate) => {
  try {
    const response = await axios.get(`/projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response.data);
    setProject(response.data);
  } catch {
    navigate("/404");
  }
};

export const deleteNode = async (projectId, updatedProject) => {
  try {
    const response = await axios.put(`/projects/${projectId}`, updatedProject);
    console.log(response.data);
  } catch (e) {
    console.log(e);
    return;
  }
};
