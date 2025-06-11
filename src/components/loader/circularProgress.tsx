import React, { useEffect, useRef, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export interface CircularProgressWithLabelProps {
  value: number;
}

const ANIMATION_DURATION = 800; // ms

const CircularProgressWithLabel: React.FC<CircularProgressWithLabelProps> = ({
  value,
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    let start: number | null = null;
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / ANIMATION_DURATION, 1);
      const current = Math.round(progress * value);
      setAnimatedValue(current);
      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setAnimatedValue(Math.round(value));
      }
    };
    setAnimatedValue(0);
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [value]);

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={100}
        thickness={6}
        size={60}
        sx={{ color: "#e0e0e0", position: "absolute", left: 0 }}
      />
      <CircularProgress
        variant="determinate"
        value={animatedValue}
        thickness={5}
        size={60}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            variant="caption"
            component="div"
            sx={{ color: "#000", fontWeight: "bold", lineHeight: "12px" }}
          >
            {`${Math.round(animatedValue)}%`}
          </Typography>
          <Typography
            variant="caption"
            component="div"
            sx={{ color: "#000", fontSize: "8px", lineHeight: "8px" }}
          >
            Ingresado
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CircularProgressWithLabel;
