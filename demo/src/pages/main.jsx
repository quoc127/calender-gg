import { useState } from "react";
import { MainCalendar } from "@/components/MainCalendar";
import { MiniCalendar } from "@/components/MiniCalendar";
import "react-calendar/dist/Calendar.css";
import { EvenList } from "@/components/EventList";

const setEventDate = (dateString, hours, minutes) => {
  const date = new Date(dateString);
  date.setHours(hours, minutes);
  return date;
};

const initialEvents = [
  {
    title: "First Session with Alex Stan",
    start: setEventDate("2025-02-07", 10, 30),
    end: setEventDate("2025-02-07", 11, 30),
    type: "appointment",
  },
  {
    title: "Webinar: How to cope with trauma",
    start: setEventDate("2025-02-06", 14, 0),
    end: setEventDate("2025-02-06", 14, 30),
    type: "event",
  },
  {
    title: "Webinar: How to cope with trauma",
    start: setEventDate("2025-02-17", 14, 0),
    end: setEventDate("2025-02-17", 15, 0),
    type: "event",
  },
  {
    title: "Click for www.eventbrite.sg",
    start: setEventDate("2025-02-14", 14, 0),
    url: "https://www.eventbrite.sg/e/anh-thuc-su-giau-co-69-tphcm-202122032025-tickets-1108945538959?aff=ebdssbdestsearch&keep_tld=1",
  },
];

const CalendarApp = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState(initialEvents);

  const formattedDate = selectedDate.toLocaleDateString("en-CA");

  const dailyEvents = initialEvents.filter((event) => {
    const eventDate = event.start.toLocaleDateString("en-CA");
    return eventDate === formattedDate;
  });

  const handleEventDrop = (eventDropInfo) => {
    const updatedEvents = events.map((event) =>
      event.id === eventDropInfo.event.id
        ? {
            ...event,
            start: eventDropInfo.event.start.toLocaleDateString("en-CA"),
          }
        : event
    );
    setEvents(updatedEvents);
  };

  return (
    <div className="flex flex-col md:flex-row p-4 bg-[#E4F6ED] min-h-screen">
      <div className="w-full md:w-1/3 p-4 bg-white shadow-lg rounded-lg">
        <MiniCalendar
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
        />
        <EvenList dailyEvents={dailyEvents} />
      </div>

      <div className="w-full md:w-2/3 p-4 mb-10">
        <MainCalendar
          events={initialEvents}
          handleEventDrop={handleEventDrop}
        />
      </div>
    </div>
  );
};

export default CalendarApp;
