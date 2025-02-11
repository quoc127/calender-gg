import { useEffect, useState } from "react";
import { MainCalendar } from "@/components/MainCalendar";
import { MiniCalendar } from "@/components/MiniCalendar";
import "react-calendar/dist/Calendar.css";
import { EvenList } from "@/components/EventList";
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

const CalendarApp = () => {
  const dispatch = useDispatch();
  const { eventsData } = useSelector((state) => state.events);
  console.log(eventsData);
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editingEvent, setEditingEvent] = useState(null);
  console.log(editingEvent);
  

  const [events, setEvents] = useState([]);

  const formattedDate = selectedDate.toLocaleDateString("en-CA");

  const dailyEvents = eventsData
    .map((event) => ({
      ...event,
      start: new Date(event.start),
      end: event.end ? new Date(event.end) : null,
    }))
    .filter(
      (event) => event.start.toLocaleDateString("en-CA") === formattedDate
    );

  const handleEventDrop = async (eventDropInfo) => {
    const { event } = eventDropInfo;

    const updatedEvent = {
      id: event.id,
      title: event.title,
      start: event.start.toISOString(),
      end: event.end ? event.end.toISOString() : null,
    };

    await dispatch(
      patchEvents({ id: updatedEvent.id, eventData: updatedEvent })
    );
    await dispatch(fetchAllEvents());
  };

  const handleAddEvent = async (eventData) => {
    await dispatch(postEvents(eventData));
    await dispatch(fetchAllEvents());
  };

  const handleUpdateEvent = async (eventData) => {
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
    setEvents(eventsData);
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
