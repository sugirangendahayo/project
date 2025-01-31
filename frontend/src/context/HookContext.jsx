/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { createContext } from "react";
import axiosInstance from "../axiosIntance";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const HookContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(false); // Tracks authentication status
  const [theme, setTheme] = useState("light");
  const [open, setOpen] = useState(null);
  const [message, setMessage] = useState(""); // Stores any global messages
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for app initialization
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data on app load
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/users"); // Replace with your user data endpoint
        // console.log(response.data)
        if (response.data.results) {
          setAuth(true); // User is authenticated
          // setName(response.data.results[0].first_name);
          setUserDetails(response.data.results);
          // console.log(response.data.results);
        } else {
          setAuth(false); // No valid user session
        }
      } catch (error) {
        // console.error(error.response.data);
        setAuth(false);
        // navigate("/");

        setMessage("Failed to fetch user data.");
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchUserData();
  }, [navigate]); // Empty dependency array ensures this runs once on app load

  const contextData = {
    auth,
    setAuth,
    theme,
    open,
    setOpen,
    setTheme,
    userDetails,
    setUserDetails,
    message,
    setMessage,
    loading,
    setLoading,
  };

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};

export {HookContextProvider, UserContext};
