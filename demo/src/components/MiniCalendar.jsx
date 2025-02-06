import Calendar from "react-calendar";

export const MiniCalendar = ({ setSelectedDate, selectedDate }) => {
  return (
    <Calendar
      onChange={setSelectedDate}
      value={selectedDate}
      className="border-none"
    />
  );
};