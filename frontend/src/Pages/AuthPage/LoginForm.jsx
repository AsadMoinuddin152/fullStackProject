import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { styled } from "styled-components";
import { motion } from "framer-motion";
import { loginUser } from "../../api/Api";
import { useNavigate } from "react-router-dom";
import ProgressButton from "../../Components/ProgressButton";
import { loginSuccess } from "../../redux/authSlice";
import { useDispatch } from "react-redux";

const GlassCard = styled(motion.div)`
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 1rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  width: 100%;
  max-width: 400px;
  margin: auto;
`;

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setProgress((old) => {
          const next = old < 90 ? old + 1 : old;
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (redirecting) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            navigate("/dashboard");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [redirecting, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setProgress(0);
    setSuccess(false);
    setRedirecting(false);

    const MIN_DURATION = 3000;
    const startTime = Date.now();

    const slowProgressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 90) return prev + 1;
        return prev;
      });
    }, 100);

    const result = await loginUser(form.email, form.password);
    console.log(result);
    const elapsed = Date.now() - startTime;

    clearInterval(slowProgressInterval);

    const remainingTime = Math.max(MIN_DURATION - elapsed, 0);

    const currentProgress = progress;
    const steps = (100 - currentProgress) / 5;
    const stepInterval = remainingTime / steps;

    const fastProgressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(fastProgressInterval);
          setLoading(false);
          if (result.success) {
            setError(null);
            setSuccess(true);

            dispatch(
              loginSuccess({
                token: result.data.token,
                user: {
                  id: result.data.userId,
                  name: result.data.name,
                  email: result.data.email,
                  phone: result.data.phone,
                },
              })
            );
            setTimeout(() => {
              setRedirecting(true);
            }, 2000);
          } else {
            setError(result.message);
          }
          return 100;
        }
        return prev + 5;
      });
    }, stepInterval);
  };

  return (
    <GlassCard
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ color: "#fff" }}
      >
        Login to Your Account
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          fullWidth
          required
          variant="outlined"
          sx={{
            "& label": { color: "#fff" },
            "& label.Mui-focused": { color: "#fff" },
            "& .MuiInputBase-input": { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "rgba(255, 255, 255, 0.7)" },
              "&:hover fieldset": { borderColor: "#fff" },
              "&.Mui-focused fieldset": { borderColor: "#fff" },
            },
          }}
        />
        <TextField
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          fullWidth
          required
          variant="outlined"
          sx={{
            "& label": { color: "#fff" },
            "& label.Mui-focused": { color: "#fff" },
            "& .MuiInputBase-input": { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "rgba(255, 255, 255, 0.7)" },
              "&:hover fieldset": { borderColor: "#fff" },
              "&.Mui-focused fieldset": { borderColor: "#fff" },
            },
          }}
        />

        {success && !redirecting && (
          <Typography
            variant="body2"
            sx={{
              color: "#4caf50",
              backgroundColor: "rgba(76, 175, 80, 0.1)",
              px: 2,
              py: 1,
              borderRadius: 1,
              textAlign: "center",
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.1rem",
            }}
          >
            Login successful!
          </Typography>
        )}

        {success && redirecting && (
          <Typography
            variant="body2"
            sx={{
              color: "#2196f3",
              backgroundColor: "rgba(33, 150, 243, 0.1)",
              px: 2,
              py: 1,
              borderRadius: 1,
              textAlign: "center",
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.1rem",
            }}
          >
            Redirecting tp Dashboard in {countdown}...
          </Typography>
        )}

        {error && !success && (
          <Typography
            variant="body2"
            sx={{
              color: "#ff6b6b",
              backgroundColor: "rgba(251, 251, 251, 0.6)",
              px: 2,
              py: 1,
              borderRadius: 1,
              textAlign: "center",
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.1rem",
            }}
          >
            {error}
          </Typography>
        )}

        {!loading && !success && !redirecting && (
          <ProgressButton type="submit">Login</ProgressButton>
        )}
        {loading && <ProgressButton progress={progress} disabled />}
      </Box>
    </GlassCard>
  );
};

export default LoginForm;
