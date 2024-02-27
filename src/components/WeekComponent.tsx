import React from "react";

// Define the props expected by the WeekComponent
interface WeekdayPickerProps {
  selectedWeekday: string;

  // Function to update the selected weekday
  setSelectedWeekday: React.Dispatch<React.SetStateAction<string>>;
}

const WeekComponent: React.FC<WeekdayPickerProps> = ({
  selectedWeekday,
  setSelectedWeekday,
}) => {
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="WeekComponent">
      {weekdays.map((weekday) => (
        <label key={weekday}>
          {weekday}
          <input
            type="radio"
            name="weekday"
            value={weekday}
            onChange={(e) => setSelectedWeekday(e.target.value)} // Update selectedWeekday
            checked={selectedWeekday === weekday} // Mark as checked if it matches the selectedWeekday
          />
        </label>
      ))}
    </div>
  );
};

export default WeekComponent;
