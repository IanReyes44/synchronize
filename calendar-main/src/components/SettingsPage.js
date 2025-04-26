import React, { useState } from "react";

//code commented out as it breaks the app
//import { useSession } from "@supabase/auth-helpers-react"; // Importing useSession from Supabase Auth Helpers
//const session = useSession(); // tokens, when session exists we have a user
//const supabase = useSupabaseClient(); // talk to supabase!
//const { isLoading } = useSessionContext();

//  async function googleSignIn() {
//   const { error } = await supabase.auth.signInWithOAuth({
//     provider: "google",
//     options: {
//       scopes: "https://www.googleapis.com/auth/calendar",
//     },
//     redirectTo: "https://your-redirect-url.com", // Replace with your redirect URL
//   });
//   if (error) {
//     alert("Error logging in to Google provider with Supabase");
//     console.log(error);
//   }
// }
//
// async function signOut() {
//   await supabase.auth.signOut();
//   console.log("User signed out");
//   // Optionally, you can redirect the user to a different page after signing out
//   // window.location.href = "/login"; // Redirect to login page
// }
//line 120 is where the sign in button is located in the code below for google

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

        {/* Connections Section */}
        <div style={{ marginBottom: "20px", textAlign: "left" }}>
          <label style={{ fontWeight: "bold", fontSize: "14px" }}>
            Sync With Other Calendars:
          </label>
          <div style={{ marginTop: "10px" }}>
            <button 
              // Uncomment this line to enable Google Sign-In once debugged
              // onClick={() => googleSignIn()}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "white", // Google Red
                color: "black",
                border: "1px solid #4285F4", // Google Blue Border
                borderRadius: "6px",
                fontWeight: "bold",
                fontSize: "14px",
                cursor: "pointer",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start", // Align content to the left
                gap: "10px",
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google Logo"
                style={{ width: "20px", height: "20px" }}
              />
              <span
                style={{
                  flex: 1, // Take up remaining space
                  textAlign: "center", // Center the text
                }}
              >
                Sign in with Google
              </span>
            </button>
            <button 
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#0078D4", // Outlook Blue
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                fontSize: "14px",
                cursor: "pointer",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start", // Align content to the left
                gap: "10px",
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                alt="Outlook Logo"
                style={{ width: "20px", height: "20px" }}
              />
              <span
                style={{
                  flex: 1, // Take up remaining space
                  textAlign: "center", // Center the text
                }}
              >
                Sign in with Outlook
              </span>
            </button>
            <button
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "black", // iCloud Black Background
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                fontSize: "14px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start", // Align content to the left
                gap: "10px",
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg"
                alt="iCloud Logo"
                style={{ width: "20px", height: "20px" }}
              />
              <span
                style={{
                  flex: 1, // Take up remaining space
                  textAlign: "center", // Center the text
                }}
              >
                Sign in with iCloud
              </span>
            </button>
          </div>
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