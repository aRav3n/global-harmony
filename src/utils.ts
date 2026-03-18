import type React from "react";
import type {
  AttendeeArray,
  SetAttendees,
  UpdateMeetingTimeFromStringImports,
} from "./types";

const calculateHhMmTimeStringDifference = (
  previousTimeString: string,
  newTimeString: string,
) => {
  const toMinutes = (timeString: string) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
  };

  return toMinutes(newTimeString) - toMinutes(previousTimeString);
};

export const convertDateTimeToHhMmFormat = (
  dateTime: Date,
  timezone: string,
) => {
  const dateTimeString = dateTime.toLocaleTimeString("en-gb", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timezone,
  });
  return dateTimeString;
};

export const convertDateToString =
  function convertUtcDateToLocalStringWithOptions(
    dateTime: Date,
    timezone: string,
  ) {
    const dateTimeString = dateTime.toLocaleString(undefined, {
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      month: "long",
      timeZone: timezone,
      weekday: "short",
    });
    return dateTimeString;
  };

export const generateHeadingTimeString = (dateTime: Date) => {
  const dateTimeString = dateTime.toLocaleString(undefined, {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    weekday: "long",
    timeZoneName: "short",
    year: "numeric",
  });
  return dateTimeString;
};

export const handleAddLocations = (
  numberOfLocationsToAdd: number,
  attendees: AttendeeArray,
  setAttendees: SetAttendees,
  nextId: number,
  setNextId: React.Dispatch<React.SetStateAction<number>>,
) => {
  const newAttendeeArray = [...attendees];

  for (let i = 0; i < numberOfLocationsToAdd; i++) {
    const newPerson = {
      id: nextId + i,
      name: "",
      city: "",
      country: "",
      timezoneName: "",
      officeHours: [],
    };
    newAttendeeArray.push(newPerson);
  }

  const newId = nextId + numberOfLocationsToAdd;
  setNextId(newId);
  setAttendees(newAttendeeArray);
};

export const updateMeetingTimeFromString = ({
  meetingTime,
  setMeetingTime,
  meetingTimeString,
  newTimeString,
}: UpdateMeetingTimeFromStringImports) => {
  const minutesIncreased = calculateHhMmTimeStringDifference(
    meetingTimeString,
    newTimeString,
  );

  const newMeetingTime = new Date(meetingTime);
  newMeetingTime.setMinutes(meetingTime.getMinutes() + minutesIncreased);

  setMeetingTime(newMeetingTime);
};
