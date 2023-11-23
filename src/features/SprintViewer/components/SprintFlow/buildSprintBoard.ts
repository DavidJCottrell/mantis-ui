import { Edge, Node } from "reactflow";
import { v4 as uuid } from "uuid";
import { Issue } from "../../../../types/issue";
import { Member } from "../../../../types/member";
import { SprintDetails } from "../../../../types/sprintDetails";

export const buildSprintBoard = (
  issues: Issue[],
  members: Member[],
  sprintDetails: SprintDetails
) => {
  let nodes: Node[] = [];
  let edges: Edge[] = [];

  // Add sprint node
  nodes.push({
    id: sprintDetails.id.toString(),
    data: {
      label: sprintDetails.title,
      percentComplete: sprintDetails.percentComplete,
    },
    position: {
      x: 0,
      y: 0,
    },
    type: "sprintNode",
  });

  // Add connection between sprint node and all members
  edges.push(
    ...members.map((member: Member) => ({
      id: uuid(),
      source: sprintDetails.id.toString(),
      target: member.userId.toString(),
      type: "step",
      sourceHandle: "next-issue",
    }))
  );

  issues.forEach((issue: Issue) => {
    // Draw connection between previous and next issue node
    edges.push({
      id: uuid(),
      source: issue.previousNodeId.toString(),
      target: issue.id.toString(),
      type: "step",
      animated: issue?.condition === "active",
    });

    // Show connection between issue and reviewer
    if (issue.reviewerId) {
      edges.push({
        id: uuid(),
        source: issue.id.toString(),
        target: issue.reviewerId.toString(),
        type: "step",
        animated: true,
        sourceHandle: "reviewer",
        targetHandle: "reviewer",
        style: { stroke: "rgba(48,101,215,0.4)" },
      });
    }

    // Add the node
    nodes.push({
      id: issue.id.toString(),
      data: {
        label: issue.title,
      },
      position: {
        x: issue.nodePosition.x,
        y: issue.nodePosition.y,
      },
      type: "issueNode",
    });
  });

  // Add member nodes
  members.forEach((member: Member) => {
    nodes.push({
      id: member.userId.toString(),
      data: {
        label: member.name,
      },
      position: {
        x: member.nodePosition.x,
        y: member.nodePosition.y,
      },
      type: "memberNode",
    });
  });
  return { nodes: nodes, edges: edges };
};

export default buildSprintBoard;
