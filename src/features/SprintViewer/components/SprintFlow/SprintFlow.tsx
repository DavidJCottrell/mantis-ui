import { useCallback, useMemo, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { useGetSprintQuery } from "../../../../app/store/services/sprint";
import IssueNode from "../nodes/IssueNode";
import MemberNode from "../nodes/MemberNode";
import SprintNode from "../nodes/SprintNode";
import buildSprintBoard from "./buildSprintBoard";

const SprintFlow = (props: any) => {
  const { setIssueModalIsOpen, setUpdateModalIsOpen, sprintId } = props;

  const reactFlowWrapper = useRef(null);

  const { data: getSprintResponse } = useGetSprintQuery(sprintId);

  const { issues, members } = getSprintResponse.sprint;
  const { sprintDetails } = getSprintResponse.sprint;

  const { nodes: formattedNodes, edges: formattedEdges } = buildSprintBoard(
    issues,
    members,
    sprintDetails
  );

  const [nodes, setNodes] = useState<Node[]>(formattedNodes);
  const [edges, setEdges] = useState<Edge[]>(formattedEdges);

  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  let id = 0;
  const getId = () => `dndnode_${id++}`;

  const nodeTypes = useMemo(
    () => ({
      issueNode: (props: any) => (
        <IssueNode
          setIssueModalIsOpen={setIssueModalIsOpen}
          setUpdateModalIsOpen={setUpdateModalIsOpen}
          sprintId={sprintDetails.id}
          {...props}
        />
      ),
      memberNode: (props: any) => (
        <MemberNode sprintId={sprintDetails.id} {...props} />
      ),
      sprintNode: SprintNode,
    }),
    [setIssueModalIsOpen, setUpdateModalIsOpen, sprintDetails.id]
  );

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      // @ts-ignore
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // @ts-ignore
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div
      className="reactflow-wrapper"
      ref={reactFlowWrapper}
      style={{ height: "100%" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        // @ts-ignore
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background gap={50} color="#8c8585" />
      </ReactFlow>
    </div>
  );
};

export default SprintFlow;
