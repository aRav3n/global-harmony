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

export type Meeting = {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  videoLink: string;
  description: string;
  attendees: Attendee[];
  createdBy: string;
};

export type MeetingCreatorImports = {
  meetingTime: Date | null;
};

export type ScheduleViewerImports = {
  attendees: Attendee[];
  date: Date;
  setMeetingTime: React.Dispatch<React.SetStateAction<Date | null>>;
};

export type TableRowProps = {
  time: Date;
};

export type TimeSlot = {
  time: string;
  attendeeAvailability: {
    [key: string]: string;
  };
};
