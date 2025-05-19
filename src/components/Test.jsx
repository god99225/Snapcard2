import React, { useState, useEffect } from "react";
import axios from "axios";

const Test = () => {
  const [token, setToken] = useState(null);
  const [postSuccess, setPostSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Step 1: Authenticate
  const getToken = async () => {
    try {
      const response = await axios.post("/api/Authentication/Authenticate", {
        username: "Admin",
        password: "", // Replace with actual password
      });
      const tokenString = response.data.replace(/^"|"$/g, ""); // Clean token if quoted
      console.log("Token:", tokenString);
      setToken(tokenString);
    } catch (err) {
      console.error("Token Error:", err);
      setError("Authentication failed.");
    }
  };

  // Step 2: Post new account
  const postAccount = async () => {
    try {
      const response = await axios.post(
        "/api/odata/Accounts",
        {
          Name: "vikas",
          Email: "vikas@example.com",
          password: "password123"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      console.log("Post Response:", response.data);
      setPostSuccess(true);
    } catch (err) {
      console.error("Post Error:", err);
      setError("Failed to post account.");
    }
  };

  // Step 3: Trigger once authenticated
  useEffect(() => {
    if (!token) {
      getToken();
    } else {
      postAccount(); // 🔁 Post the record after authentication
    }
  }, [token]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Post New Account</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {postSuccess && <p style={{ color: "green" }}>Account posted successfully!</p>}
      {!postSuccess && !error && <p>Posting...</p>}
    </div>
  );
};

export default Test;
