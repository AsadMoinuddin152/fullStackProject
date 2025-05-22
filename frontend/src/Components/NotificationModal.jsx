import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  LinearProgress,
  Box,
  Slide,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const NotificationModal = ({
  open,
  title,
  message,
  duration = 5000,
  onTimeout,
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!open) return;

    setProgress(100);
    const interval = 100;
    const totalTicks = duration / interval;
    let ticks = 0;

    const timer = setInterval(() => {
      ticks++;
      setProgress(100 - (ticks / totalTicks) * 100);
      if (ticks >= totalTicks) {
        clearInterval(timer);
        if (onTimeout) onTimeout();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [open, duration, onTimeout]);

  return (
    <Dialog
      open={open}
      disableEscapeKeyDown
      TransitionComponent={Slide}
      transitionDuration={300}
      PaperProps={{
        sx: {
          borderTop: "6px solid #1976d2",
          borderRadius: "12px",
          backgroundColor: "#f4faff",
          padding: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          color: "#1976d2",
          fontWeight: 600,
        }}
      >
        <InfoOutlinedIcon sx={{ mr: 1 }} />
        {title}
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ mb: 2, color: "#333" }}>{message}</Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: "#bbdefb",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#1976d2",
            },
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default NotificationModal;
