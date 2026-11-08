import { useEffect, useState } from "react";

import "../styles/LocationSelector.css";

import type { CalendarSelectImports } from "../types";
import { generateDateTimeString } from "../utils";

export function DateTimeCalendarSelect({
  date,
  setDate,
  timezoneName,
}: CalendarSelectImports) {
  const [calendarDisplayDate, setCalendarDisplayDate] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (timezoneName !== "") {
      setCalendarDisplayDate(generateDateTimeString(date, timezoneName));
      setDisabled(false);
    }
  }, [date, timezoneName]);

  const handleCalendarDayChange = (dateString: string) => {
    // dateString = 2026-11-12T11:37
    console.log(dateString);

    const dateArray = dateString.split("-");
    const year = Number(dateArray[0]);
    const month = Number(dateArray[1]) - 1;
    const day = Number(dateArray[2]);
    const newDate = new Date(year, month, day);
    setDate(newDate);
  };

  return (
    <label htmlFor="calendar">
      Select a date and time
      {disabled ? (
        <input
          type="text"
          disabled
          name="calendar"
          id="calendar"
          className="date-input disabled"
          value={"Pick a location first"}
        />
      ) : (
        <input
          onKeyDown={(e) => {
            e.preventDefault();
          }}
          type="datetime-local"
          name="calendar"
          id="calendar"
          className="date-input"
          value={calendarDisplayDate}
          onChange={(e) => {
            handleCalendarDayChange(e.target.value);
          }}
        />
      )}
    </label>
  );
}
