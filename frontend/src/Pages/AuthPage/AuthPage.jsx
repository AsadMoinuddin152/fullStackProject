import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const imageUrls = [
  "https://plus.unsplash.com/premium_photo-1683121716061-3faddf4dc504?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1661963212517-830bbb7d76fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHRlY2h8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1562408590-e32931084e23?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRlY2h8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1516905041604-7935af78f572?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHRlY2h8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHRlY2h8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fHRlY2h8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1597239450996-ea7c2c564412?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHRlY2h8ZW58MHx8MHx8fDA%3D",
];

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    setBgImage(imageUrls[randomIndex]);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 1,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          borderRadius: 3,
          p: 4,
          backdropFilter: "blur(12px)",
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          width: "100%",
          maxWidth: 420,
        }}
      >
        {isLogin ? <LoginForm /> : <SignupForm />}
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "1.3em",
              color: "#fff",
            }}
          >
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Typography>
          <Button
            onClick={() => setIsLogin(!isLogin)}
            size="small"
            variant="text"
            sx={{ color: "#fff", fontWeight: "bold" }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AuthPage;
