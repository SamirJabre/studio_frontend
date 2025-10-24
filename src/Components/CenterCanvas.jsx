import { useState, useCallback, useEffect, useRef } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  Controls,
  MiniMap,
  Background,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setNodeId } from "../Redux/Slices/nodeSlice.js";
import { setEdgeId } from "../Redux/Slices/edgeSlice.js";
import Node from "../Base/Node.jsx";
import { updateProject } from "../Redux/Slices/projectSlice.js";

function CenterCanvas({ project, user_id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state?.auth?.user?.id);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();

  useEffect(() => {
    console.log(project);

    if (userId == null || user_id == null) return;
    project.nodes.length === 0 && dispatch(setNodeId(null));

    // Compare after normalizing types
    if (String(userId) === String(user_id)) {
      const { nodes = [], edges = [] } = project || {};
      // Create deep copies to avoid mutation errors with React Flow
      setNodes(JSON.parse(JSON.stringify(nodes)));
      setEdges(JSON.parse(JSON.stringify(edges)));
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
      } else {
        dispatch(setNodeId(null));
        // dispatch(setNodeType(null));
      }

      const { dragging } = changes[0];
      if (dragging === false) {
        // dragNodes(project, projectId, nodes, edges);
        dispatch(
          updateProject({
            updatedProject: { ...project, nodes, edges },
          })
        );
      }
    },
    [dispatch, edges, nodes, project]
  );
  const onEdgesChange = useCallback(
    (changes) => {
      console.log("Edge changes:", changes);
      if (
        changes.some((change) => change.type === "select" && change.selected)
      ) {
        const id = changes.find((change) => change.selected).id;
        dispatch(setEdgeId(id));
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

      const newEdge = {
        id: `${params.source}-${params.target}`,
        source: params.source,
        target: params.target,
      };

      setEdges((edgesSnapshot) => [...edgesSnapshot, newEdge]);
      dispatch(
        updateProject({
          updatedProject: { ...project, nodes, edges: [...edges, newEdge] },
        })
      );
    },

    [dispatch, edges, nodes, project]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    async (event) => {
      event.preventDefault();

      const nodeType = event.dataTransfer.getData("application/reactflow");
      if (!nodeType) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // Generate the new node
      const newNodeId = `node-${Date.now()}`;
      const label = nodeType
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .trim();

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

      // Update local state
      const updatedNodes = [...nodes, newNode];

      // Dispatch to update project in database
      dispatch(
        updateProject({
          updatedProject: {
            ...project,
            nodes: updatedNodes,
            edges: edges,
          },
        })
      );
    },
    [project, nodes, edges, screenToFlowPosition, dispatch]
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
      <div className={`h-full w-full z-30`} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
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
