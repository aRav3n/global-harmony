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
    const finalizedString = valueString
      .replaceAll("%20", " ")
      .replaceAll("%2F", "/")
      .replaceAll("~DASH~", "-")
      .replaceAll("~UNDERSCORE~", "_")
      .replaceAll("%3A", ":")
      .replaceAll("%3F", "?");

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

  // replace characters, %20 = space, %30 = backslash, %40 = dash,
  // %50 = underscore, %60 = colon
  const replaceUndesirableCharacters = (string: string | number) => {
    if (typeof string === "number") {
      return string.toString();
    }

    const finalizedString = string
      .replaceAll(" ", "%20")
      .replaceAll("/", "%2F")
      .replaceAll("-", "~DASH~")
      .replaceAll("_", "~UNDERSCORE~")
      .replaceAll(":", "%3A")
      .replaceAll("?", "%3F");

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

  // Meeting time functions
  checkIfAcceptableMeetingTime,
  updateMeetingTimeFromString,

  // General dateTime functions
  convertDateTimeToHhMmFormat,
  convertDateToString,

  // General functions
  copyStringToClipboard,
  generateHeadingTimeString,
};
