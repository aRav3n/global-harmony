export type Attendee = {
  id: number;
  name: string;
  city: string;
  country: string;
  timezoneName: string;
  timezoneOffsetStd: string;
  timezoneOffsetStdSeconds: number;
  timezoneOffsetDst: string;
  timezoneOffsetDstSeconds: number;
};

export type AttendeeArray = Attendee[];

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

export type LocationInputProps = {
  attendee: Attendee;
  handleUpdateLocation: (
    id: number,
    city: string,
    country: string,
    timezoneName: string,
    timezoneOffsetStd: string,
    timezoneOffsetStdSeconds: number,
    timezoneOffsetDst: string,
    timezoneOffsetDstSeconds: number,
  ) => void;
};

export type LocationSelectorImports = {
  attendees: Attendee[];
  setAttendees: React.Dispatch<React.SetStateAction<Attendee[]>>;
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
