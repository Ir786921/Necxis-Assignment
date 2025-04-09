"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Avatar, Alert } from "@mui/material";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, } from "@/Utils/FirebaseConfig";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        if (error.code === "auth/network-request-failed") {
          setError("Network error. Please check your connection.");
        } else {
          setError('"Sign out failed". Try again.');
        }
      });
  };
  const [user, setUser] = useState(null);
  useEffect(() => {
    const GetUserDetails = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      }
    });

    return () => GetUserDetails();
  }, []);
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Box
          p={4}
          boxShadow={3}
          borderRadius={2}
          bgcolor="#f5f5f5"
          textAlign="center"
        >
          <Box mt={4} mb={4}>
            <Avatar
              src={user?.photoURL}
              alt={user?.displayName}
              sx={{ width: 80, height: 80, margin: "0 auto" }}
            />
            <Typography variant="h6" mt={2} sx={{ color: "#1976d2" }}>
              Welcome , {user?.displayName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
          <Button variant="contained" color="primary" onClick={handleSignOut}>
            Sign Out
          </Button>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}{" "}
        </Box>
      </Box>
    </>
  );
};

export default Home;
