import { useEffect, useState } from "react";
import { MainCalendar } from "@/components/MainCalendar";
import { MiniCalendar } from "@/components/MiniCalendar";
import "react-calendar/dist/Calendar.css";
import { EvenList } from "@/components/EventList";
import { RRule } from "rrule";
import { EventForm } from "@/components/EventForm";
import { Button } from "@/components/ui/button";
import { Note } from "@/components/Note";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllEvents,
  patchEvents,
  postEvents,
  removeEvents,
} from "@/store/events-slice";

const generateRecurringEvents = (eventList) => {
  const generatedEvents = [];
  console.log("generatedEvents",generatedEvents);
  
  eventList.forEach((event) => {
    if (event.recurrence) {
      const rule = new RRule({
        freq: RRule[event.recurrence.freq.toUpperCase()],
        dtstart: new Date(event.start),
        interval: event.recurrence.interval || 1,
        count: event.recurrence.count || null,
      });

      rule.all().forEach((date) => {
        generatedEvents.push({
          ...event,
          start: new Date(date),
          end: event.end ? new Date(date.getTime() + (new Date(event.end) - new Date(event.start))) : null,
        });
      });
    } else {
      generatedEvents.push({
        ...event,
        start: new Date(event.start),
        end: event.end ? new Date(event.end) : null, 
      });
    }
  });
  return generatedEvents;
};

const CalendarApp = () => {
  const dispatch = useDispatch();
  const { eventsData } = useSelector((state) => state.events);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editingEvent, setEditingEvent] = useState(null);

  const [events, setEvents] = useState([]);

  const formattedDate = selectedDate.toLocaleDateString("en-CA");

  const dailyEvents = events.filter((event) => {
    const eventDate =
      event.start instanceof Date
        ? event.start.toLocaleDateString("en-CA")
        : new Date(event.start).toLocaleDateString("en-CA");

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
  };

  const handleAddEvent = async (eventData) => {
    await dispatch(postEvents(eventData));
    await dispatch(fetchAllEvents());
  };

  const handleUpdateEvent = async (eventData) => {
    console.log(eventData);
    await dispatch(patchEvents({ id: editingEvent.id, eventData }));
    await dispatch(fetchAllEvents());
  };

  const handleDeleteEvent = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!isConfirmed) return;

    await dispatch(removeEvents(id));
    await dispatch(fetchAllEvents());
  };
  useEffect(() => {
    if (eventsData.length > 0) {
      const recurringEvents = generateRecurringEvents(eventsData);
      setEvents(recurringEvents);
    }
  }, [eventsData]);

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-4 bg-[#E4F6ED] min-h-screen">
      <div className="w-full h-full lg:h-[590px] xl:h-full md:h-[590px] md:overflow-y-scroll xl:overflow-y-hidden p-4 bg-white shadow-lg rounded-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <MiniCalendar
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
          />
          <EventForm
            onAddEvent={handleAddEvent}
            editingEvent={editingEvent}
            onUpdateEvent={handleUpdateEvent}
          />
        </div>

        <EvenList
          dailyEvents={dailyEvents}
          onEditEvent={setEditingEvent}
          onDeleteEvent={handleDeleteEvent}
        />
      </div>
      <Note isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="w-full min-h-96 p-4 mb-10">
        <Button onClick={() => setIsOpen(true)}>Note</Button>
        <MainCalendar events={events} handleEventDrop={handleEventDrop} />
      </div>
    </div>
  );
};

export default CalendarApp;
