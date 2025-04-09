"use client";
import React, { useState } from "react";
import { Container, Box, Typography, Button, Avatar } from "@mui/material";
import { auth, provider, signInWithPopup } from "../Utils/FirebaseConfig";
import { useRouter } from "next/navigation";
export default function SignUpPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      router.push("/home");
    } catch (error) {
      console.error("Something Went Wrong While SignIn:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={10}>
        <Typography variant="h4" gutterBottom>
          Welcome to MyApp 👋
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Sign up with Google to get started
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={handleGoogleSignup}
          sx={{ mt: 4 }}
        >
          Sign Up with Google
        </Button>
      </Box>
    </Container>
  );
}
