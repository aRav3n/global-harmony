import "../styles/TimeConversion.css";

import { handleAddLocations } from "../utils";
import type { TimeConversionImports } from "../types";
import { PageWrapper } from "../components/PageWrapper";
import { SingleTimezone } from "../components/SingleTimezone";
import { GoToSchedulingPageButton } from "../components/ScheduleMeetingButton";
import { ResetAttendeesButton } from "../components/ResetAttendeesButton";

export function TimeConversion({
  attendees,
  setAttendees,
  dateTime,
  setDateTime,
}: TimeConversionImports) {
  return (
    <PageWrapper>
      <div className="timezone-wrapper">
        <ResetAttendeesButton setAttendees={setAttendees} />
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

        <GoToSchedulingPageButton />
      </div>
    </PageWrapper>
  );
}
