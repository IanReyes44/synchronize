import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";
import CustomTuiCalendar from "./components/CustomTuiCalendar";
import CustomTuiModal from "./components/CustomTuiModal";
import LoginPage from "./components/LoginPage";

const attendees = [
  { id: "1", name: "Charlie" },
  { id: "2", name: "Ian" },
  { id: "3", name: "Alex" },
];

const colors = [
  {
    id: "1",
    color: "#ffffff",
    bgColor: "#34C38F",
    dragBgColor: "#34C38F",
    borderColor: "#34C38F",
  },
  {
    id: "2",
    color: "#ffffff",
    bgColor: "#3a70f0",
    dragBgColor: "#3a70f0",
    borderColor: "#3a70f0",
  },
  {
    id: "3",
    color: "#ffffff",
    bgColor: "#F2B34C",
    dragBgColor: "#F2B34C",
    borderColor: "#F2B34C",
  },
  {
    id: "4",
    color: "#ffffff",
    bgColor: "#F4696A",
    dragBgColor: "#F4696A",
    borderColor: "#F4696A",
  },
  {
    id: "5",
    color: "#ffffff",
    bgColor: "#74788D",
    dragBgColor: "#74788D",
    borderColor: "#74788D",
  },
];

const calendars = [
  { id: "1", name: "Family" },
  { id: "2", name: "Personal" },
  { id: "3", name: "School" },
  { id: "4", name: "Work" },
  { id: "5", name: "Other" },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modal, setModal] = useState(false);
  const [event, setEvent] = useState(null);
  const [schedules, setSchedules] = useState(() => {
    const storedEvents = localStorage.getItem("calendarEvents");
    return storedEvents ? JSON.parse(storedEvents) : [];
  });
  const childRef = useRef();
  const calendarInstRef = useRef();

  useEffect(() => {
    if (calendarInstRef.current) {
      calendarInstRef.current.clear();
      calendarInstRef.current.createSchedules(schedules);
      calendarInstRef.current.render();
    }
  }, [schedules]);

  const toggle = () => {
    setModal(!modal);
    setEvent(null);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const addEvent = (newEvent) => {
    const newSchedule = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Unique ID using timestamp and random alphanumeric string
      title: newEvent.title || `Untitled Event ${Date.now()}`, // Unique title if not provided
      calendarId: newEvent.calendarId || Math.floor(Math.random() * 5 + 1).toString(), // Random calendar ID between 1 and 5
      category: newEvent.isAllDay ? "allday" : "time",
      attendees: newEvent.attendees || [],
      isVisible: true,
      start: newEvent.start || new Date().toISOString(),
      end: newEvent.end || new Date(new Date().getTime() + 3600000).toISOString(), // Default end time is 1 hour after start
      isAllDay: newEvent.isAllDay || false,
      dueDateClass: "",
      location: newEvent.location || `Location ${Math.random().toString(36).substring(7)}`, // Random location
      state: newEvent.state || "Busy",
      body: newEvent.body || `Description ${Date.now()}`, // Unique description
    };

    const updatedSchedules = [...schedules, newSchedule];
    setSchedules(updatedSchedules);
    localStorage.setItem("calendarEvents", JSON.stringify(updatedSchedules));

    if (childRef.current) {
      childRef.current.createSchedule(newSchedule);
    }

    setModal(false); // Close the modal
  };

  const deleteEvent = (eventId) => {
    // Filter out the event with the specified ID
    const updatedSchedules = schedules.filter((event) => event.id !== eventId);

    // Update the state with the remaining events
    setSchedules(updatedSchedules);

    // Update localStorage with the remaining events
    localStorage.setItem("calendarEvents", JSON.stringify(updatedSchedules));

    // Remove the event from the calendar instance
    if (childRef.current) {
      childRef.current.deleteSchedule({ id: eventId });
    }

    console.log(`Deleted event with ID: ${eventId}`);
  };

  const editEvent = (updatedEvent) => {
    const updatedSchedules = schedules.map((event) =>
      event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event
    );
    setSchedules(updatedSchedules);
    localStorage.setItem("calendarEvents", JSON.stringify(updatedSchedules));

    if (childRef.current) {
      childRef.current.updateSchedule(updatedEvent, updatedEvent);
    }

    console.log("Edited event with ID:", updatedEvent.id);
  };

  const onBeforeCreateSchedule = (event) => {
    event.guide.clearGuideElement();
    setModal(true);
    setEvent(event);
  };

  const onBeforeUpdateSchedule = (event) => {
    const { schedule, changes } = event;

    if (changes) {
      const updatedEvent = { ...schedule, ...changes };
      editEvent(updatedEvent);
    }

    setModal(true);
    setEvent(event);
  };

  const onBeforeDeleteSchedule = (event) => {
    const { schedule } = event;
    deleteEvent(schedule.id);
  };

  const formatCalendars = calendars.map((element) => ({
    ...colors.find((element2) => element2.id === element.id),
    ...element,
  }));

  return (
    <div>
      {isLoggedIn ? (
        <>
          {/* Logout Button */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 1000,
            }}
          >
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
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "#a9a9a9")
              } // Darker color on hover
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "#707070")
              } // Reset color on mouse leave
            >
              LOGOUT
            </button>
          </div>

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
                  ? addEvent
                  : onBeforeUpdateSchedule,
              submitText:
                event?.triggerEventName === "mouseup" ? "Save" : "Update",
              calendars: formatCalendars,
              attendees,
              schedule: event?.schedule,
              startDate: event?.start,
              endDate: event?.end,
            }}
          />
        </>
      ) : (
        <LoginPage onLogin={handleLogin} attendees={attendees} />
      )}
    </div>
  );
}
