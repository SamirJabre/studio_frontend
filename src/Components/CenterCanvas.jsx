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
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setNodeId } from "../Redux/Slices/nodeSlice.js";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";

function CenterCanvas({ project, projectId, user_id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state?.auth?.user?.id);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    // Wait until both IDs are available before deciding
    if (userId == null || user_id == null) return;

    // Compare after normalizing types
    if (String(userId) === String(user_id)) {
      const { nodes = [], edges = [] } = project || {};
      setNodes(nodes);
      setEdges(edges);
    } else {
      navigate("/accessdenied");
    }
  }, [userId, user_id, project, navigate]);

  const onNodesChange = useCallback(
    (changes) => {
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot));
      console.log(changes);
      if (
        changes.map((change) => change.type === "select") &&
        changes.map((change) => change.selected).includes(true)
      ) {
        dispatch(setNodeId(changes.find((change) => change.selected).id));
      } else if (
        changes.map((change) => change.type === "position") &&
        changes.map((change) => change.dragging).includes(false)
      ) {
        dispatch(setNodeId(changes.find((change) => !change.dragging).id));
      } else {
        dispatch(setNodeId(null));
      }
      const { dragging } = changes[0];
      if (dragging === false) {
        axios.put(`projects/${projectId}`, {
          ...project,
          nodes,
          edges,
        });
      }
    },
    [dispatch, edges, nodes, project, projectId]
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
      <div className={`h-full w-full z-30`}>
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
