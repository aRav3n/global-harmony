import { useEffect, useState } from "react";

import { DateTimeCalendarSelect } from "../components/DateTimeSelect";
import { LocationInput } from "../components/LocationInput";
import { PageWrapper } from "../components/PageWrapper";

import {
  addNewAttendeeToArray,
  convertDateToString,
  getLocalTimezoneName,
  handleAddLocations,
  handleUpdateLocation,
  setUpInitialLocationArray,
} from "../utils";
import type { AttendeeArray, SingleTimezoneImports } from "../types";

import "../styles/TimeConversion.css";

function SingleTimezone({
  singleAttendee,
  setAttendees,
  dateTime,
  setDateTime,
}: SingleTimezoneImports) {
  useEffect(() => {
    if (singleAttendee.timezoneName) {
      const localTimeString = convertDateToString(
        dateTime,
        singleAttendee.timezoneName,
      );
      console.log({ localTimeString });
    }
  }, [singleAttendee]);

  useEffect(() => {}, [dateTime, singleAttendee.timezoneName]);

  return (
    <>
      <LocationInput
        singleAttendee={singleAttendee}
        setAttendees={setAttendees}
      />
      <DateTimeCalendarSelect
        date={dateTime}
        setDate={setDateTime}
        timezoneName={singleAttendee.timezoneName}
      />
    </>
  );
}

export function TimeConversion() {
  const [utcDateTime, setUtcDateTime] = useState<Date>(new Date());
  const [attendees, setAttendees] = useState<AttendeeArray>([]);

  const localStorageKey = "timezoneConversionAttendeeArray";
  const localTimezoneName = getLocalTimezoneName();

  useEffect(() => {
    setUpInitialLocationArray(localStorageKey, setAttendees, attendees);
  }, []);

  return (
    <PageWrapper>
      <div className="location-selector-content">
        <div className="grid">
          <label htmlFor="current-location">
            City
            <input
              type="text"
              name="current-location"
              id="current-location"
              value="Current Location"
              disabled
            />
          </label>
          <DateTimeCalendarSelect
            date={utcDateTime}
            setDate={setUtcDateTime}
            timezoneName={localTimezoneName}
          />
          {attendees.map((singleAttendeeFromArray) => {
            return (
              <SingleTimezone
                singleAttendee={singleAttendeeFromArray}
                setAttendees={setAttendees}
                key={singleAttendeeFromArray.id}
                dateTime={utcDateTime}
                setDateTime={setUtcDateTime}
              />
            );
          })}
        </div>

        <button
          onClick={() => {
            handleAddLocations(1, attendees, setAttendees);
          }}
        >
          🕔 Add More TimeZones
        </button>
      </div>
    </PageWrapper>
  );
}
