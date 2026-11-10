import { useEffect, useState } from "react";
import { DateTime } from "luxon";

import "../styles/LocationSelector.css";

import type { CalendarSelectImports } from "../types";
import { generateDateTimeString } from "../utils";

export function DateTimeCalendarSelect({
  dateTime,
  setDateTime,
  timezoneName,
}: CalendarSelectImports) {
  const [calendarDisplayDate, setCalendarDisplayDate] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (timezoneName !== "") {
      const displayDateTimeString = generateDateTimeString(
        dateTime,
        timezoneName,
      );
      setCalendarDisplayDate(displayDateTimeString);
      setDisabled(false);
    }
  }, [dateTime, timezoneName]);

  const handleCalendarDayChange = (dateString: string) => {
    const dateTimeArray = dateString.split("T");
    const dateArray = dateTimeArray[0].split("-");
    const timeArray = dateTimeArray[1].split(":");

    const year = Number(dateArray[0]);
    const month = Number(dateArray[1]);
    const day = Number(dateArray[2]);
    const hour = Number(timeArray[0]);
    const minute = Number(timeArray[1]);

    const newDate = DateTime.fromObject(
      { year, month, day, hour, minute },
      { zone: timezoneName },
    );

    setDateTime(newDate.toJSDate());
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
