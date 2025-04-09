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
        // Don't silently fail - show some indication to the user
        if (error.code === 'auth/missing-initial-state') {
          // This specific error needs special handling
          console.log("Missing initial state error - session storage issue");
          // You could display a user-friendly message here
        }
      }
    };
    
    // Only run this if we're in a browser environment
    if (typeof window !== 'undefined') {
      handleRedirectResult();
    }
  }, [router]);

  const handleGoogleSignup = async () => {
    try {
      // Always try popup first as it's more reliable
      try {
        const result = await signInWithPopup(auth, provider);
        setUser(result.user);
        router.push("/home");
      } catch (popupError) {
        console.log("Popup method failed:", popupError);
        
        // Before trying redirect, ensure browser supports it
        if (typeof window !== 'undefined' && 
            window.sessionStorage && 
            typeof window.sessionStorage.setItem === 'function') {
          
          // Set a marker in sessionStorage to detect if it's working
          try {
            sessionStorage.setItem('firebase_auth_test', '1');
            sessionStorage.removeItem('firebase_auth_test');
            
            // SessionStorage works, try redirect
            await signInWithRedirect(auth, provider);
          } catch (storageError) {
            // SessionStorage isn't working correctly
            console.error("SessionStorage error:", storageError);
            alert("Your browser settings may be preventing login. Please check your privacy settings or try a different browser.");
          }
        } else {
          // SessionStorage isn't available
          alert("Authentication requires browser storage access. Please check your privacy settings.");
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
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
