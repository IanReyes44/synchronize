import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Modal } from "reactstrap";

import DateRangePicker from "./DateRangePicker";

export default function CustomTuiModal({
  isOpen = false,
  toggle,
  onSubmit,
  submitText = "Save",
  calendars = [],
  attendees = [],
  schedule,
  startDate,
  endDate
}) {
  const [openSelectCalendars, setOpenSelectCalendars] = useState(false);
  const [openSelectAttendees, setOpenSelectAttendees] = useState(false);
  const wrapperSelectCalendarsRef = useRef(null);
  const wrapperSelectAttendeesRef = useRef(null);
  const dateRangePickerRef = useRef(null);
  const subjectRef = useRef(null);

  const [calendarId, setCalendarId] = useState(calendars[0].id);
  const [attendeeId, setAttendeeId] = useState(attendees[0].id);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [location, setLocation] = useState(""); // Add state for location
  const [newAttendees, setNewAttendees] = useState([]); // State for new attendees

  useLayoutEffect(() => {
    if (schedule) {
      setCalendarId(schedule.calendarId);
      setAttendeeId(
        attendees.find((element) => schedule.attendees.includes(element.name)).id
      );
      setTitle(schedule.title);
      setStart(schedule.start.toDate());
      setEnd(schedule.end.toDate());
      setLocation(schedule.location || ""); // Set the location to the saved location or an empty string
      dateRangePickerRef.current.setStartDate(schedule.start.toDate());
      dateRangePickerRef.current.setEndDate(schedule.end.toDate());
      setNewAttendees(schedule.attendees.slice(1) || []); // Exclude the first attendee (main event creator)
    }
    if (startDate && endDate) {
      dateRangePickerRef.current.setStartDate(startDate.toDate());
      dateRangePickerRef.current.setEndDate(endDate.toDate());
    }
    return () => {};
  }, [schedule, startDate, endDate]);

  function reset() {
    setCalendarId(calendars[0].id);
    setAttendeeId(attendees[0].id);
    setTitle("");
    setStart(new Date());
    setEnd(new Date());
    setLocation(""); // Reset location
    dateRangePickerRef.current.setStartDate(new Date());
    dateRangePickerRef.current.setEndDate(new Date());
    setNewAttendees([]); // Reset new attendees
  }

  function handleAddAttendee(newAttendee) {
    if (!newAttendees.includes(newAttendee)) {
      setNewAttendees((prev) => [...prev, newAttendee]);
    }
  }

  function handleRemoveAttendee(attendeeToRemove) {
    setNewAttendees((prev) => prev.filter((attendee) => attendee !== attendeeToRemove));
  }

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => {
        toggle();
        reset();
      }}
      centered
    >
      <div className="tui-full-calendar-popup-container">
        <div style={{ display: "flex" }}>
          {/* Category */}
          <div
            ref={wrapperSelectCalendarsRef}
            className={`tui-full-calendar-popup-section tui-full-calendar-dropdown tui-full-calendar-close tui-full-calendar-section-calendar ${
              openSelectCalendars && "tui-full-calendar-open"
            }`}
          >
            <button
              onClick={() => setOpenSelectCalendars(!openSelectCalendars)}
              className="tui-full-calendar-button tui-full-calendar-dropdown-button tui-full-calendar-popup-section-item"
            >
              <span
                className="tui-full-calendar-icon tui-full-calendar-calendar-dot"
                style={{
                  backgroundColor: calendars.find(
                    (element) => element.id === calendarId
                  ).bgColor
                }}
              />
              <span
                id="tui-full-calendar-schedule-calendar"
                className="tui-full-calendar-content"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                {calendars.find((element) => element.id === calendarId).name}
              </span>
              <span className="tui-full-calendar-icon tui-full-calendar-dropdown-arrow" />
            </button>
            <ul
              className="tui-full-calendar-dropdown-menu"
              style={{ zIndex: 1004 }}
            >
              {calendars.map((element, i) => (
                <li
                  onClick={() => {
                    setCalendarId(element.id);
                    setOpenSelectCalendars(false);
                  }}
                  key={i}
                  className="tui-full-calendar-popup-section-item tui-full-calendar-dropdown-menu-item"
                  data-calendar-id={element.id}
                >
                  <span
                    className="tui-full-calendar-icon tui-full-calendar-calendar-dot"
                    style={{ backgroundColor: element.bgColor }}
                  />
                  <span className="tui-full-calendar-content">
                    {element.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <span className="tui-full-calendar-section-date-dash">-</span>
          {/* User */}
          <div
            ref={wrapperSelectAttendeesRef}
            className={`tui-full-calendar-popup-section tui-full-calendar-dropdown tui-full-calendar-close tui-full-calendar-section-state ${
              openSelectAttendees && "tui-full-calendar-open"
            }`}
          >
            <button
              onClick={() => setOpenSelectAttendees(!openSelectAttendees)}
              className="tui-full-calendar-button tui-full-calendar-dropdown-button tui-full-calendar-popup-section-item"
            >
              <span className="tui-full-calendar-icon tui-full-calendar-ic-state" />
              <span
                id="tui-full-calendar-schedule-state"
                className="tui-full-calendar-content"
              >
                {attendees.find((element) => element.id === attendeeId).name}
              </span>
              <span className="tui-full-calendar-icon tui-full-calendar-dropdown-arrow" />
            </button>
            <ul
              className="tui-full-calendar-dropdown-menu"
              style={{ zIndex: 1004 }}
            >
              {attendees.map((element, i) => (
                <li
                  onClick={() => {
                    setAttendeeId(element.id);
                    setOpenSelectAttendees(false);
                  }}
                  key={i}
                  className="tui-full-calendar-popup-section-item tui-full-calendar-dropdown-menu-item"
                >
                  <span className="tui-full-calendar-icon tui-full-calendar-none" />
                  <span className="tui-full-calendar-content">
                    {element.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Title */}
        <div className="tui-full-calendar-popup-section">
          <div className="tui-full-calendar-popup-section-item tui-full-calendar-section-location">
            <span className="tui-full-calendar-icon tui-full-calendar-ic-title" />
            <input
              ref={subjectRef}
              id="tui-full-calendar-schedule-title"
              className="tui-full-calendar-content"
              placeholder="Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
        </div>

        {/* Location */}
        <div className="tui-full-calendar-popup-section">
          <div className="tui-full-calendar-popup-section-item tui-full-calendar-section-location">
            <span className="tui-full-calendar-icon tui-full-calendar-ic-location" />
            <input
              id="tui-full-calendar-schedule-location"
              className="tui-full-calendar-content"
              placeholder="Location"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </div>
        </div>

        {/* Date Range Picker */}
        <div className="tui-full-calendar-popup-section">
          <DateRangePicker
            ref={dateRangePickerRef}
            date={new Date()}
            start={start}
            end={end}
            format="yyyy/MM/dd HH:mm"
            timePicker={{
              layoutType: "tab",
              inputType: "spinbox"
            }}
            onChange={(e) => {
              setStart(e[0]);
              setEnd(e[1]);
            }}
          />
        </div>

        {/* Attendee Input Section */}
        <div className="add-attendees-section">
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Name"
              style={{
                border: "1px solid #d5d5d5",
                borderRadius: "2px 0 0 4px",
                padding: "5px 10px",
                outline: "none",
                flex: "1",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  handleAddAttendee(e.target.value.trim());
                  e.target.value = ""; // Clear input
                }
              }}
            />
            <button
              onClick={() => {
                const input = document.querySelector(".add-attendees-section input");
                if (input && input.value.trim()) {
                  handleAddAttendee(input.value.trim());
                  input.value = ""; // Clear input
                }
              }}
              style={{
                border: "1px solid #d5d5d5",
                borderRadius: "0 4px 4px 0",
                padding: "5px 10px",
                backgroundColor: "white",
                color: "black",
                cursor: "pointer",
              }}
            >
              Add
            </button>
          </div>
          <div
            className="attendees-list"
            style={{ display: "flex", marginTop: "10px", flexWrap: "wrap" }}
          >
            {newAttendees.map((attendee, index) => (
              <div
                key={index}
                className="attendee-bubble"
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "15px",
                  padding: "5px 10px",
                  fontSize: "12px",
                  marginRight: "5px",
                  marginBottom: "5px",
                }}
              >
                {attendee}
                <button
                  className="remove-attendee"
                  onClick={() => handleRemoveAttendee(attendee)}
                  style={{
                    marginLeft: "5px",
                    background: "none",
                    border: "none",
                    color: "grey",
                    cursor: "pointer",
                  }}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="tui-full-calendar-section-button-save">
          <button
            onClick={() => {
              if (!subjectRef.current.value) {
                subjectRef.current.focus();
              } else {
                const event = {
                  calendarId,
                  attendeeId,
                  attendees: [
                    ...attendees
                      .filter((element) => element.id === attendeeId)
                      .map(({ name }) => name),
                    ...newAttendees // Include new attendees
                  ],
                  title,
                  start,
                  end,
                  location,
                  ...calendars.find((element) => element.id === calendarId)
                };
                onSubmit(event);
              }
            }}
            className="tui-full-calendar-button tui-full-calendar-confirm tui-full-calendar-popup-save"
          >
            <span>{submitText}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
