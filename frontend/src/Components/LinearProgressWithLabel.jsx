import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";

const LinearProgressWithLabel = ({ value }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" value={value} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="white">{`${Math.round(
          value
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

export default LinearProgressWithLabel;
