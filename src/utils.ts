import type { UpdateMeetingTimeFromStringImports } from "./types";

export const addHoursToMmHhString = (
  timeString: string,
  hoursToAdd: number,
) => {
  const [hours, minutes] = timeString.split(":").map(Number);
  const newHours = hours + hoursToAdd;
  const newHoursString = newHours.toString().padStart(2, "0");
  const newMinutesString = minutes.toString().padStart(2, "0");
  return `${newHoursString}:${newMinutesString}`;
};

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

export const getEndTime = (startTime: Date, durationHours: number) => {
  const durationMinutes = durationHours * 60;
  startTime.setMinutes(startTime.getMinutes() + durationMinutes);
  return startTime;
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
