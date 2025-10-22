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

export const dragNodes = async (project, projectId, nodes, edges) => {
  try {
    await axios.put(`projects/${projectId}`, {
      ...project,
      nodes,
      edges,
    });
  } catch (error) {
    console.error("Error dragging nodes:", error);
  }
};

export const connectNodes = async (project, projectId, nodes, newEdges) => {
  try {
    await axios.put(`projects/${projectId}`, {
      ...project,
      nodes,
      edges: newEdges,
    });
  } catch (error) {
    console.error("Error connecting nodes:", error);
  }
};

export const updateNodeData = async (project, projectId, nodeId, nodeData) => {
  try {
    const updatedNodes = project.nodes.map((node) =>
      node.id === nodeId ? { ...node, data: nodeData } : node
    );

    await axios.put(`projects/${projectId}`, {
      ...project,
      nodes: updatedNodes,
    });

    return { success: true, updatedNodes };
  } catch (error) {
    console.error("Error updating node data:", error);
    return { success: false, error };
  }
};

export const createNode = async (
  project,
  projectId,
  nodeType,
  position,
  currentNodes
) => {
  try {
    const label = nodeType
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
    const newNodeId = `node-${Date.now()}`;

    // Initialize node data based on type
    let nodeData = { label };

    switch (nodeType) {
      case "emailNode":
        nodeData = {
          label,
          recipientEmail: "",
          subjectLine: "",
          emailBody: "",
        };
        break;
      case "formNode":
        nodeData = {
          label,
          fields: [],
        };
        break;
      case "apiNode":
        nodeData = {
          label,
          apiEndpoint: "",
          method: "",
          requestHeaders: "",
          requestBody: "",
        };
        break;
      case "conditionNode":
        nodeData = {
          label,
          logic: "OR",
          conditions: [],
        };
        break;
      default:
        nodeData = { label };
    }

    const newNode = {
      id: newNodeId,
      type: nodeType,
      position: position,
      data: nodeData,
    };

    const updatedNodes = [...currentNodes, newNode];

    await axios.put(`projects/${projectId}`, {
      ...project,
      nodes: updatedNodes,
      metadata: {
        ...project.metadata,
        lastModified: new Date().toISOString(),
      },
    });

    return { success: true, newNode, updatedNodes };
  } catch (error) {
    console.error("Error creating node:", error);
    return { success: false, error };
  }
};
