"use client";
import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Button, Avatar } from "@mui/material";
import { auth, provider, signInWithPopup } from "../Utils/FirebaseConfig";
import { useRouter } from "next/navigation";
export default function SignUpPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          setUser(result.user);
          router.push("/home");
        }
      } catch (error) {
        console.error("Error handling redirect result:", error);
      }
    };
    
    handleRedirectResult();
  }, [router]);

  const handleGoogleSignup = async () => {
    try {
      // Check if user is on a mobile device
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      if (isMobile) {
        // Use redirect method for mobile devices
        await signInWithRedirect(auth, provider);
        // Page will redirect, code below won't execute immediately
      } else {
        // Use popup for desktop devices
        const result = await signInWithPopup(auth, provider);
        setUser(result.user);
        router.push("/home");
      }
    } catch (error) {
      console.error("Something Went Wrong While SignIn:", error);
      // Optional: Add user-friendly error message display here
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
