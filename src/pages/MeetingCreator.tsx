import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import './MeetingCreator.css';

export function MeetingCreator() {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState({ year: '', month: '', day: '' });
  const [timezones, setTimezones] = useState({
    me: '',
    person2: '',
    person3: '',
    person4: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      title,
      date,
      startTime,
      endTime,
      videoLink,
      description,
      timezones,
    });
  };

  return (
    <div className="meeting-creator-container">
      <Header />
      <main className="meeting-creator-main">
        <form onSubmit={handleSubmit} className="meeting-form">
          <div className="date-timezone-section">
            <div className="date-inputs">
              <input
                type="text"
                placeholder="YYYY"
                value={date.year}
                onChange={(e) => setDate({ ...date, year: e.target.value })}
                className="date-input"
              />
              <input
                type="text"
                placeholder="Month"
                value={date.month}
                onChange={(e) => setDate({ ...date, month: e.target.value })}
                className="date-input"
              />
              <input
                type="text"
                placeholder="DD"
                value={date.day}
                onChange={(e) => setDate({ ...date, day: e.target.value })}
                className="date-input"
              />
            </div>

            <div className="timezone-list">
              <div className="timezone-item">
                <span>Time Zone - Me</span>
              </div>
              <div className="timezone-item">
                <input
                  type="text"
                  placeholder="YYYY"
                  readOnly
                  className="timezone-display"
                />
                <input
                  type="text"
                  placeholder="Month"
                  readOnly
                  className="timezone-display"
                />
                <input
                  type="text"
                  placeholder="DD"
                  readOnly
                  className="timezone-display"
                />
              </div>
              <div className="timezone-item">Time Zone - Person 2</div>
              <div className="timezone-item">Time Zone - Person 3</div>
              <div className="timezone-item">Time Zone - Person 4</div>
            </div>
          </div>

          <input
            type="text"
            placeholder="Add title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="title-input"
          />

          <div className="time-section">
            <div className="time-group">
              <label>Start Time</label>
              <div className="time-inputs">
                <input
                  type="text"
                  placeholder="HH:MM"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="time-input"
                />
                <input
                  type="text"
                  placeholder="H:MMam"
                  className="time-input"
                  readOnly
                />
              </div>
            </div>

            <div className="time-group">
              <label>End Time</label>
              <div className="time-inputs">
                <input
                  type="text"
                  placeholder="HH:MM"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="time-input"
                />
                <input
                  type="text"
                  placeholder="H:MMam"
                  className="time-input"
                  readOnly
                />
              </div>
            </div>

            <button className="calendar-btn">📅</button>
            <span className="date-display">YYYY - Month - DD</span>
          </div>

          <input
            type="text"
            placeholder="Video conference link"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            className="link-input"
          />

          <textarea
            placeholder="Add description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="description-input"
          />

          <button type="submit" className="share-btn">
            Share Meeting
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
