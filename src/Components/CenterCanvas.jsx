import { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  Controls,
  MiniMap,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setNodeId } from "../Redux/Slices/nodeSlice.js";
import { setEdgeId } from "../Redux/Slices/edgeSlice.js";
import { dragNodes, connectNodes } from "../APIS/projectsApi.js";
import Node from "../Base/Node.jsx";

function CenterCanvas({ project, projectId, user_id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state?.auth?.user?.id);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    // Wait until both IDs are available before deciding
    if (userId == null || user_id == null) return;
    project.nodes.length === 0 && dispatch(setNodeId(null));

    // Compare after normalizing types
    if (String(userId) === String(user_id)) {
      const { nodes = [], edges = [] } = project || {};
      setNodes(nodes);
      setEdges(edges);
    } else {
      navigate("/accessdenied");
    }
  }, [userId, user_id, project, navigate, dispatch]);

  const onNodesChange = useCallback(
    (changes) => {
      console.log(changes);
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot));

      const selectChange = changes.find(
        (c) => c.type === "select" && c.selected
      );
      const dragStopChange = changes.find(
        (c) => c.type === "position" && c.dragging === false
      );

      if (selectChange && selectChange.selected) {
        const id = selectChange.id;
        dispatch(setNodeId(id));
        // const node = nodes.find((n) => n.id === id);
        // dispatch(setNodeType(node?.type ?? null));
      } else if (dragStopChange) {
        const id = dragStopChange.id;
        dispatch(setNodeId(id));
        // Do NOT set node type on drag stop
      } else {
        // Nothing selected
        dispatch(setNodeId(null));
        // dispatch(setNodeType(null));
      }

      const { dragging } = changes[0];
      if (dragging === false) {
        dragNodes(project, projectId, nodes, edges);
      }
    },
    [dispatch, edges, nodes, project, projectId]
  );
  const onEdgesChange = useCallback(
    (changes) => {
      console.log("Edge changes:", changes);
      if (
        changes.some((change) => change.type === "select" && change.selected)
      ) {
        const id = changes.find((change) => change.selected).id;
        dispatch(setEdgeId(id));
        // Clear node selection/type when an edge is selected
        dispatch(setNodeId(null));
        // dispatch(setNodeType(null));
      } else {
        dispatch(setEdgeId(null));
      }
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot));
    },
    [dispatch]
  );
  const onConnect = useCallback(
    (params) => {
      console.log(params);

      // Create edge with proper ID format
      const newEdge = {
        id: `${params.source}-${params.target}`,
        source: params.source,
        target: params.target,
      };

      // Add the new edge to state
      setEdges((edgesSnapshot) => [...edgesSnapshot, newEdge]);

      // Update the backend with all edges including the new one
      // const updatedEdges = [...edges, newEdge];
      connectNodes(project, projectId, nodes, [...edges, newEdge]);
    },

    [edges, nodes, project, projectId]
  );

  const nodeTypes = {
    startNode: Node,
    endNode: Node,
    formNode: Node,
    emailNode: Node,
    apiNode: Node,
    conditionNode: Node,
  };

  return (
    <>
      <div className={`h-full w-full z-30`}>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
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
