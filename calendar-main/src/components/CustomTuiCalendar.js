import React, {
  useRef,
  useLayoutEffect,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle
} from "react";
import { Route } from "react-router-dom"; // Import Route for routing
import TuiCalendar from "tui-calendar";
import moment from "moment";

import "tui-calendar/dist/tui-calendar.css";

import "./styles.css";

const CustomTuiCalendar = forwardRef(
  (
    {
      height = "800px",
      defaultView = "week",
      calendars = [],
      schedules = [],
      isReadOnly = true,
      showSlidebar = false,
      showMenu = false,
      onCreate,
      createText = "New schedule",
      onBeforeCreateSchedule = () => false,
      onBeforeUpdateSchedule = () => false,
      onBeforeDeleteSchedule = () => false,
      ...rest
    },
    ref
  ) => {
    const calendarInstRef = useRef(null);
    const tuiRef = useRef(null);
    const wrapperRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [renderRange, setRenderRange] = useState("");
    const [workweek, setWorkweek] = useState(true);
    const [narrowWeekend, setNarrowWeekend] = useState(true);
    const [startDayOfWeek, setStartDayOfWeek] = useState(1);
    const [type, setType] = useState("Weekly");
    const [checkedCalendars, setCheckedCalendars] = useState(
      calendars.map((element) => ({ ...element, isChecked: true }))
    );
    const [filterSchedules, setFilterSchedules] = useState(schedules);

    useImperativeHandle(ref, () => ({
      getAlert() {
        alert("getAlert from Child");
      },
      createSchedule,
      updateSchedule,
      deleteSchedule
    }));

    useEffect(() => {
      calendarInstRef.current = new TuiCalendar(tuiRef.current, {
        useDetailPopup: true,
        useCreationPopup: true,
        template: {
          allday: function (schedule) {
            return _getTimeTemplate(schedule, true);
          },
          alldayTitle: function () {
            return '<span class="tui-full-calendar-left-content">ALL DAY</span>';
          },
          time: function (schedule) {
            return _getTimeTemplate(schedule, false);
          },
          goingDuration: function (schedule) {
            return (
              '<span class="calendar-icon ic-travel-time"></span>' +
              schedule.goingDuration +
              "min."
            );
          },
          comingDuration: function (schedule) {
            return (
              '<span class="calendar-icon ic-travel-time"></span>' +
              schedule.comingDuration +
              "min."
            );
          },
          monthMoreTitleDate: function (date, dayname) {
            var day = date.split(".")[2];

            return (
              '<span class="tui-full-calendar-month-more-title-day">' +
              day +
              '</span> <span class="tui-full-calendar-month-more-title-day-label">' +
              dayname +
              "</span>"
            );
          },
          monthMoreClose: function () {
            return '<span class="tui-full-calendar-icon tui-full-calendar-ic-close"></span>';
          },
          monthGridHeader: function (dayModel) {
            var date = parseInt(dayModel.date.split("-")[2], 10);
            var classNames = ["tui-full-calendar-weekday-grid-date "];

            if (dayModel.isToday) {
              classNames.push("tui-full-calendar-weekday-grid-date-decorator");
            }

            return (
              '<span class="' + classNames.join(" ") + '">' + date + "</span>"
            );
          },
          monthGridHeaderExceed: function (hiddenSchedules) {
            return (
              '<span class="weekday-grid-more-schedules">+' +
              hiddenSchedules +
              "</span>"
            );
          },
          monthGridFooter: function () {
            return "";
          },
          monthGridFooterExceed: function (hiddenSchedules) {
            return "";
          },
          monthDayname: function (model) {
            return model.label.toString().toLocaleUpperCase();
          },
          weekDayname: function (model) {
            return (
              '<span class="tui-full-calendar-dayname-date">' +
              model.date +
              '</span>&nbsp;&nbsp;<span class="tui-full-calendar-dayname-name">' +
              model.dayName +
              "</span>"
            );
          },
          weekGridFooterExceed: function (hiddenSchedules) {
            return "+" + hiddenSchedules;
          },
          dayGridTitle: function (viewName) {
            var title = "";
            switch (viewName) {
              case "allday":
                title =
                  '<span class="tui-full-calendar-left-content">ALL DAY</span>';
                break;
              default:
                break;
            }

            return title;
          },
          collapseBtnTitle: function () {
            return '<span class="tui-full-calendar-icon tui-full-calendar-ic-arrow-solid-top"></span>';
          },
          timegridDisplayPrimaryTime: function (time) {
            var meridiem = "AM";
            var hour = time.hour;

            if (time.hour >= 12) {
              meridiem = "PM";
              if (time.hour > 12) {
                hour = time.hour - 12;
              }
            }

            return hour + " " + meridiem;
          },
          timegridCurrentTime: function (timezone) {
            var templates = [];

            if (timezone.dateDifference) {
              templates.push(
                "[" +
                  timezone.dateDifferenceSign +
                  timezone.dateDifference +
                  "]<br>"
              );
            }

            templates.push(moment(timezone.hourmarker).format("hh:mm A"));

            return templates.join("");
          },
          popupIsAllDay: function () {
            return "All Day";
          },
          popupStateFree: function () {
            return "Free";
          },
          popupStateBusy: function () {
            return "Busy";
          },
          titlePlaceholder: function () {
            return "Subject";
          },
          locationPlaceholder: function () {
            return "Location";
          },
          startDatePlaceholder: function () {
            return "Start date";
          },
          endDatePlaceholder: function () {
            return "End date";
          },
          popupSave: function () {
            return "Save";
          },
          popupUpdate: function () {
            return "Update";
          },
          popupDetailDate: function (isAllDay, start, end) {
            var isSameDate = moment(start).isSame(end);
            var endFormat = (isSameDate ? "" : "MM/DD/YYYY ") + "hh:mm A";

            if (isAllDay) {
              return (
                moment(start).format("MM/DD/YYYY") +
                (isSameDate ? "" : " - " + moment(end).format("MM/DD/YYYY"))
              );
            }

            return (
              moment(start.toDate()).format("MM/DD/YYYY hh:mm A") +
              " - " +
              moment(end.toDate()).format(endFormat)
            );
          },
          popupDetailLocation: function (schedule) {
            return "Location : " + schedule.location;
          },
          popupDetailState: function (schedule) {
            return "State : " + schedule.state || "Busy";
          },
          popupDetailRepeat: function (schedule) {
            return "Repeat : " + schedule.recurrenceRule;
          },
          popupDetailBody: function (schedule) {
            return "Body : " + schedule.body;
          },
          popupEdit: function () {
            return "Edit";
          },
          popupDelete: function () {
            return "Delete";
          }
        },
        calendars,
        ...rest
      });
      setRenderRangeText();
      // render schedules
      calendarInstRef.current.clear();
      calendarInstRef.current.createSchedules(filterSchedules, true);
      calendarInstRef.current.render();

      calendarInstRef.current.on("beforeCreateSchedule", function (event) {
        onBeforeCreateSchedule(event);
      });
      calendarInstRef.current.on("beforeUpdateSchedule", function (event) {
        onBeforeUpdateSchedule(event);
      });
      calendarInstRef.current.on("beforeDeleteSchedule", function (event) {
        onBeforeDeleteSchedule(event);
      });
      calendarInstRef.current.on("clickSchedule", function (event) {
        // open detail view
      });
      calendarInstRef.current.on("clickDayname", function (event) {
        if (calendarInstRef.current.getViewName() === "week") {
          calendarInstRef.current.setDate(new Date(event.date));
          calendarInstRef.current.changeView("day", true);
        }
      });

      calendarInstRef.current.on("clickMore", function (event) {
        // handle click more
      });

      calendarInstRef.current.on("clickTimezonesCollapseBtn", function (
        timezonesCollapsed
      ) {
        // handle timezones collapse
      });

      calendarInstRef.current.on("afterRenderSchedule", function (event) {
        // handle after render schedule
      });

      return () => {
        calendarInstRef.current.destroy();
      };
    }, [tuiRef, schedules]);

    useLayoutEffect(() => {
      // before render
    });

    function currentCalendarDate(format) {
      var currentDate = moment([
        calendarInstRef.current.getDate().getFullYear(),
        calendarInstRef.current.getDate().getMonth(),
        calendarInstRef.current.getDate().getDate()
      ]);

      return currentDate.format(format);
    }

    function setRenderRangeText() {
      var options = calendarInstRef.current.getOptions();
      var viewName = calendarInstRef.current.getViewName();

      var html = [];
      if (viewName === "day") {
        html.push(currentCalendarDate("MM/DD/YYYY"));
      } else if (
        viewName === "month" &&
        (!options.month.visibleWeeksCount ||
          options.month.visibleWeeksCount > 4)
      ) {
        html.push(currentCalendarDate("MM/YYYY"));
      } else {
        html.push(
          moment(calendarInstRef.current.getDateRangeStart().getTime()).format(
            "MM/DD/YYYY"
          )
        );
        html.push(" ~ ");
        html.push(
          moment(calendarInstRef.current.getDateRangeEnd().getTime()).format(
            "MM/DD"
          )
        );
      }
      setRenderRange(html.join(""));
    }

    function _getTimeTemplate(schedule, isAllDay) {
      var html = [];

      if (!isAllDay) {
        html.push(
          "<strong>" +
            moment(schedule.start.toDate()).format("hh:mm A") +
            "</strong> "
        );
      }
      if (schedule.isPrivate) {
        html.push('<span class="calendar-font-icon ic-lock-b"></span>');
        html.push(" Private");
      } else {
        if (schedule.isReadOnly) {
          html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
        } else if (schedule.recurrenceRule) {
          html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
        } else if (schedule.attendees.length) {
          html.push('<span class="calendar-font-icon ic-user-b"></span>');
        } else if (schedule.location) {
          html.push('<span class="calendar-font-icon ic-location-b"></span>');
        }

        html.push(" " + schedule.title);
      }

      return html.join("");
    }

    useEffect(() => {
      document.addEventListener("click", handleClick, false);

      return () => {
        document.removeEventListener("click", handleClick, false);
      };
    });

    const handleClick = (e) => {
      if (wrapperRef.current?.contains(e.target)) {
        // inside click
        return;
      }
      // outside click
      setOpen(false);
    };

    const handleAllChecked = (event) => {
      const cloneCheckedCalendars = [...checkedCalendars];
      cloneCheckedCalendars.forEach(
        (element) => (element.isChecked = event.target.checked)
      );
      setCheckedCalendars(cloneCheckedCalendars);
      filterCalendar(cloneCheckedCalendars);
    };

    const handleCheckChildElement = (event) => {
      const cloneCheckedCalendars = [...checkedCalendars];
      cloneCheckedCalendars.forEach((element) => {
        if (element.id === event.target.value)
          element.isChecked = event.target.checked;
      });
      setCheckedCalendars(cloneCheckedCalendars);
      filterCalendar(cloneCheckedCalendars);
    };

    const filterCalendar = (cloneCheckedCalendars) => {
      const filterCalendars = cloneCheckedCalendars
        .filter((element) => element.isChecked === false)
        .map((item) => item.id);
      const cloneSchedules = filterSchedules.filter((element) => {
        return filterCalendars.indexOf(element.calendarId) === -1;
      });

      // rerender
      calendarInstRef.current.clear();
      calendarInstRef.current.createSchedules(cloneSchedules, true);
      calendarInstRef.current.render();
    };

    function createSchedule(schedule) {
      console.log("createSchedule");

      // Add the new schedule to the calendar instance
      calendarInstRef.current.createSchedules([schedule]);

      // Update the filterSchedules state with the new schedule
      setFilterSchedules((prevState) => [...prevState, schedule]);

      // Re-render the calendar to reflect the new schedule
      calendarInstRef.current.render();
    }

    function updateSchedule(schedule, changes) {
      console.log("updateSchedule");

      calendarInstRef.current.updateSchedule(
        schedule.id,
        schedule.calendarId,
        changes
      );
      const cloneFilterSchedules = [...filterSchedules];
      setFilterSchedules((prevState) =>
        cloneFilterSchedules.map((item) => {
          if (item.id === schedule.id) {
            return { ...item, ...changes };
          }
          return item;
        })
      );
    }

    function deleteSchedule(schedule) {
      console.log("deleteSchedule");

      calendarInstRef.current.deleteSchedule(schedule.id, schedule.calendarId);
      const cloneFilterSchedules = [...filterSchedules];
      setFilterSchedules((prevState) =>
        cloneFilterSchedules.filter((item) => item.id !== schedule.id)
      );
    }

    return (
      <div>
        {showSlidebar && (
          <div id="lnb">
            {onCreate && (
              <div className="lnb-new-schedule">
                <button
                  id="btn-new-schedule"
                  type="button"
                  className="btn btn-default btn-block lnb-new-schedule-btn"
                  data-toggle="modal"
                  onClick={onCreate}
                >
                  {createText}
                </button>
              </div>
            )}
            <div id="lnb-calendars" className="lnb-calendars">
              <div>
                <div className="lnb-calendars-item">
                  <label>
                    <input
                      className="tui-full-calendar-checkbox-square"
                      type="checkbox"
                      defaultValue="all"
                      checked={checkedCalendars.every(
                        (element) => element.isChecked === true
                      )}
                      onChange={handleAllChecked}
                    />
                    <span />
                    <strong>View all</strong>
                  </label>
                </div>
              </div>
              <div id="calendarList" className="lnb-calendars-d1">
                {checkedCalendars.map((element, i) => {
                  return (
                    <React.Fragment key={i}>
                      {element.id === "6" && (
                        <div
                          style={{
                            borderTop: "1px solid #E5E5E5", // Updated line color
                            width: "100%",
                            margin: "10px 0",
                            paddingTop: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          Connections
                        </div>
                      )}
                      <div className="lnb-calendars-item">
                        <label>
                          <input
                            type="checkbox"
                            className="tui-full-calendar-checkbox-round"
                            defaultValue={element.id}
                            checked={element.isChecked}
                            onChange={handleCheckChildElement}
                          />
                          <span
                            style={{
                              borderColor: element.bgColor,
                              backgroundColor: element.isChecked
                                ? element.bgColor
                                : "transparent",
                            }}
                          />
                          <span>{element.name}</span>
                        </label>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div id="right" style={{ left: !showSlidebar && 0 }}>
          {showMenu && (
            <div id="menu">
              <span
                ref={wrapperRef}
                style={{ marginRight: "4px" }}
                className={`dropdown ${open && "open"}`}
              >
                <button
                  id="dropdownMenu-calendarType"
                  className="btn btn-default btn-sm dropdown-toggle"
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded={open}
                  onClick={() => setOpen(!open)}
                >
                  <i
                    id="calendarTypeIcon"
                    className="calendar-icon ic_view_week"
                    style={{ marginRight: "4px" }}
                  />
                  <span id="calendarTypeName">{type}</span>&nbsp;
                  <i className="calendar-icon tui-full-calendar-dropdown-arrow" />
                </button>
                <ul
                  className="dropdown-menu"
                  role="menu"
                  aria-labelledby="dropdownMenu-calendarType"
                >
                  <li role="presentation">
                    <a
                      href="/"
                      onClick={(e) => {
                        e.preventDefault();
                        calendarInstRef.current.changeView("day", true);
                        setType("Daily");
                        setOpen(false);
                      }}
                      className="dropdown-menu-title"
                      role="menuitem"
                      data-action="toggle-daily"
                    >
                      <i className="calendar-icon ic_view_day" />
                      Daily
                    </a>
                  </li>
                  <li role="presentation">
                    <a
                      href="/"
                      onClick={(e) => {
                        e.preventDefault();
                        calendarInstRef.current.changeView("week", true);
                        setType("Weekly");
                        setOpen(false);
                      }}
                      className="dropdown-menu-title"
                      role="menuitem"
                      data-action="toggle-weekly"
                    >
                      <i className="calendar-icon ic_view_week" />
                      Weekly
                    </a>
                  </li>
                  <li role="presentation">
                    <a
                      href="/"
                      onClick={(e) => {
                        e.preventDefault();
                        calendarInstRef.current.setOptions(
                          { month: { visibleWeeksCount: 6 } },
                          true
                        ); // or null
                        calendarInstRef.current.changeView("month", true);
                        setType("Month");
                        setOpen(false);
                      }}
                      className="dropdown-menu-title"
                      role="menuitem"
                      data-action="toggle-monthly"
                    >
                      <i className="calendar-icon ic_view_month" />
                      Month
                    </a>
                  </li>
                  <li role="presentation">
                    <a
                      href="/"
                      onClick={(e) => {
                        e.preventDefault();
                        calendarInstRef.current.setOptions(
                          { month: { visibleWeeksCount: 2 } },
                          true
                        ); // or null
                        calendarInstRef.current.changeView("month", true);
                        setType("2 weeks");
                        setOpen(false);
                      }}
                      className="dropdown-menu-title"
                      role="menuitem"
                      data-action="toggle-weeks2"
                    >
                      <i className="calendar-icon ic_view_week" />2 weeks
                    </a>
                  </li>
                  <li role="presentation">
                    <a
                      href="/"
                      onClick={(e) => {
                        e.preventDefault();
                        calendarInstRef.current.setOptions(
                          { month: { visibleWeeksCount: 3 } },
                          true
                        ); // or null
                        calendarInstRef.current.changeView("month", true);
                        setType("3 weeks");
                        setOpen(false);
                      }}
                      className="dropdown-menu-title"
                      role="menuitem"
                      data-action="toggle-weeks3"
                    >
                      <i className="calendar-icon ic_view_week" />3 weeks
                    </a>
                  </li>
                </ul>
              </span>

              <span id="menu-navi">
                <button
                  type="button"
                  className="btn btn-default btn-sm move-today"
                  style={{ marginRight: "4px" }}
                  data-action="move-today"
                  onClick={() => {
                    // console.log("today");
                    calendarInstRef.current.today();
                    setRenderRangeText();
                  }}
                >
                  Today
                </button>
                <button
                  type="button"
                  className="btn btn-default btn-sm move-day"
                  style={{ marginRight: "4px" }}
                  data-action="move-prev"
                  onClick={() => {
                    // console.log("pre");
                    calendarInstRef.current.prev();
                    setRenderRangeText();
                  }}
                >
                  <i
                    className="calendar-icon ic-arrow-line-left"
                    data-action="move-prev"
                  />
                </button>
                <button
                  type="button"
                  className="btn btn-default btn-sm move-day"
                  style={{ marginRight: "4px" }}
                  data-action="move-next"
                  onClick={() => {
                    // console.log("next");
                    calendarInstRef.current.next();
                    setRenderRangeText();
                  }}
                >
                  <i
                    className="calendar-icon ic-arrow-line-right"
                    data-action="move-next"
                  />
                </button>
              </span>
              <span id="renderRange" className="render-range">
                {renderRange}
              </span>
            </div>
          )}
          <div ref={tuiRef} style={{ height }} />
        </div>
      </div>
    );
  }
);

export default CustomTuiCalendar;
