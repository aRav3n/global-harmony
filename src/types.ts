export type Attendee = {
  id: number;
  name: string;
  city: string;
};

export type AttendeeArray = Attendee[];

export type LocationSelectorImports = {
  attendees: Attendee[];
  setAttendees: React.Dispatch<React.SetStateAction<Attendee[]>>;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

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

export type TimeSlot = {
  time: string;
  attendeeAvailability: {
    [key: string]: string;
  };
};
