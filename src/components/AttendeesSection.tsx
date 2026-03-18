import { useNavigate } from "react-router-dom";

import type { Attendee, AttendeesSectionImports } from "../types";
import { SingleAttendeeSection } from "./SingleAttendeeSection";
import { handleAddLocations } from "../utils";
import { useEffect } from "react";

export function AttendeesSection({
  attendees,
  setAttendees,
  nextId,
  setNextId,
}: AttendeesSectionImports) {
  const navigate = useNavigate();

  const handleAddOfficeHourBlock = (attendee: Attendee) => {
    const existingOfficeHourArray = attendee.officeHours || [];
    const newOfficeHourBlock = {
      start: "06:00",
      end: "23:00",
    };
    existingOfficeHourArray.push(newOfficeHourBlock);

    const newAttendeesArray = [];

    for (let i = 0; i < attendees.length; i++) {
      const currentAttendee = attendees[i];
      if (attendee.id === currentAttendee.id) {
        const updatedAttendee = currentAttendee;
        updatedAttendee.officeHours
          ? updatedAttendee.officeHours.push(newOfficeHourBlock)
          : (updatedAttendee.officeHours = [newOfficeHourBlock]);
      }
      newAttendeesArray.push(currentAttendee);
    }

    setAttendees(newAttendeesArray);
  };

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

  const handleUpdateLocation = (
    id: number,
    city: string,
    country: string,
    timezoneName: string,
  ) => {
    const newAttendeeArray = [...attendees];
    for (let i = 0; i < newAttendeeArray.length; i++) {
      const currentAttendee = newAttendeeArray[i];
      if (currentAttendee.id === id) {
        currentAttendee.city = city;
        currentAttendee.country = country;
        currentAttendee.timezoneName = timezoneName;
        setAttendees(newAttendeeArray);
        return;
      }
    }
  };

  const handleUpdateName = (id: number, newName: string) => {
    const newAttendeeArray = [...attendees];

    for (let i = 0; i < newAttendeeArray.length; i++) {
      const currentPerson = newAttendeeArray[i];
      if (currentPerson.id === id) {
        currentPerson.name = newName;
        setAttendees(newAttendeeArray);
        return;
      }
    }
  };

  return (
    <>
      <div className="attendees-section">
        {attendees.map((attendee) => (
          <SingleAttendeeSection
            key={attendee.id}
            attendee={attendee}
            handleAddOfficeHourBlock={handleAddOfficeHourBlock}
            handleUpdateLocation={handleUpdateLocation}
            handleUpdateName={handleUpdateName}
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
