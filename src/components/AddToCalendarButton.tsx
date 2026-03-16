import type { CalendarButtonImports } from "../types";

export function AddToCalendarButton({
  title,
  description,
  start,
  durationMinutes,
  location,
}: CalendarButtonImports) {
  const handleSubmit = () => {
    const meetingObject = {
      title,
      description,
      start,
      durationMinutes,
      location,
    };
    console.log(meetingObject);
  };

  return (
    <button type="button" className="share-btn" onClick={handleSubmit}>
      📅 Add to calendar
    </button>
  );
}
