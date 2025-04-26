import React, { useState } from "react";

const SettingsPage = ({ onSaveSettings, onCancel, currentUser }) => {
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [email, setEmail] = useState(""); // State for email address

  const handleSave = () => {
    const settings = {
      theme,
      notifications,
      email,
    };
    onSaveSettings(settings);
  };

  return (
    <div
      style={{
        backgroundColor: "#fafafa",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        fontStyle: "normal",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          width: "350px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            marginBottom: "30px",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          SETTINGS
        </h2>

        {/* Name Display */}
        <div style={{ marginBottom: "20px", textAlign: "left" }}>
          <label style={{ fontWeight: "bold", fontSize: "14px" }}>
            Name:
          </label>
          <input
            type="text"
            value={currentUser} // Display the current user's name
            disabled={true} // Disable the input field
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "14px",
              backgroundColor: "#e9ecef", // Greyed-out background
              color: "#6c757d", // Greyed-out text
              cursor: "not-allowed", // Show not-allowed cursor
            }}
          />
        </div>

        {/* Email Address */}
        <div style={{ marginBottom: "20px", textAlign: "left" }}>
          <label style={{ fontWeight: "bold", fontSize: "14px" }}>
            Email Address:
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
        </div>

        {/* Theme Selection */}
        <div style={{ marginBottom: "20px", textAlign: "left" }}>
          <label style={{ fontWeight: "bold", fontSize: "14px" }}>
            Theme:
          </label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        {/* Notifications Toggle */}
        <div style={{ marginBottom: "20px", textAlign: "left" }}>
          <label style={{ fontWeight: "bold", fontSize: "14px" }}>
            Notifications:
          </label>
          <div style={{ marginTop: "10px" }}>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              style={{ marginRight: "10px" }}
            />
            Enable Notifications
          </div>
        </div>

        {/* Buttons */}
        <button
          onClick={handleSave}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#2C2C54",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            fontSize: "14px",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        >
          Save
        </button>
        <button
          onClick={onCancel}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#707070",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;