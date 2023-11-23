import SprintCard from "./components/SprintCard";
import { Box, Grid } from "@mui/material";
import Navigation from "../Navigation";
import React from "react";

export const Dashboard = () => {
  return (
    <>
      <Navigation>
        <Box sx={{ padding: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <SprintCard sprintNumber={61} progress={90} />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <SprintCard sprintNumber={62} progress={40} />
            </Grid>
          </Grid>
        </Box>
      </Navigation>
    </>
  );
};

export default Dashboard;
