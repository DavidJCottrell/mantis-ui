import { Handle, Position } from "reactflow";
import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from "@mui/material";

const sprintNodeStyle = {
  width: "325px",
  height: "100%",
  color: "black",
};

export const SprintNode = (props: any) => {
  const { data } = props;
  const LinearProgressWithLabel = (
    props: LinearProgressProps & { value: number }
  ) => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  };

  return (
    <div style={sprintNodeStyle}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="div" align={"center"}>
            {data.label}
          </Typography>
          <br />
          <LinearProgressWithLabel value={data.percentComplete} />
        </CardContent>
      </Card>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
};

export default SprintNode;
