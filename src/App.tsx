import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { LocationSelector } from "./pages/LocationSelector";
import { ScheduleViewer } from "./pages/ScheduleViewer";
import { MeetingCreator } from "./pages/MeetingCreator";
import { NotFound } from "./pages/NotFound";
import type { AttendeeArray, MeetingInfo } from "./types";
import "./styles/App.css";

function App() {
  const initialMeetingInfo = {
    description: "",
    duration: 1,
    meetingTimeString: "",
    title: "",
    location: "",
  };

  const [attendees, setAttendees] = useState<AttendeeArray>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [meetingInfo, setMeetingInfo] =
    useState<MeetingInfo>(initialMeetingInfo);
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
              setMeetingTime={setMeetingTime}
            />
          }
        />
        <Route
          path="/create"
          element={
            <MeetingCreator
              attendees={attendees}
              meetingInfo={meetingInfo}
              setMeetingInfo={setMeetingInfo}
              meetingTime={meetingTime}
              setMeetingTime={setMeetingTime}
            />
          }
        />
        <Route
          path="/preload"
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
