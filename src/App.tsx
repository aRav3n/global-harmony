import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./styles/App.css";

import { LocationSelector } from "./pages/LocationSelector";
import { MeetingCreator } from "./pages/MeetingCreator";
import { NotFound } from "./pages/NotFound";
import { ScheduleViewer } from "./pages/ScheduleViewer";
import { TimeConversion } from "./pages/TimeConversion";

import type { AttendeeArray, MeetingInfo } from "./types";
import {
  setUpInitialLocationArray,
  updateAttendeesInLocalStorage,
} from "./utils";

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

  const localStorageKey = "attendeesArray";

  useEffect(() => {
    const localAttendeeArrayJson = localStorage.getItem(localStorageKey);
    const attendeesAsJsonString = JSON.stringify(attendees);

    if (localAttendeeArrayJson !== attendeesAsJsonString) {
      updateAttendeesInLocalStorage(attendees);
    }
  }, [attendees]);

  useEffect(() => {
    setUpInitialLocationArray(localStorageKey, setAttendees, attendees);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <TimeConversion
              attendees={attendees}
              setAttendees={setAttendees}
              dateTime={date}
              setDateTime={setDate}
            />
          }
        />
        <Route
          path="/meeting/create"
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
          path="/meeting/preload"
          element={
            <LocationSelector
              attendees={attendees}
              setAttendees={setAttendees}
              date={date}
              setDate={setDate}
            />
          }
        />
        <Route
          path="/meeting/schedule"
          element={
            <ScheduleViewer
              attendees={attendees}
              date={date}
              setMeetingTime={setMeetingTime}
            />
          }
        />
        <Route
          path="/meeting"
          element={
            <LocationSelector
              attendees={attendees}
              setAttendees={setAttendees}
              date={date}
              setDate={setDate}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
