import type React from "react";
import {
  attendeeKeyStringTypeGuard,
  officeHourBlockKeyStringTypeGuard,
  type Attendee,
  type AttendeeArray,
  type OfficeHourBlock,
  type ParamArrayType,
  type SetAttendees,
  type UpdateMeetingTimeFromStringImports,
} from "./types";

const addNewAttendeeToArray = (attendeesArray: AttendeeArray) => {
  const newPerson: Attendee = {
    id:
      attendeesArray.length > 0
        ? attendeesArray[attendeesArray.length - 1].id + 1
        : 0,
    name: "",
    city: "",
    country: "",
    timezoneName: "",
    officeHours: [],
  };
  attendeesArray.push(newPerson);
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

const checkIfAcceptableMeetingTime = (
  time: Date,
  timezone: string,
  attendeeOfficeHours: OfficeHourBlock[],
) => {
  let acceptableTime;

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
        acceptableTime = timeIsGood;
      }
    } else {
      const timeIsGood =
        calculateHhMmTimeStringDifference(blockToCompare.start, timeString) >=
          0 ||
        calculateHhMmTimeStringDifference(timeString, blockToCompare.end) >= 60;

      if (timeIsGood && !acceptableTime) {
        acceptableTime = timeIsGood;
      }
    }
  }

  return acceptableTime;
};

const convertDateTimeToHhMmFormat = (dateTime: Date, timezone: string) => {
  const dateTimeString = dateTime.toLocaleTimeString("en-gb", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timezone,
  });
  return dateTimeString;
};

const convertDateToString = function convertUtcDateToLocalStringWithOptions(
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

const convertUndesirableCharactersForUrl = (
  stringToConvert: string,
  convertingFromUrlForState: boolean,
) => {
  const symbolConversionArray = [
    ["%20", " "],
    ["%2F", "/"],
    ["%3A", ":"],
    ["%3F", "?"],
    ["~AMPERSAND~", "&"],
    ["~APOSTROPHE~", "'"],
    ["~AT~", "@"],
    ["~DASH~", "-"],
    ["~EQUALS~", "="],
    ["~EXCLAMATION", "!"],
    ["~HASH~", "#"],
    ["~PARENTHESEScLOSE", ")"],
    ["~PARENTHESESoPEN", "("],
    ["~PERIOD~", "."],
    ["~PLUS~", "+"],
    ["~SEMICOLON~", ";"],
    ["~UNDERSCORE~", "_"],
  ];

  let stringToReturn = stringToConvert;
  if (convertingFromUrlForState) {
    for (const symbolPair of symbolConversionArray) {
      stringToReturn = stringToReturn.replaceAll(symbolPair[0], symbolPair[1]);
    }
  } else {
    for (const symbolPair of symbolConversionArray) {
      stringToReturn = stringToReturn.replaceAll(symbolPair[1], symbolPair[0]);
    }
  }

  return stringToReturn;
};

const copyStringToClipboard = async (stringToCopy: string) => {
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

const generateAttendeeObjectFromParamString = (userParamsString: string) => {
  const attendeeObject: Partial<Attendee> = { officeHours: [] };

  const initialArray = userParamsString.split("_");

  let officeHourBlock: Partial<OfficeHourBlock> = {};
  const addToOfficeHours = (key: string, value: string) => {
    if (officeHourBlockKeyStringTypeGuard(key)) {
      switch (key) {
        case "id":
          officeHourBlock.id = Number(value);
          break;
        case "start":
          officeHourBlock.start = value;
          break;
        case "end":
          officeHourBlock.end = value;
          break;
      }

      if (Object.keys(officeHourBlock).length === 3) {
        attendeeObject.officeHours !== undefined &&
          attendeeObject.officeHours.push(officeHourBlock as OfficeHourBlock);
        officeHourBlock = {} as Partial<OfficeHourBlock>;
      }
    }
  };

  const convertValueFromValueString = (valueString: string) => {
    const finalizedString = convertUndesirableCharactersForUrl(
      valueString,
      true,
    );

    return finalizedString;
  };

  // get key value pairs
  for (let i = 0; i < initialArray.length; i++) {
    const keyValuePairArray = initialArray[i].split("-");
    const key = keyValuePairArray[0];
    const value = keyValuePairArray[1];

    // Sort out officeHours
    if (key === "startHourBlock") {
      addToOfficeHours("start", value);
    } else if (key === "endHourBlock") {
      addToOfficeHours("end", value);
    } else if (key === "idHourBlock") {
      addToOfficeHours("id", value);
    } else if (attendeeKeyStringTypeGuard(key)) {
      if (key === "id") {
        attendeeObject.id = Number(value);
      } else {
        (attendeeObject as any)[keyValuePairArray[0] as keyof Attendee] =
          convertValueFromValueString(value);
      }
    }
  }

  return attendeeObject as Attendee;
};

const generateAttendeeArrayFromParamString = (paramArray: ParamArrayType) => {
  const attendeeArray: AttendeeArray = [];

  for (let i = 0; i < paramArray.length; i++) {
    const attendee = paramArray[i];
    const attendeeObject = generateAttendeeObjectFromParamString(attendee);
    attendeeArray.push(attendeeObject);
  }
  return attendeeArray;
};

const generateDateTimeString = (date: Date, timezoneName: string) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezoneName,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
};

const generateHeadingTimeString = (dateTime: Date) => {
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

const generatePreloadStringSegmentForAttendee = (attendee: Attendee | null) => {
  if (!attendee || attendee.name === "" || attendee.city === "") {
    return "";
  }

  const replaceUndesirableCharacters = (string: string | number) => {
    if (typeof string === "number") {
      return string.toString();
    }

    const finalizedString = convertUndesirableCharactersForUrl(string, false);

    return finalizedString;
  };

  let preloadStringSegment = "user=";

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

const getLocalTimezoneName = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

const getTimezoneOffsetMs = (momentInTime: Date, timezoneName: string): number => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezoneName,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(momentInTime);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0);

  const wallClockAsUtc = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
    get("second"),
  );

  // Drop milliseconds from the instant so both sides have second precision
  const instantSeconds =
    momentInTime.getTime() - momentInTime.getUTCMilliseconds();

  return wallClockAsUtc - instantSeconds;
};

const handleAddLocations = (
  numberOfLocationsToAdd: number,
  attendees: AttendeeArray,
  setAttendees: SetAttendees,
) => {
  const newAttendeeArray = [...attendees];

  for (let i = 0; i < numberOfLocationsToAdd; i++) {
    addNewAttendeeToArray(newAttendeeArray);
  }

  setAttendees(newAttendeeArray);
};

const handleDeleteAttendee = (
  attendees: AttendeeArray,
  setAttendees: SetAttendees,
  attendeeId: number,
) => {
  const attendeesArrayWithoutUser: AttendeeArray = [];
  for (const attendee of attendees) {
    if (attendeeId !== attendee.id) {
      const copyOfAttendee = { ...attendee };
      attendeesArrayWithoutUser.push(copyOfAttendee);
    }
  }
  setAttendees(attendeesArrayWithoutUser);
};

const handleResetLocations = (
  numberOfLocationsToAdd: number,
  setAttendees: SetAttendees,
) => {
  const newAttendeeArray: AttendeeArray = [];

  for (let i = 0; i < numberOfLocationsToAdd; i++) {
    addNewAttendeeToArray(newAttendeeArray);
  }

  setAttendees(newAttendeeArray);
};

const handleUpdateLocation = (
  id: number,
  city: string,
  country: string,
  timezoneName: string,
  setAttendees: SetAttendees,
) => {
  setAttendees((attendees) => {
    return attendees.map((attendee) => {
      return attendee.id === id
        ? { ...attendee, city, country, timezoneName }
        : attendee;
    });
  });
};

const handleUpdateName = (
  id: number,
  newName: string,
  setAttendees: SetAttendees,
) => {
  setAttendees((attendees) => {
    return attendees.map((attendee) => {
      return attendee.id === id ? { ...attendee, name: newName } : attendee;
    });
  });
};

const setUpInitialLocationArray = (
  localStorageKey: string,
  setAttendees: SetAttendees,
  attendees: AttendeeArray,
) => {
  const localAttendeeArray = localStorage.getItem(localStorageKey);

  if (localAttendeeArray) {
    const jsonArray = JSON.parse(localAttendeeArray);
    if (jsonArray.length < 2) {
      addNewAttendeeToArray(jsonArray);
    }
    setAttendees(jsonArray);
  } else if (attendees.length < 2) {
    const numberOfLocationsToAdd = 2 - attendees.length;
    handleAddLocations(numberOfLocationsToAdd, attendees, setAttendees);
  }
};

const updateAttendeesInLocalStorage = (attendees: AttendeeArray) => {
  if (attendees.length > 0) {
    localStorage.setItem("attendeesArray", JSON.stringify(attendees));
  }
};

const updateMeetingTimeFromString = ({
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

export {
  // Attendee and location functions
  addNewAttendeeToArray,
  generateAttendeeArrayFromParamString,
  generatePreloadStringSegmentForAttendee,
  handleAddLocations,
  handleDeleteAttendee,
  handleResetLocations,
  handleUpdateLocation,
  handleUpdateName,
  setUpInitialLocationArray,
  updateAttendeesInLocalStorage,

  // Meeting time functions
  checkIfAcceptableMeetingTime,
  updateMeetingTimeFromString,

  // General dateTime functions
  convertDateTimeToHhMmFormat,
  convertDateToString,
  generateDateTimeString,
  getLocalTimezoneName,
  getTimezoneOffsetMs,

  // General functions
  copyStringToClipboard,
  generateHeadingTimeString,
};
