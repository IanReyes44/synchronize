import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";
import CustomTuiCalendar from "./components/CustomTuiCalendar";
import CustomTuiModal from "./components/CustomTuiModal";

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

//example event
const schedules = [
  {
    id: "1",
    title: "Midterm Exam",
    calendarId: "1",
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
    bgColor: "#F4696A",
    dragBgColor: "#F4696A",
    borderColor: "#F4696A"
  },
  {
    id: "3",
    color: "#ffffff",
    bgColor: "#00a9ff",
    dragBgColor: "#00a9ff",
    borderColor: "#00a9ff"
  },
  {
    id: "4",
    color: "#ffffff",
    bgColor: "#F2B34C",
    dragBgColor: "#F2B34C",
    borderColor: "#F2B34C"
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
    bgColor: "#FFFFFF",
    dragBgColor: "#FFFFFF",
    borderColor: "#FFFFFF"
  }
];

const calendars = [
  {
    id: "1",
    name: "Events"
  },
  {
    id: "2",
    name: "Google"
  },
  {
    id: "3",
    name: "Outlook"
  },
];

export default function App() {
  const [modal, setModal] = useState(false);
  const [event, setEvent] = useState(null);
  const childRef = useRef();

  const toggle = () => {
    setModal(!modal);
    setEvent(null);
  };

  function onBeforeCreateSchedule(event) {
    // console.log('onBeforeCreateSchedule', event)
    event.guide.clearGuideElement();
    setModal(true);
    setEvent(event);
  }

  function handleCreateSchedule(newEvent) {
    // call api
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
    // console.log('onBeforeUpdateSchedule', event)

    const { schedule, changes } = event;

    // resize & drag n drop
    if (changes) {
      // call api
      const result = true;
      if (result) {
        return childRef.current.updateSchedule(schedule, changes);
      }
    }

    setModal(true);
    setEvent(event);
  }

  async function handleUpdateSchedule(updateEvent) {
    // call api
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
    </div>
  );
}
