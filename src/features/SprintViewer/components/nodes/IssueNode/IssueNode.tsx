import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Handle, Position } from "reactflow";
import ConditionBlinker from "./components/conditionBlinker";
import StatusStepper from "./components/statusStepper";

import { useGetSprintQuery } from "../../../../../app/store/services/sprint";
import { Issue } from "../../../../../types/issue";
import "./IssueNode.css";

export const IssueNode = (props: any) => {
  const { data, setIssueModalIsOpen, setUpdateModalIsOpen, sprintId, id } =
    props;

  // Replace with getIssueQuery
  const { issue } = useGetSprintQuery(sprintId, {
    selectFromResult: (res: any) => ({
      issue: res.data.sprint.issues.find(
        (issue: any) => issue.id.toString() === id
      ) as Issue,
    }),
  });

  const issueNodeStyle = {
    width: "400px",
    height: "100%",
  };

  const getPriority = (priority: string) => {
    switch (priority) {
      case "low":
        return (
          <Typography sx={{ mb: 1.5 }} color="primary.main">
            Low Priority
          </Typography>
        );
      case "medium":
        return (
          <Typography sx={{ mb: 1.5 }} color="warning.main">
            Medium Priority
          </Typography>
        );
      case "high":
        return (
          <Typography sx={{ mb: 1.5 }} color="error.main">
            High Priority
          </Typography>
        );
    }
  };

  return (
    <div style={issueNodeStyle}>
      <Handle type="target" position={Position.Top} />
      <Card variant={issue.status === "merged" ? "outlined" : "elevation"}>
        <CardContent>
          {issue.condition && <ConditionBlinker condition={issue.condition} />}
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {issue.repo}
          </Typography>

          <Typography variant="h6" component="div">
            {data.label}
          </Typography>
          {getPriority(issue.priority)}
          <br />
          <StatusStepper issueStatus={issue.status} />
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color={"primary"}
            onClick={() => setIssueModalIsOpen(true)}
          >
            Open
          </Button>
          <Button
            size="small"
            color={"secondary"}
            onClick={() => setUpdateModalIsOpen(true)}
          >
            Update
          </Button>
        </CardActions>
      </Card>
      <Handle type="source" position={Position.Bottom} id="next-issue" />
      <Handle type="source" position={Position.Right} id="reviewer" />
    </div>
  );
};

export default IssueNode;
