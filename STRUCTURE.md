# Global Harmony - Meeting Scheduler

A React TypeScript application for scheduling meetings across different timezones.

## Project Structure

```
src/
├── components/                 # Reusable UI components
│   ├── Header.tsx              # Page header component
│   ├── Header.css
│   ├── Footer.tsx              # Page footer component
│   └── Footer.css
├── pages/                      # Page components (routed)
│   ├── LocationSelector.tsx    # Step 1: Select locations and attendees
│   ├── LocationSelector.css
│   ├── ScheduleViewer.tsx      # Step 2: View schedule in GMT and local times
│   ├── ScheduleViewer.css
│   ├── MeetingCreator.tsx      # Step 3: Create/edit meeting details
│   └── MeetingCreator.css
├── types.ts                    # TypeScript interfaces and types
├── utils.ts                    # Utility functions for timezone handling
├── App.tsx                     # Main app component with routing
├── App.css
├── main.tsx                    # React entry point
├── index.css                   # Global styles
└── assets/                     # Static assets
```

## Routes

- `/` - Location Selector (select attendees and cities)
- `/schedule` - Schedule Viewer (view available times across timezones)
- `/create` - Meeting Creator (create/edit meeting details)

## Features

### 1. Location Selector (`/`)
- Input date (Year, Month, Day)
- Add multiple attendees with their cities
- Dynamic location addition with "Add More Locations" button
- Navigate to schedule viewer to check availability

### 2. Schedule Viewer (`/schedule`)
- View meeting times in Greenwich Mean Time
- See local times for each attendee in their timezone
- Click on time slots to select a meeting time
- Browse different dates

### 3. Meeting Creator (`/create`)
- Set meeting title
- Configure timezone display for each attendee
- Set start and end times (24-hour and 12-hour formats)
- Add video conference link
- Add meeting description
- Share meeting with attendees

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
npm run build
```

## Technologies

- React 19
- TypeScript
- Vite
- React Router DOM
- CSS3

## Types

### Attendee
```typescript
interface Attendee {
  id: string;
  name: string;
  city: string;
}
```

### Meeting
```typescript
interface Meeting {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  videoLink: string;
  description: string;
  attendees: Attendee[];
  createdBy: string;
}
```

## Utilities

Available utility functions in `utils.ts`:
- `formatDate()` - Format date as YYYY-MM-DD
- `parseDate()` - Parse date string to Date object
- `convertToTimezone()` - Convert date to specific timezone
- `getTimezoneAbbreviation()` - Get timezone abbreviation (e.g., EST, PST)
