import { useEffect, useState } from "react";

import "../styles/TimeConversion.css";

import { handleAddLocations, setUpInitialLocationArray } from "../utils";
import type { AttendeeArray } from "../types";
import { PageWrapper } from "../components/PageWrapper";
import { SingleTimezone } from "../components/SingleTimezone";

export function TimeConversion() {
  const [dateTime, setDateTime] = useState<Date>(new Date());
  const [attendees, setAttendees] = useState<AttendeeArray>([]);

  const localStorageKey = "timezoneConversionAttendeeArray";

  useEffect(() => {
    setUpInitialLocationArray(localStorageKey, setAttendees, attendees);
  }, []);

  return (
    <PageWrapper>
      <div className="timezone-wrapper">
        <div className="timezone-content">
          {attendees.map((singleAttendeeFromArray) => {
            return (
              <SingleTimezone
                singleAttendee={singleAttendeeFromArray}
                attendees={attendees}
                setAttendees={setAttendees}
                key={singleAttendeeFromArray.id}
                dateTime={dateTime}
                setDateTime={setDateTime}
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
