import { useNavigate } from "react-router-dom";

import type { AttendeesSectionImports } from "../types";
import { SingleAttendeeSection } from "./SingleAttendeeSection";
import { handleAddLocations } from "../utils";

export function AttendeesSection({
  attendees,
  setAttendees,
  nextId,
  setNextId
}: AttendeesSectionImports) {
  const navigate = useNavigate();

  const handlePickATime = () => {
    const newAttendeesArray = [];
    for (let i = 0; i < attendees.length; i++) {
      if (attendees[i].timezoneName && attendees[i].name) {
        newAttendeesArray.push(attendees[i]);
      }
    }
    if (newAttendeesArray.length) {
      setAttendees(newAttendeesArray);
    }

    if (newAttendeesArray[0] && newAttendeesArray[0].timezoneName) {
      navigate("/schedule");
    }
  };

  return (
    <>
      <div className="attendees-section">
        {attendees.map((attendee) => (
          <SingleAttendeeSection
            key={attendee.id}
            attendee={attendee}
            attendees={attendees}
            setAttendees={setAttendees}
          />
        ))}
      </div>

      <div>
        <button
          onClick={() => {
            handleAddLocations(1, attendees, setAttendees, nextId, setNextId);
          }}
        >
          📍 Add More Locations
        </button>
        <button tabIndex={0} onClick={handlePickATime}>
          ⏱️ Pick a Time
        </button>
      </div>
    </>
  );
}
