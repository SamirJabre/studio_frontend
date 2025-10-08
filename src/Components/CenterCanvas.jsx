import { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Controls,
  MiniMap,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";

function CenterCanvas() {
  const navigate = useNavigate();
  const userId = useSelector((state) => state?.auth?.user?.id);
  const { id: projectId } = useParams();
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/projects/${projectId}`);
        console.log(response.data);
        if (userId !== response.data.user_id) {
          navigate("/accessdenied");
        } else {
          const { nodes, edges } = response.data;
          setNodes(nodes);
          setEdges(edges);
        }
      } catch (error) {
        console.error("Error fetching graph data:", error);
        console.log(error.response.status);
        if (error.response.status === 404) {
          navigate("/404");
        }
      }
    };

    fetchData();
  }, [navigate, projectId, userId]);

  const onNodesChange = useCallback(
    (changes) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );
  return (
    <>
      <div className={`h-full w-full`}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </>
  );
}

export default CenterCanvas;
