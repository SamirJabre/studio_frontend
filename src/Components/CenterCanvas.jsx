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
import { dragNodes, connectNodes, createNode } from "../APIS/projectsApi.js";
import Node from "../Base/Node.jsx";

function CenterCanvas({ project, projectId, user_id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state?.auth?.user?.id);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();

  useEffect(() => {
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
      } else {
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

      connectNodes(project, projectId, nodes, [...edges, newEdge]);
    },

    [edges, nodes, project, projectId]
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

      // Capture current nodes and create new node
      setNodes((currentNodes) => {
        // Call API with current state
        createNode(project, projectId, nodeType, position, currentNodes).then(
          (result) => {
            if (!result.success) {
              console.error("Failed to save node to database");
            }
          }
        );

        // Generate the new node locally to match what the API will create
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

        return [...currentNodes, newNode];
      });
    },
    [project, projectId, screenToFlowPosition]
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
