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

export type SetAttendees = React.Dispatch<React.SetStateAction<AttendeeArray>>;

export type AttendeesSectionImports = {
  attendees: AttendeeArray;
  setAttendees: SetAttendees;
  nextId: number;
  setNextId: React.Dispatch<React.SetStateAction<number>>;
};

export type CalendarButtonImports = {
  title: string;
  description: string;
  start: Date;
  durationMinutes: number;
  location: string;
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

type handleOfficeHourChange = (
  attendee: Attendee,
  newOfficeHourBlock: OfficeHourBlock,
) => void;

export type LocationInputProps = {
  attendee: Attendee;
  handleUpdateLocation: (
    id: number,
    city: string,
    country: string,
    timezoneName: string,
  ) => void;
};

export type LocationSelectorImports = {
  attendees: Attendee[];
  setAttendees: SetAttendees;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  nextId: number;
  setNextId: React.Dispatch<React.SetStateAction<number>>;
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
  handleOfficeHourChange: handleOfficeHourChange;
};

export type ScheduleTableDataImports = {
  attendee: Attendee;
  time: Date;
};

export type ShareHoursButtonImports = {
  fullTeam: boolean;
  attendeeArray: AttendeeArray | null;
  attendee: Attendee | null;
};

export type SingleAttendeeSectionImports = {
  key: number;
  attendee: Attendee;
  handleAddOfficeHourBlock: HandleAddOfficeHourBlock;
  handleOfficeHourChange: handleOfficeHourChange;
  handleUpdateLocation: (
    id: number,
    city: string,
    country: string,
    timezoneName: string,
  ) => void;
  handleUpdateName: (id: number, newName: string) => void;
};

export type ScheduleViewerImports = {
  attendees: Attendee[];
  date: Date;
  setMeetingTime: React.Dispatch<React.SetStateAction<Date | null>>;
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
