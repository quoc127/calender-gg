import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./style/MainCalendar.css";

export const MainCalendar = ({ events, handleEventDrop }) => {
  return (
    <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          editable={true}
          eventDrop={handleEventDrop}
          dayMaxEventRows={3}
          eventClassNames={(event) =>
            event.event.extendedProps.type === "appointment"
              ? "bg-[#0F4C81] text-white"
              : "bg-[#F9BE81] text-black"
          }
        />
  );
};
