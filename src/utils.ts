import type React from "react";
import type {
  AttendeeArray,
  OfficeHourBlock,
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

export const checkIfAcceptableMeetingTime = (
  time: Date,
  timezone: string,
  attendeeOfficeHours: OfficeHourBlock[],
) => {
  const timeString = time.toLocaleTimeString("en-gb", { timeZone: timezone });

  if (attendeeOfficeHours.length === 0) {
    const defaultEarliestAcceptableTime = 6;
    const defaultLatestAcceptableTime = 22;
    const hour = Number(timeString.slice(0, 2));

    return hour < defaultEarliestAcceptableTime ||
      hour > defaultLatestAcceptableTime
      ? false
      : true;
  }

  for (let i = 0; i < attendeeOfficeHours.length; i++) {
    const blockToCompare = attendeeOfficeHours[i];
    const startTimeBeforeEndTime: boolean =
      calculateHhMmTimeStringDifference(
        blockToCompare.start,
        blockToCompare.end,
      ) > 0;

    if (startTimeBeforeEndTime) {
      return (
        calculateHhMmTimeStringDifference(blockToCompare.start, timeString) >=
          0 &&
        calculateHhMmTimeStringDifference(timeString, blockToCompare.end) >= 60
      );
    }

    return (
      calculateHhMmTimeStringDifference(blockToCompare.start, timeString) >=
        0 ||
      calculateHhMmTimeStringDifference(timeString, blockToCompare.end) >= 60
    );
  }
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
