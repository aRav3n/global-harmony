import { google, outlook, office365, yahoo, ics } from "calendar-link";
import type { CalendarEvent } from "calendar-link";
import { v4 as uuidv4 } from "uuid";

import type { CalendarButtonImports, CalendarUrls } from "../types";
import "../styles/AddToCalendarButton.css";
import { useState } from "react";

export function AddToCalendarButton({
  title,
  description,
  start,
  durationMinutes,
  location,
}: CalendarButtonImports) {
  const [displayCalendarAdd, setDisplayCalendarAdd] = useState<boolean>(false);
  const [calendarUrls, setCalendarUrls] = useState<CalendarUrls>({});

  const handleClick = () => {
    const event: CalendarEvent = {
      uid: uuidv4(),
      title,
      description,
      start,
      duration: [durationMinutes, "minutes"],
      location,
    };
    const url = {
      google: google(event),
      outlook: outlook(event),
      office365: office365(event),
      yahoo: yahoo(event),
      appleCalendar: ics(event),
    };
    setCalendarUrls(url);

    setDisplayCalendarAdd(true);
  };

  return (
    <div className="calendar-button-container">
      <div className={displayCalendarAdd ? "calendar-popup" : "hidden"}>
        <div
          className="close-button"
          onClick={() => {
            setDisplayCalendarAdd(false);
          }}
        >
          <span>Close</span>
          <img src="./x-circle.svg" alt="close icon" />
        </div>
        <ul>
          {
            // icon credit: https://icons8.com/icon/30840/apple-inc
            calendarUrls.appleCalendar && (
              <li>
                <a href={calendarUrls.appleCalendar} target="_blank">
                  <img
                    src="https://img.icons8.com/?size=100&id=30840&format=png&color=000000"
                    alt=""
                  />{" "}
                  Apple Calendar
                </a>
              </li>
            )
          }
          {
            // icon credit: https://icons8.com/icon/WKF3bm1munsk/google-calendar
            calendarUrls.google && (
              <li>
                <a href={calendarUrls.google} target="_blank">
                  <img src="https://img.icons8.com/?size=100&id=WKF3bm1munsk&format=png&color=000000" />{" "}
                  Google Calendar
                </a>
              </li>
            )
          }
          {
            // icon credit: https://icons8.com/icon/117062/office-365
            calendarUrls.office365 && (
              <li>
                <a href={calendarUrls.office365} target="_blank">
                  <img
                    src="https://img.icons8.com/?size=100&id=117062&format=png&color=000000"
                    alt=""
                  />{" "}
                  Office365
                </a>
              </li>
            )
          }
          {
            // icon credit: https://icons8.com/icon/WnHyYA2ecNqL/outlook-calendar
            calendarUrls.outlook && (
              <li>
                <a href={calendarUrls.outlook} target="_blank">
                  <img
                    src="https://img.icons8.com/?size=100&id=WnHyYA2ecNqL&format=png&color=000000"
                    alt=""
                  />{" "}
                  Outlook
                </a>
              </li>
            )
          }
          {
            // icon credit: https://icons8.com/icon/G3F1h1aX2vpT/yahoo
            calendarUrls.yahoo && (
              <li>
                <a href={calendarUrls.yahoo} target="_blank">
                  <img
                    src="https://img.icons8.com/?size=100&id=G3F1h1aX2vpT&format=png&color=000000"
                    alt=""
                  />{" "}
                  Yahoo Calendar
                </a>
              </li>
            )
          }
          {
            // icon credit: https://icons8.com/icon/12776/calendar
            calendarUrls.appleCalendar && (
              <li>
                <a href={calendarUrls.appleCalendar} target="_blank">
                  <img
                    src="https://img.icons8.com/?size=100&id=12776&format=png&color=000000"
                    alt=""
                  />{" "}
                  Other (download an ics file)
                </a>
              </li>
            )
          }
        </ul>
      </div>
      <button type="button" onClick={handleClick}>
        📅 Add to calendar
      </button>
    </div>
  );
}
