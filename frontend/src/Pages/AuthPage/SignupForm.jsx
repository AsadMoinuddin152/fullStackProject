import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { styled } from "styled-components";
import { motion } from "framer-motion";
import { signupUser } from "../../api/Api";
import { useNavigate } from "react-router-dom";
import ProgressButton from "../../Components/ProgressButton";
import { loginSuccess } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

const GlassCard = styled(motion.div)`
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(31, 38, 135, 0.2);
  width: 90%;
  max-width: 380px;
  margin: auto;
`;

const passwordRules = {
  min: (val) => val.length >= 8,
  uppercase: (val) => /[A-Z]/.test(val),
  lowercase: (val) => /[a-z]/.test(val),
  number: (val) => /\d/.test(val),
  special: (val) => /[@$!%*?&#]/.test(val),
};

const passwordChecklist = [
  { label: "At least 8 characters", check: passwordRules.min },
  { label: "At least one uppercase letter", check: passwordRules.uppercase },
  { label: "At least one lowercase letter", check: passwordRules.lowercase },
  { label: "At least one number", check: passwordRules.number },
  {
    label: "At least one special character (@$!%*?&#)",
    check: passwordRules.special,
  },
];

const signupSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  password: yup
    .string()
    .required("Password is required")
    .test(
      "strong-password",
      "Password does not meet strength requirements",
      (value) => passwordChecklist.every((rule) => rule.check(value || ""))
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  terms: yup.bool().oneOf([true], "You must accept the terms and conditions"),
});

const SignupForm = () => {
  const [password, setPassword] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupSchema) });
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentPassword = watch("password", "");

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

  const onSubmit = async (data) => {
    const { confirmPassword, ...userData } = data;
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

    try {
      const result = await signupUser(userData);
      console.log(result);
      const elapsed = Date.now() - startTime;

      clearInterval(slowProgressInterval);
      const remainingTime = Math.max(MIN_DURATION - elapsed, 0);

      let currentProgress = 90;
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
                    id: result.data.user.id,
                    name: result.data.user.name,
                    email: result.data.user.email,
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
    } catch (err) {
      clearInterval(slowProgressInterval);
      setLoading(false);
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <GlassCard
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        sx={{ color: "#fff", fontWeight: 500 }}
      >
        Sign Up
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ display: "flex", flexDirection: "column", gap: 1.4 }}
      >
        <TextField
          label="Name"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
          size="small"
          fullWidth
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{ style: { color: "#fff" } }}
          FormHelperTextProps={{ style: { color: "#fff" } }}
        />

        <TextField
          label="Email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          size="small"
          fullWidth
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{ style: { color: "#fff" } }}
          FormHelperTextProps={{ style: { color: "#fff" } }}
        />

        <TextField
          label="Phone"
          {...register("phone")}
          error={!!errors.phone}
          helperText={errors.phone?.message}
          size="small"
          fullWidth
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{ style: { color: "#fff" } }}
          FormHelperTextProps={{ style: { color: "#fff" } }}
        />

        <TextField
          label="Password"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          size="small"
          fullWidth
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{ style: { color: "#fff" } }}
          FormHelperTextProps={{ style: { color: "#fff" } }}
        />

        <Box sx={{ mt: 1 }}>
          <Typography variant="caption" sx={{ color: "#fff" }}>
            Password must include:
          </Typography>
          <List dense sx={{ pl: 1 }}>
            {passwordChecklist.map(({ label, check }) => {
              const passed = check(currentPassword);
              return (
                <ListItem key={label} sx={{ py: 0 }}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    {passed ? (
                      <CheckCircleIcon color="success" fontSize="small" />
                    ) : (
                      <CancelIcon color="error" fontSize="small" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                      style: { color: "#fff" },
                      variant: "body2",
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Box>

        <TextField
          label="Confirm Password"
          type="password"
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          size="small"
          fullWidth
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{ style: { color: "#fff" } }}
          FormHelperTextProps={{ style: { color: "#fff" } }}
        />

        <FormControlLabel
          control={<Checkbox {...register("terms")} color="primary" />}
          label={
            <Typography variant="body2" sx={{ color: "#fff" }}>
              I agree to the Terms and Conditions
            </Typography>
          }
        />
        {errors.terms?.message && (
          <Typography variant="caption" sx={{ color: "#fff", pl: 1 }}>
            {errors.terms.message}
          </Typography>
        )}

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
            Sign Up successful!
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
            Redirecting to Dashbaord in {countdown}...
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
          <ProgressButton type="submit">Sign Up</ProgressButton>
        )}
        {loading && <ProgressButton progress={progress} disabled />}
      </Box>
    </GlassCard>
  );
};

export default SignupForm;
