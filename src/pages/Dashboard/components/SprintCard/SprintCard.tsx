import {
  Button,
  Card,
  CardActions,
  CardContent,
  LinearProgress,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const SprintCard = (props: any) => {
  const { sprintNumber, progress } = props;

  const navigate = useNavigate();
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Sprint {sprintNumber}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Some more info...
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Bug fixes
        </Typography>
        <LinearProgress variant="determinate" value={progress} />
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate("/sprint")}>
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default SprintCard;
