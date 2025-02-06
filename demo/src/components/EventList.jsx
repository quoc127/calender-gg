export const EvenList = ({ dailyEvents }) => {
  return (
    <>
      <h3 className="text-lg font-semibold mt-4">Upcoming Events</h3>
      <div>
        {dailyEvents.length > 0 ? (
          dailyEvents.map((event, index) => (
            <div
              key={index}
              className={`p-3 mt-2 rounded-lg text-white ${
                event.type === "appointment" ? "bg-[#0F4C81]" : "bg-[#F9BE81]"
              }`}
            >
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
          ))
        ) : (
          <p className="text-gray-500">No events for today</p>
        )}
      </div>
    </>
  );
};
