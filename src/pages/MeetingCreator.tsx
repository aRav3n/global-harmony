import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AddToCalendarButton } from "../components/AddToCalendarButton";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import type { MeetingCreatorImports } from "../types";
import {
  convertDateTimeToHhMmFormat,
  convertDateToString,
  generateHeadingTimeString,
  updateMeetingTimeFromString,
} from "../utils";
import "../styles/MeetingCreator.css";

export function MeetingCreator({
  attendees,
  meetingTime,
  setMeetingTime,
}: MeetingCreatorImports) {
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState<number>(1);
  const [meetingTimeString, setMeetingTimeString] = useState<string>("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const updateMeetingTimeString = () => {
    if (!meetingTime) {
      return null;
    }
    const newString = convertDateTimeToHhMmFormat(
      meetingTime,
      attendees[0].timezoneName,
    );
    setMeetingTimeString(newString);
  };

  // When meetingTime updates, set meetingTimeString or nav to schedule page
  useEffect(() => {
    if (meetingTime) {
      updateMeetingTimeString();
    } else {
      navigate("/schedule");
    }
  }, [meetingTime]);

  const handleUpdateStartTime = (newTimeString: string) => {
    if (!meetingTime) {
      return null;
    }
    updateMeetingTimeFromString({
      meetingTime,
      setMeetingTime,
      meetingTimeString,
      newTimeString,
    });
  };

  return (
    <div className="meeting-creator-container">
      <Header />
      <main className="meeting-creator-main">
        <form className="meeting-form">
          <div className="date-timezone-section">
            <h1>
              {meetingTime ? (
                generateHeadingTimeString(meetingTime)
              ) : (
                <Link to={"/schedule"}>
                  You need to go back and select a meeting time.
                </Link>
              )}
            </h1>

            <div className="timezone-list">
              {meetingTime &&
                attendees.map((attendee) => {
                  return (
                    <div key={attendee.id} className="timezone-item">
                      <span>
                        {`${attendee.name} - ${convertDateToString(
                          meetingTime,
                          attendee.timezoneName,
                        )} - (${attendee.timezoneName} timezone)`}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>

          <label htmlFor="title">
            Title
            <input
              type="text"
              placeholder="Add title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="title-input"
            />
          </label>

          <div className="time-section">
            <div className="time-group">
              <div className="time-inputs">
                <label htmlFor="start-time">
                  <span>Start Time: </span>
                  <input
                    type="time"
                    placeholder="HH:MM"
                    id="start-time"
                    value={meetingTimeString}
                    onChange={(e) => {
                      handleUpdateStartTime(e.target.value);
                    }}
                    className="time-input"
                  />
                  <span>{` - ${meetingTimeString}`}</span>
                </label>

                <label htmlFor="duration">
                  <span>Duration: </span>
                  <select
                    className="time-input"
                    name="duration"
                    id="duration"
                    value={duration.toString()}
                    onChange={(e) => {
                      setDuration(Number(e.target.value));
                    }}
                  >
                    <option value="0.5">1/2 hour</option>
                    <option value="1">1 hour</option>
                    <option value="1.5">1 - 1/2 hours</option>
                    <option value="2">2 hours</option>
                    <option value="2.5">2 - 1/2 hours</option>
                    <option value="3">3 hours</option>
                    <option value="3.5">3 - 1/2 hours</option>
                    <option value="4">4 hours</option>
                    <option value="4.5">4 - 1/2 hours</option>
                    <option value="5">5 hours</option>
                    <option value="5.5">5 - 1/2 hours</option>
                    <option value="6">6 hours</option>
                    <option value="6.5">6 - 1/2 hours</option>
                  </select>
                </label>
              </div>
            </div>
          </div>

          <label htmlFor="location">
            Meeting link
            <input
              type="text"
              id="location"
              placeholder="Video conference link"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="link-input"
            />
          </label>

          <label htmlFor="description">
            Description
            <textarea
              placeholder="Add description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="description-input"
            />
          </label>

          {meetingTime && (
            <AddToCalendarButton
              title={title}
              description={description}
              start={meetingTime}
              durationMinutes={duration * 60}
              location={location}
            />
          )}
        </form>
      </main>
      <Footer />
    </div>
  );
}
