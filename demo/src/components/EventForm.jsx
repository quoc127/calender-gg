import { useEffect, useState } from "react";

export const EventForm = ({ onAddEvent, editingEvent, onUpdateEvent }) => {
  const [title, setTitle] = useState(editingEvent ? editingEvent.title : "");
  const [start, setStart] = useState(
    editingEvent ? new Date(editingEvent.start).toISOString().slice(0, 16) : ""
  );
  const [end, setEnd] = useState(
    editingEvent ? new Date(editingEvent.end).toISOString().slice(0, 16) : ""
  );
  const [type, setType] = useState(editingEvent ? editingEvent.type : "appointment");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !start) {
      alert("Please fill in the title and start date.");
      return;
    }
    const eventData = {
      title,
      start: new Date(start),
      end: end ? new Date(end) : null,
      type: type,
    };

    if (editingEvent) {
      onUpdateEvent(eventData);
    } else {
      onAddEvent(eventData);
    }
    setTitle("");
    setStart("");
    setEnd("");
    setType("appointment");
  };

  // useEffect(() => {
  //   if (editingEvent) {
  //     setTitle(editingEvent.title);
  //     setStart(new Date(editingEvent.start).toISOString().slice(0, 16));
  //     setEnd(editingEvent.end ? new Date(editingEvent.end).toISOString().slice(0, 16) : "");
  //     setType(editingEvent.type);
  //   }
  // }, [editingEvent]);

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
  
      const localStart = new Date(editingEvent.start);
      localStart.setMinutes(localStart.getMinutes() - localStart.getTimezoneOffset()); 
  
      const localEnd = editingEvent.end ? new Date(editingEvent.end) : null;
      if (localEnd) {
        localEnd.setMinutes(localEnd.getMinutes() - localEnd.getTimezoneOffset());
      }
  
      setStart(localStart.toISOString().slice(0, 16));
      setEnd(localEnd ? localEnd.toISOString().slice(0, 16) : "");
      setType(editingEvent.type);
    }
  }, [editingEvent]);
  

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-80 mt-5 md:mt-5 md:m-auto lg:mt-0">
      <h2 className="text-xl font-semibold mb-4">{editingEvent ? "Edit event" : "Add event"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title event..."
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">Start date</label>
          <input
            type="datetime-local"
            className="w-full border rounded p-2"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">End date</label>
          <input
            type="datetime-local"
            className="w-full border rounded p-2"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">Event type</label>
          <select
            className="w-full border rounded p-2"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="appointment">Appointment</option>
            <option value="event">Event</option>
          </select>
        </div>

        {/* <div className="mb-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={isRecurring}
              onChange={() => setIsRecurring(!isRecurring)}
            />
            Repeat Event
          </label>
        </div> */}

        {/* {isRecurring && (
          <>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">Repeat every</label>
              <select
                className="w-full border rounded p-2"
                value={freq}
                onChange={(e) => setFreq(e.target.value)}
              >
                <option value="DAILY">Daily</option>
                <option value="WEEKLY">Weekly</option>
                <option value="MONTHLY">Monthly</option>
                <option value="YEARLY">Yearly</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">Interval</label>
              <input
                type="number"
                className="w-full border rounded p-2"
                value={interval}
                min="1"
                onChange={(e) => setInterval(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">Occurrences</label>
              <input
                type="number"
                className="w-full border rounded p-2"
                value={count}
                min="1"
                onChange={(e) => setCount(e.target.value)}
              />
            </div>
          </>
        )} */}

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          {editingEvent ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};
