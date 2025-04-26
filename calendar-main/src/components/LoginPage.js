import React, { useState, useEffect } from "react";

const LoginPage = ({ onLogin, attendees }) => {
  const [username, setUsername] = useState("");
  const [isHovered, setIsHovered] = useState(false); // State to track hover

  const handleLogin = () => {
    const validAttendees = attendees.map((attendee) => attendee.name);
    if (username.trim() && validAttendees.includes(username.trim())) {
      onLogin(username.trim()); // Pass the username to App.js
    } else {
      alert("Please enter a valid username.");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleLogin();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [username]);

  return (
    <div style={{ 
      backgroundColor: "#fafafa", 
      height: "100vh", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      fontStyle: "normal"
    }}>
      <div style={{ 
        background: "white", 
        padding: "40px", 
        borderRadius: "8px", 
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", 
        width: "350px",
        textAlign: "center"
      }}>
        <h1 style={{ 
          marginBottom: "30px", 
          fontSize: "28px", 
          fontWeight: "bold", 
          color: "#2C2C54" 
        }}>
          Synchronize
        </h1>
        <h2 style={{ 
          marginBottom: "30px", 
          fontSize: "19px", 
          fontWeight: "bold" 
        }}>
          Sign in to your account
        </h2>
        <label 
          style={{ 
            display: "block", 
            textAlign: "left", 
            fontWeight: "bold", 
            fontSize: "14px", 
            marginBottom: "10px" 
          }}
        >
          Username:
        </label>
        <input
          type="text"
          placeholder="Enter your Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ 
            width: "100%", 
            padding: "12px", 
            marginBottom: "20px", 
            borderRadius: "6px", 
            border: "1px solid #ccc", 
            fontSize: "14px" 
          }}
        />
        <button 
          onClick={handleLogin}
          onMouseEnter={() => setIsHovered(true)} // Set hover state to true
          onMouseLeave={() => setIsHovered(false)} // Set hover state to false
          style={{ 
            width: "100%", 
            padding: "12px", 
            backgroundColor: isHovered ? "#3B3B75" : "#2C2C54", // Change color on hover
            color: "white", 
            border: "none", 
            borderRadius: "6px", 
            fontWeight: "bold", 
            fontSize: "14px", 
            cursor: "pointer",
            marginBottom: "20px"
          }}
        >
          SIGN IN
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
