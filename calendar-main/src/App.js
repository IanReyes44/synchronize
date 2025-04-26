import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";
import CustomTuiCalendar from "./components/CustomTuiCalendar";
import CustomTuiModal from "./components/CustomTuiModal";
import LoginPage from "./components/LoginPage";
import SettingsPage from "./components/SettingsPage";


const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 60));
const attendees = [
  { id: "1", name: "Charlie"},
  { id: "2", name: "Ian" },
  { id: "3", name: "Alex" },
];

// Example events
const schedules = [
  {
    id: "2",
    title: "Project Meeting",
    calendarId: "3",
    category: "time",
    attendees: ["Charlie", "Alex"],
    isVisible: true,
    start: new Date(2025, 3, 25, 10, 0), // April 25, 2025, 10:00 AM
    end: new Date(2025, 3, 25, 11, 30), // April 25, 2025, 11:30 AM
    location: "Conference Room A"
  },
  {
    id: "3",
    title: "Doctor's Appointment",
    calendarId: "4",
    category: "time",
    attendees: ["Charlie"],
    isVisible: true,
    start: new Date(2025, 3, 26, 14, 0), // April 26, 2025, 2:00 PM
    end: new Date(2025, 3, 26, 15, 0), // April 26, 2025, 3:00 PM
    location: "City Clinic, Room 203"
  },
  {
    id: "4",
    title: "Team Lunch",
    calendarId: "2",
    category: "time",
    attendees: ["Charlie", "Ian"],
    isVisible: true,
    start: new Date(2025, 3, 27, 12, 0), // April 27, 2025, 12:00 PM
    end: new Date(2025, 3, 27, 13, 30), // April 27, 2025, 1:30 PM
    location: "Downtown Bistro"
  },
  {
    id: "5",
    title: "Workshop",
    calendarId: "3",
    category: "time",
    attendees: ["Charlie", "Alex"],
    isVisible: true,
    start: new Date(2025, 3, 28, 9, 0), // April 28, 2025, 9:00 AM
    end: new Date(2025, 3, 28, 12, 0), // April 28, 2025, 12:00 PM
    location: "Tech Hub, Room 101"
  },
  {
    id: "6",
    title: "Client Presentation",
    calendarId: "4",
    category: "time",
    attendees: ["Charlie", "Ian"],
    isVisible: true,
    start: new Date(2025, 4, 1, 15, 0), // May 1, 2025, 3:00 PM
    end: new Date(2025, 4, 1, 16, 30), // May 1, 2025, 4:30 PM
    location: "Client's Office, Boardroom"
  },
  {
    id: "7",
    title: "Gym Session",
    calendarId: "2",
    category: "time",
    attendees: ["Charlie"],
    isVisible: true,
    start: new Date(2025, 4, 3, 18, 0), // May 3, 2025, 6:00 PM
    end: new Date(2025, 4, 3, 19, 0), // May 3, 2025, 7:00 PM
    location: "Fitness Center"
  },
  {
    id: "8",
    title: "Birthday Party",
    calendarId: "5",
    category: "time",
    attendees: ["Charlie", "Ian", "Alex"],
    isVisible: true,
    start: new Date(2025, 4, 5, 19, 0), // May 5, 2025, 7:00 PM
    end: new Date(2025, 4, 5, 22, 0), // May 5, 2025, 10:00 PM
    location: "Charlie's House"
  },
  {
    id: "9",
    title: "Weekly Review",
    calendarId: "3",
    category: "time",
    attendees: ["Charlie", "Ian"],
    isVisible: true,
    start: new Date(2025, 4, 7, 10, 0), // May 7, 2025, 10:00 AM
    end: new Date(2025, 4, 7, 11, 0), // May 7, 2025, 11:00 AM
    location: "Office, Room 302"
  },
  {
    id: "10",
    title: "Conference",
    calendarId: "4",
    category: "time",
    attendees: ["Charlie", "Alex"],
    isVisible: true,
    start: new Date(2025, 4, 10, 9, 0), // May 10, 2025, 9:00 AM
    end: new Date(2025, 4, 10, 17, 0), // May 10, 2025, 5:00 PM
    location: "Convention Center, Hall B"
  },
  {
    id: "11",
    title: "Hackathon",
    calendarId: "3",
    category: "time",
    attendees: ["Charlie", "Ian", "Alex"],
    isVisible: true,
    start: new Date(2025, 4, 12, 9, 0), // May 12, 2025, 9:00 AM
    end: new Date(2025, 4, 13, 18, 0), // May 13, 2025, 6:00 PM
    location: "Tech Park, Building C"
  },
  {
    id: "12",
    title: "Vacation",
    calendarId: "2",
    category: "time",
    attendees: ["Charlie"],
    isVisible: true,
    start: new Date(2025, 4, 15, 8, 0), // May 15, 2025, 8:00 AM
    end: new Date(2025, 4, 20, 20, 0), // May 20, 2025, 8:00 PM
    location: "Hawaii"
  },
  {
    id: "13",
    title: "Team Offsite",
    calendarId: "4",
    category: "time",
    attendees: ["Charlie", "Ian"],
    isVisible: true,
    start: new Date(2025, 4, 22, 9, 0), // May 22, 2025, 9:00 AM
    end: new Date(2025, 4, 23, 17, 0), // May 23, 2025, 5:00 PM
    location: "Mountain Resort"
  },
  {
    id: "14",
    title: "Breakfast Meeting",
    calendarId: "3",
    category: "time",
    attendees: ["Charlie", "Alex"],
    isVisible: true,
    start: new Date(2025, 3, 25, 8, 30), // April 25, 2025, 8:30 AM
    end: new Date(2025, 3, 25, 9, 30), // April 25, 2025, 9:30 AM
    location: "Cafe Downtown"
  },
  {
    id: "15",
    title: "Design Review",
    calendarId: "2",
    category: "time",
    attendees: ["Charlie", "Ian"],
    isVisible: true,
    start: new Date(2025, 3, 25, 12, 0), // April 25, 2025, 12:00 PM
    end: new Date(2025, 3, 25, 13, 0), // April 25, 2025, 1:00 PM
    location: "Design Studio"
  },
  {
    id: "16",
    title: "Follow-up Doctor's Appointment",
    calendarId: "4",
    category: "time",
    attendees: ["Charlie"],
    isVisible: true,
    start: new Date(2025, 4, 7, 15, 0), // April 27, 2025, 3:00 PM
    end: new Date(2025, 4, 7, 15, 30), // April 27, 2025, 3:30 PM
    location: "City Clinic, Room 204"
  },
  {
    id: "17",
    title: "Brainstorm Session",
    calendarId: "3",
    category: "time",
    attendees: ["Charlie", "Alex"],
    isVisible: true,
    start: new Date(2025, 4, 1, 10, 0), // May 1, 2025, 10:00 AM
    end: new Date(2025, 4, 1, 11, 30), // May 1, 2025, 11:30 AM
    location: "Office, Room 101"
  },
  {
    id: "18",
    title: "Evening Walk",
    calendarId: "2",
    category: "time",
    attendees: ["Charlie"],
    isVisible: true,
    start: new Date(2025, 4, 1, 19, 0), // May 1, 2025, 7:00 PM
    end: new Date(2025, 4, 1, 19, 45), // May 1, 2025, 7:45 PM
    location: "Neighborhood Park"
  },
  {
    id: "19",
    title: "Friends' Reunion",
    calendarId: "5",
    category: "time",
    attendees: ["Charlie", "Ian", "Alex"],
    isVisible: true,
    start: new Date(2025, 4, 5, 13, 0), // May 5, 2025, 1:00 PM
    end: new Date(2025, 4, 5, 16, 0), // May 5, 2025, 4:00 PM
    location: "Charlie's Backyard"
  },
  {
    id: "20",
    title: "Prep for Hackathon",
    calendarId: "3",
    category: "time",
    attendees: ["Charlie", "Alex"],
    isVisible: true,
    start: new Date(2025, 4, 11, 15, 0), // May 11, 2025, 3:00 PM
    end: new Date(2025, 4, 11, 18, 0), // May 11, 2025, 6:00 PM
    location: "Tech Hub, Room 202"
  }
];

const colors = [
  {
    id: "1",
    color: "#ffffff",
    bgColor: "#34C38F",
    dragBgColor: "#34C38F",
    borderColor: "#34C38F"
  },
  {
    id: "2",
    color: "#ffffff",
    bgColor: "#3a70f0",
    dragBgColor: "#3a70f0",
    borderColor: "#3a70f0"
  },
  {
    id: "3",
    color: "#ffffff",
    bgColor: "#F2B34C",
    dragBgColor: "#F2B34C",
    borderColor: "#F2B34C"
  },
  {
    id: "4",
    color: "#ffffff",
    bgColor: "#F4696A",
    dragBgColor: "#F4696A",
    borderColor: "#F4696A"
  },
  {
    id: "5",
    color: "#ffffff",
    bgColor: "#74788D",
    dragBgColor: "#74788D",
    borderColor: "#74788D"
  },
  {
    id: "6",
    color: "#000000",
    bgColor: "#57b0ff",
    dragBgColor: "#57b0ff",
    borderColor: "#57b0ff"
  },
  {
    id: "7",
    color: "#000000",
    bgColor: "#140f85",
    dragBgColor: "#140f85",
    borderColor: "#140f85"
  },
  {
    id: "8",
    color: "#000000",
    bgColor: "black",
    dragBgColor: "black",
    borderColor: "black"
  }

];

const calendars = [
  {
    id: "1",
    name: "Family"
  },
  {
    id: "2",
    name: "Personal"
  },
  {
    id: "3",
    name: "School"
  },
  {
    id: "4",
    name: "Work"
  },
  {
    id: "5",
    name: "Other"
  },
  {
    id: "6",
    name: "Google"
  },
  {
    id: "7",
    name: "Outlook"
  },
  {
    id: "8",
    name: "iCloud"
  }
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [currentUser, setCurrentUser] = useState(""); // Add state for the current user
  const [modal, setModal] = useState(false);
  const [event, setEvent] = useState(null);
  const [showSettings, setShowSettings] = useState(false); // State to toggle settings page
  const [settings, setSettings] = useState({ theme: "light", notifications: true }); // State for settings
  const childRef = useRef();

  const toggle = () => {
    setModal(!modal);
    setEvent(null);
  };

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setCurrentUser(username); // Set the logged-in user's name
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(""); // Clear the current user
  };

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings); // Save new settings
    setShowSettings(false); // Close settings page
  };

  const handleCancelSettings = () => {
    setShowSettings(false); // Close settings page without saving
  };

  function onBeforeCreateSchedule(event) {
    event.guide.clearGuideElement();
    setModal(true);
    setEvent(event);
  }

  function handleCreateSchedule(newEvent) {
    const result = true;

    if (result) {
      const newSchedule = {
        ...event,
        id: schedules.length,
        title: newEvent.title,
        calendarId: newEvent.calendarId,
        category: event.isAllDay ? "allday" : "time",
        attendees: newEvent.attendees,
        isVisible: true,
        start: newEvent.start,
        end: newEvent.end,
        location: newEvent.location, // Include location
        isAllDay: event.isAllDay,
        dueDateClass: "",
        state: event.state,
        body: event.body,
      };

      childRef.current.createSchedule(newSchedule);
      setModal(false);
    }
  }

  function onBeforeUpdateSchedule(event) {
    const { schedule, changes } = event;

    if (changes) {
      const result = true;
      if (result) {
        return childRef.current.updateSchedule(schedule, changes);
      }
    }

    setModal(true);
    setEvent(event);
  }

  async function handleUpdateSchedule(updateEvent) {
    const result = true;

    if (result) {
      const { schedule } = event;
      await childRef.current.deleteSchedule(schedule);

      const newSchedule = {
        ...event,
        id: schedules.length + 2,
        title: updateEvent.title,
        calendarId: updateEvent.calendarId,
        category: event.isAllDay ? "allday" : "time",
        attendees: updateEvent.attendees,
        isVisible: true,
        start: updateEvent.start,
        end: updateEvent.end,
        location: updateEvent.location, // Include location
        isAllDay: event.isAllDay,
        dueDateClass: "",
        state: event.state,
        body: event.body,
      };

      await childRef.current.createSchedule(newSchedule);

      setModal(false);
    }
  }

  function onBeforeDeleteSchedule(event) {
    const result = true;

    if (result) {
      const { schedule } = event;
      childRef.current.deleteSchedule(schedule);
    }

    return true;
  }

  const formatCalendars = calendars.map((element) => ({
    ...colors.find((element2) => element2.id === element.id),
    ...element,
  }));

  return (
    <div>
      {isLoggedIn ? (
        <>
          {/* Settings and Logout Buttons */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 1000,
              display: "flex",
              gap: "10px", // Add spacing between buttons
            }}
          >
            <button
              onClick={() => setShowSettings(true)} // Open settings page
              style={{
                padding: "10px 20px",
                backgroundColor: "#2C2C54",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', // Updated font family
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#4B4B8A")} // Darker color on hover
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#2C2C54")} // Reset color on mouse leave
            >
              SETTINGS
            </button>
            <button
              onClick={handleLogout}
              style={{
                padding: "10px 20px",
                backgroundColor: "#707070",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', // Updated font family
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#a9a9a9")} // Darker color on hover
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#707070")} // Reset color on mouse leave
            >
              LOGOUT
            </button>
          </div>

          {showSettings ? (
            <SettingsPage
              onSaveSettings={handleSaveSettings}
              onCancel={handleCancelSettings}
              currentUser={currentUser}
            />
          ) : (
            <>
              <CustomTuiCalendar
                ref={childRef}
                {...{
                  isReadOnly: false,
                  showSlidebar: true,
                  showMenu: true,
                  useCreationPopup: false,
                  calendars: formatCalendars,
                  schedules,
                  onBeforeCreateSchedule,
                  onBeforeUpdateSchedule,
                  onBeforeDeleteSchedule,
                }}
              />
              <CustomTuiModal
                {...{
                  isOpen: modal,
                  toggle,
                  onSubmit:
                    event?.triggerEventName === "mouseup"
                      ? handleCreateSchedule
                      : handleUpdateSchedule,
                  submitText: event?.triggerEventName === "mouseup" ? "Save" : "Update",
                  calendars: formatCalendars,
                  attendees,
                  schedule: event?.schedule,
                  startDate: event?.start,
                  endDate: event?.end,
                  location: event?.schedule?.location || "", // Pass location to the modal
                }}
              />
            </>
          )}
        </>
      ) : (
        <LoginPage onLogin={handleLogin} attendees={attendees} />
      )}
    </div>
  );
}