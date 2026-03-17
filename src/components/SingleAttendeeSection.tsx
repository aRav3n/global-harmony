import { LocationInput } from "./LocationInput";
import type { SingleAttendeeSectionImports } from "../types";
import { useState } from "react";

export function SingleAttendeeSection({
  attendee,
  attendees,
  setAttendees,
}: SingleAttendeeSectionImports) {
  const handleAddOfficeHourBlock = () => {
    const existingOfficeHourArray = attendee.officeHours || [];
    const newOfficeHourBlock = {
      start: "06:00",
      end: "23:00",
    };
    existingOfficeHourArray.push(newOfficeHourBlock);
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
    <div key={attendee.id} className="attendee-row">
      <label htmlFor={`${attendee.id}-name`}>
        Name
        <input
          type="text"
          id={`${attendee.id}-name`}
          placeholder={`Person ${attendee.name}`}
          value={attendee.name}
          onChange={(e) => handleUpdateName(attendee.id, e.target.value)}
          className="attendee-input"
        />
      </label>
      <LocationInput
        attendee={attendee}
        handleUpdateLocation={handleUpdateLocation}
      />
      {
        //<button type="button">⏳ Add Office Hours</button>
      }
    </div>
  );
}
