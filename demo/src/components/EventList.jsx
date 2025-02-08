export const EvenList = ({ dailyEvents, onEditEvent }) => {
  return (
    <>
      <h3 className="text-lg font-semibold mt-4">Upcoming Events</h3>
      <div>
        {dailyEvents.length > 0 ? (
          dailyEvents.map((event, index) => (
            <div
              key={index}
              className={`p-3 mt-2 rounded-lg text-white flex justify-between items-center ${
                event.type === "appointment" ? "bg-[#0F4C81]" : "bg-[#F9BE81]"
              }`}
            >
              <div>
                <p className="font-bold">{event.title}</p>
                <p className="font-bold">
                  {event.start.toLocaleString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                  {event.end
                    ? ` - ${event.end.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}`
                    : ""}
                </p>
              </div>
              <div className="flex flex-row gap-4">
                <button
                  onClick={() => onEditEvent(event)}
                  className="bg-yellow-500 text-black px-3 py-1 rounded"
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No events for today</p>
        )}
      </div>
    </>
  );
};
