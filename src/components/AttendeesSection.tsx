import { useNavigate, useSearchParams } from "react-router-dom";

import type {
  Attendee,
  AttendeeArray,
  AttendeesSectionImports,
  OfficeHourBlock,
} from "../types";
import { SingleAttendeeSection } from "./SingleAttendeeSection";
import {
  addNewAttendeeToArray,
  generateAttendeeArrayFromParamString,
  handleAddLocations,
} from "../utils";
import { ShareHoursButton } from "./ShareHoursButton";
import { useEffect } from "react";

export function AttendeesSection({
  attendees,
  setAttendees,
}: AttendeesSectionImports) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const userParams = searchParams.getAll("user");

  useEffect(() => {
    console.log(userParams);
    if (userParams.length > 0) {
      const preloadedAttendees =
        generateAttendeeArrayFromParamString(userParams);
      if (preloadedAttendees.length < 2) {
        addNewAttendeeToArray(preloadedAttendees);
      }
      setAttendees(preloadedAttendees);
    } else {
      handleAddLocations(2, attendees, setAttendees);
    }
  }, []);

  const handleAddOfficeHourBlock = (attendee: Attendee) => {
    const newOfficeHourBlock = {
      start: "06:00",
      end: "23:00",
      id: attendee.officeHours.length,
    };

    const newAttendeesArray = [];

    for (let i = 0; i < attendees.length; i++) {
      const currentAttendee = { ...attendees[i] };
      if (attendee.id === currentAttendee.id) {
        const updatedAttendee = currentAttendee;
        updatedAttendee.officeHours = [
          ...currentAttendee.officeHours,
          newOfficeHourBlock,
        ];
      }
      newAttendeesArray.push(currentAttendee);
    }

    setAttendees(newAttendeesArray);
  };

  const handleOfficeHourChange = (
    attendee: Attendee,
    newOfficeHourBlock: OfficeHourBlock,
  ) => {
    const updatedAttendee = { ...attendee };
    const updatedOfficeHourArray = [];
    for (let i = 0; i < updatedAttendee.officeHours.length; i++) {
      const officeHourBlockToPush =
        updatedAttendee.officeHours[i].id === newOfficeHourBlock.id
          ? newOfficeHourBlock
          : { ...updatedAttendee.officeHours[i] };
      updatedOfficeHourArray.push(officeHourBlockToPush);
    }
    updatedAttendee.officeHours = updatedOfficeHourArray;

    const updatedAttendeesArray: AttendeeArray = [];
    for (let i = 0; i < attendees.length; i++) {
      const attendeeToPush =
        attendees[i].id === updatedAttendee.id ? updatedAttendee : attendees[i];
      updatedAttendeesArray.push(attendeeToPush);
    }

    setAttendees(updatedAttendeesArray);
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
            handleOfficeHourChange={handleOfficeHourChange}
            handleUpdateLocation={handleUpdateLocation}
            handleUpdateName={handleUpdateName}
          />
        ))}
      </div>

      <div>
        <button
          onClick={() => {
            handleAddLocations(1, attendees, setAttendees);
          }}
        >
          📍 Add More Locations
        </button>
        <button tabIndex={0} onClick={handlePickATime}>
          ⏱️ Pick a Time
        </button>
        <ShareHoursButton
          fullTeam={true}
          attendee={null}
          attendeeArray={attendees}
        />
      </div>
    </>
  );
}
