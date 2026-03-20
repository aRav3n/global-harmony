import type React from "react";
import type {
  Attendee,
  AttendeeArray,
  OfficeHourBlock,
  SetAttendees,
  UpdateMeetingTimeFromStringImports,
} from "./types";
import { useState } from "react";

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
  const [acceptableTime, setAcceptableTime] = useState<boolean>(false);

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
      const timeIsGood =
        calculateHhMmTimeStringDifference(blockToCompare.start, timeString) >=
          0 &&
        calculateHhMmTimeStringDifference(timeString, blockToCompare.end) >= 60;

      if (timeIsGood && !acceptableTime) {
        setAcceptableTime(timeIsGood);
      }
    } else {
      const timeIsGood =
        calculateHhMmTimeStringDifference(blockToCompare.start, timeString) >=
          0 ||
        calculateHhMmTimeStringDifference(timeString, blockToCompare.end) >= 60;

      if (timeIsGood && !acceptableTime) {
        setAcceptableTime(timeIsGood);
      }
    }
  }

  return acceptableTime;
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

export const copyStringToClipboard = async (stringToCopy: string) => {
  try {
    await navigator.clipboard.writeText(stringToCopy);
  } catch (err) {
    const textArea = document.createElement("textarea");
    textArea.value = stringToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }
};

export const createAttendeeObjectFromString = (attendeeString: string) => {
  const attendeeObject = {};
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

export const generatePreloadStringSegmentForAttendee = (
  attendee: Attendee | null,
) => {
  if (!attendee || attendee.name === "" || attendee.city === "") {
    return "";
  }

  const replaceBackslashInString = (string: string | number) => {
    if (typeof string === "number") {
      return string.toString();
    }

    const stringArray = string.split("/");
    let stringToReturn = "";
    for (let i = 0; i < stringArray.length; i++) {
      if (stringToReturn.length > 0) {
        stringToReturn += "%30";
      }
      stringToReturn += stringArray[i];
    }
    return stringToReturn;
  };

  const replaceDashInString = (string: string | number) => {
    if (typeof string === "number") {
      return string.toString();
    }

    const stringArray = string.split("-");
    let stringToReturn = "";
    for (let i = 0; i < stringArray.length; i++) {
      if (stringToReturn.length > 0) {
        stringToReturn += "%40";
      }
      stringToReturn += stringArray[i];
    }
    return stringToReturn;
  };

  const replaceSpaceInString = (string: string | number) => {
    if (typeof string === "number") {
      return string.toString();
    }

    const stringArray = string.split(" ");
    let stringToReturn = "";
    for (let i = 0; i < stringArray.length; i++) {
      if (stringToReturn.length > 0) {
        stringToReturn += "%20";
      }
      stringToReturn += stringArray[i];
    }
    return stringToReturn;
  };

  // replace characters, %20 = space, %30 = backslash, %40 = dash
  const replaceUndesirableCharacters = (string: string | number) => {
    const stringWithBackslashesReplaced = replaceBackslashInString(string);
    const stringWithBackslashesAndDashesReplaced = replaceDashInString(
      stringWithBackslashesReplaced,
    );
    const finalizedString = replaceSpaceInString(
      stringWithBackslashesAndDashesReplaced,
    );
    return finalizedString;
  };

  let preloadStringSegment = "?user=";

  const appendToStringSegment = (key: string, value: string | number) => {
    preloadStringSegment += `${key}-${replaceUndesirableCharacters(value)}_`;
  };

  for (const key in attendee) {
    const value = attendee[key as keyof Attendee];

    // The only object typeof, as controlled by Attendee type, is the hour block array
    if (typeof value === "object") {
      for (const hourBlock of value) {
        for (const hourKey in hourBlock) {
          const hourValue = hourBlock[hourKey as keyof OfficeHourBlock];
          appendToStringSegment(`${hourKey}HourBlock`, hourValue);
        }
      }
    } else {
      appendToStringSegment(key, value);
    }
  }
  preloadStringSegment = preloadStringSegment.substring(
    0,
    preloadStringSegment.length - 1,
  );

  return preloadStringSegment;
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
