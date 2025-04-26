import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";
import CustomTuiCalendar from "./components/CustomTuiCalendar";
import CustomTuiModal from "./components/CustomTuiModal";
import LoginPage from "./components/LoginPage";

const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 60));
const attendees = [
  {
    id: "1",
    name: "Charlie"
  },
  { id: "2", name: "Ian" },
  { id: "3", name: "Alex" },
];

// Example event
const schedules = [
  {
    id: "1",
    title: "Midterm Exam",
    calendarId: "2",
    category: "time",
    attendees: ["Charlie", "Ian, Alex"],
    isVisible: true,
    start,
    end
  },
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
    color: "#ffffff",
    bgColor: "#343A40",
    dragBgColor: "#343A40",
    borderColor: "#343A40"
  },
  {
    id: "7",
    color: "#000000",
    bgColor: "#343A40",
    dragBgColor: "#343A40",
    borderColor: "#343A40"
  },
  {
    id: "8",
    color: "#000000",
    bgColor: "#343A40",
    dragBgColor: "#343A40",
    borderColor: "#343A40"
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
  const [modal, setModal] = useState(false);
  const [event, setEvent] = useState(null);
  const childRef = useRef();

  const toggle = () => {
    setModal(!modal);
    setEvent(null);
  };

  const handleLogin = () => {
    setIsLoggedIn(true); // Set login status to true
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

        isAllDay: event.isAllDay,
        dueDateClass: "",
        location: event.location,
        state: event.state,
        body: event.body
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

        isAllDay: event.isAllDay,
        dueDateClass: "",
        location: event.location,

        state: event.state,
        body: event.body
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
    ...element
  }));

  return (
    <div>
      {isLoggedIn ? (
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
              onBeforeDeleteSchedule
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
              endDate: event?.end
            }}
          />
        </>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}
