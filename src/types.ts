import type { ReactNode } from "react";

export type OfficeHourBlock = {
  id: number;
  start: string;
  end: string;
};

export type Attendee = {
  id: number;
  name: string;
  city: string;
  country: string;
  timezoneName: string;
  officeHours: OfficeHourBlock[];
};

export type AttendeeArray = Attendee[];

type AttendeeKeyStrings =
  | "id"
  | "name"
  | "city"
  | "country"
  | "timezoneName"
  | "officeHours";

export const attendeeKeyStringTypeGuard = (
  key: string,
): key is AttendeeKeyStrings => {
  return [
    "id",
    "name",
    "city",
    "country",
    "timezoneName",
    "officeHours",
  ].includes(key as AttendeeKeyStrings);
};

export type SetAttendees = React.Dispatch<React.SetStateAction<AttendeeArray>>;

export type AttendeesSectionImports = {
  attendees: AttendeeArray;
  setAttendees: SetAttendees;
};

export type CalendarButtonImports = {
  title: string;
  description: string;
  start: Date;
  durationMinutes: number;
  location: string;
};

export type CalendarSelectImports = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  timezoneName: string;
};

export type CalendarUrls = {
  google?: string;
  outlook?: string;
  office365?: string;
  yahoo?: string;
  appleCalendar?: string;
};

export type GeoAPIfyObject = {
  properties: {
    city: string;
    country: string;
    timezone: {
      name: string;
      offset_STD: string;
      offset_STD_seconds: number;
      offset_DST: string;
      offset_DST_seconds: number;
    };
  };
};

type HandleAddOfficeHourBlock = (attendee: Attendee) => void;

type handleDeleteOfficeHourBlock = (
  attendeeId: number,
  hourBlockId: number,
) => void;

type handleOfficeHourChange = (
  attendee: Attendee,
  newOfficeHourBlock: OfficeHourBlock,
) => void;

export type LocationInputProps = {
  singleAttendee: Attendee;
  setAttendees: SetAttendees;
};

export type LocationSelectorImports = {
  attendees: Attendee[];
  setAttendees: SetAttendees;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
};

export type MeetingInfo = {
  description: string;
  duration: number;
  meetingTimeString: string;
  title: string;
  location: string;
};

export type MeetingCreatorImports = {
  attendees: Attendee[];
  meetingInfo: MeetingInfo;
  setMeetingInfo: React.Dispatch<React.SetStateAction<MeetingInfo>>;
  meetingTime: Date | null;
  setMeetingTime: React.Dispatch<React.SetStateAction<Date | null>>;
};

export type OfficeHourAddImports = {
  attendee: Attendee;
  handleAddOfficeHourBlock: HandleAddOfficeHourBlock;
  handleDeleteOfficeHourBlock: handleDeleteOfficeHourBlock;
  handleOfficeHourChange: handleOfficeHourChange;
};

export type OfficeHourBlockKeyStrings = "id" | "start" | "end";

export const officeHourBlockKeyStringTypeGuard = (
  key: string,
): key is OfficeHourBlockKeyStrings => {
  return ["id", "start", "end"].includes(key as OfficeHourBlockKeyStrings);
};

export type PageWrapperImports = { children: ReactNode };

export type ParamArrayType = string[];

export type ScheduleTableDataImports = {
  attendee: Attendee;
  time: Date;
};

export type ResetAttendeesButtonImports = { setAttendees: SetAttendees };

export type ShareHoursButtonImports = {
  fullTeam: boolean;
  attendeeArray: AttendeeArray | null;
  attendee: Attendee | null;
};

export type ScheduleViewerImports = {
  attendees: Attendee[];
  date: Date;
  setMeetingTime: React.Dispatch<React.SetStateAction<Date | null>>;
};

export type SingleAttendeeSectionImports = {
  key: number;
  singleAttendee: Attendee;
  attendees: AttendeeArray;
  setAttendees: SetAttendees;
  handleAddOfficeHourBlock: HandleAddOfficeHourBlock;
  handleDeleteOfficeHourBlock: handleDeleteOfficeHourBlock;
  handleOfficeHourChange: handleOfficeHourChange;
};

export type SingleTimezoneImports = {
  key: number;
  singleAttendee: Attendee;
  setAttendees: SetAttendees;
  dateTime: Date;
  setDateTime: React.Dispatch<React.SetStateAction<Date>>;
};

export type SuccessfulCopyNotificationImports = {
  success: boolean | null;
  setSuccess: React.Dispatch<React.SetStateAction<boolean | null>>;
};

export type TableRowProps = {
  time: Date;
};

export type UpdateMeetingTimeFromStringImports = {
  meetingTime: Date;
  setMeetingTime: React.Dispatch<React.SetStateAction<Date | null>>;
  meetingTimeString: string;
  newTimeString: string;
};
