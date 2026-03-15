import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { LocationSelector } from "./pages/LocationSelector";
import { ScheduleViewer } from "./pages/ScheduleViewer";
import { MeetingCreator } from "./pages/MeetingCreator";
import type { AttendeeArray } from "./types";
import "./styles/App.css";

function App() {
  const initialAttendeeArray = [
    {
      id: 1,
      name: "Me",
      city: "Minneapolis",
      country: "United States",
      timezoneName: "America/Chicago",
      timezoneOffsetStd: "-06:00",
      timezoneOffsetStdSeconds: -21600,
      timezoneOffsetDst: "-05:00",
      timezoneOffsetDstSeconds: -18000,
    },
    {
      id: 2,
      name: "Two",
      city: "Colombo",
      country: "Sri Lanka",
      timezoneName: "Asia/Colombo",
      timezoneOffsetStd: "+05:30",
      timezoneOffsetStdSeconds: 19800,
      timezoneOffsetDst: "+05:30",
      timezoneOffsetDstSeconds: 19800,
    },
  ];

  const [attendees, setAttendees] = useState<AttendeeArray>(initialAttendeeArray);
  // const [attendees, setAttendees] = useState<AttendeeArray>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [meetingTime, setMeetingTime] = useState<Date | null>(null);
  const [nextId, setNextId] = useState<number>(1);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LocationSelector
              attendees={attendees}
              setAttendees={setAttendees}
              date={date}
              setDate={setDate}
              nextId={nextId}
              setNextId={setNextId}
            />
          }
        />
        <Route
          path="/schedule"
          element={
            <ScheduleViewer
              attendees={attendees}
              date={date}
              meetingTime={meetingTime}
              setMeetingTime={setMeetingTime}
            />
          }
        />
        <Route
          path="/create"
          element={
            <MeetingCreator
              attendees={attendees}
              meetingTime={meetingTime}
              setMeetingTime={setMeetingTime}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
