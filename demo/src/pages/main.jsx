import { useState } from "react";
import { MainCalendar } from "@/components/MainCalendar";
import { MiniCalendar } from "@/components/MiniCalendar";
import "react-calendar/dist/Calendar.css";
import { EvenList } from "@/components/EventList";
import { RRule } from "rrule";
import { EventForm } from "@/components/EventForm";

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
    title: "First Session with Alex Stan",
    start: setEventDate("2025-02-07", 10, 30),
    end: setEventDate("2025-02-07", 11, 30),
    type: "appointment",
  },
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
  {
    title: "Weekly Meeting",
    start: setEventDate("2025-02-07", 10, 0),
    end: setEventDate("2025-02-07", 11, 30),
    type: "appointment",
    recurrence: {
      freq: "WEEKLY",
      interval: 1,
      count: 5,
    },
  },
  {
    title: "Monthly Report",
    start: setEventDate("2025-02-09", 14, 0),
    end: setEventDate("2025-02-09", 15, 0),
    type: "event",
    recurrence: {
      freq: "MONTHLY",
      interval: 1,
      count: 3,
    },
  },
];

const generateRecurringEvents = (eventList) => {
  const generatedEvents = [];
  eventList.forEach((event) => {
    if (event.recurrence) {
      const rule = new RRule({
        freq: RRule[event.recurrence.freq],
        dtstart: new Date(event.start),
        interval: event.recurrence.interval || 1,
        count: event.recurrence.count || null,
      });

      rule.all().forEach((date) => {
        generatedEvents.push({
          ...event,
          start: date,
          end: new Date(
            date.getTime() + (new Date(event.end) - new Date(event.start))
          ),
        });
      });
    } else {
      generatedEvents.push(event);
    }
  });
  return generatedEvents;
};

const CalendarApp = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editingEvent, setEditingEvent] = useState(null);

  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("events");
    return savedEvents
      ? JSON.parse(savedEvents).map((event) => ({
          ...event,
          start: new Date(event.start),
          end: event.end ? new Date(event.end) : null,
        }))
      : generateRecurringEvents(initialEvents);
  });

  const formattedDate = selectedDate.toLocaleDateString("en-CA");

  const dailyEvents = events.filter((event) => {
    const eventDate = event.start.toLocaleDateString("en-CA");
    return eventDate === formattedDate;
  });

  const handleEventDrop = (eventDropInfo) => {
    const updatedEvents = events.map((event) =>
      event.title === eventDropInfo.event.title &&
      event.start.getTime() === new Date(eventDropInfo.oldEvent.start).getTime()
        ? {
            ...event,
            start: new Date(eventDropInfo.event.start),
            end: event.end ? new Date(eventDropInfo.event.end) : null,
          }
        : event
    );

    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const addEvent = (eventData) => {
    const newEvent = {
      title: eventData.title,
      start: new Date(eventData.start),
      end: eventData.end ? new Date(eventData.end) : null,
      type: eventData.type,
    };

    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const updateEvent = (eventData) => {
    const updatedEvents = events.map((event) => {
      return event.start.getTime() === editingEvent.start.getTime()
        ? { ...event, ...eventData }
        : event;
    });
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setEditingEvent(null);
  };

  const deleteEvent = (start) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!isConfirmed) return;

    const updatedEvents = events.filter(
      (event) => event.start.getTime() !== start.getTime()
    );
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-4 bg-[#E4F6ED] min-h-screen">
      <div className="">
        <div className="w-full h-full lg:h-[590px] xl:h-full md:h-[590px] md:overflow-y-scroll xl:overflow-y-hidden p-4 bg-white shadow-lg rounded-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <MiniCalendar
              setSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
            />
            <EventForm
              onAddEvent={addEvent}
              editingEvent={editingEvent}
              onUpdateEvent={updateEvent}
            />
          </div>

          <EvenList
            dailyEvents={dailyEvents}
            onEditEvent={setEditingEvent}
            onDeleteEvent={deleteEvent}
          />
        </div>
      </div>

      <div className="w-full min-h-96 p-4 mb-10">
        <MainCalendar events={events} handleEventDrop={handleEventDrop} />
      </div>
    </div>
  );
};

export default CalendarApp;
