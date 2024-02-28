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
      <h2 className="weekdays-heading">Day</h2>
      {weekdays.map((weekday) => (
        <label
          key={weekday}
          className={`weekday-label ${
            selectedWeekday === weekday ? "selected" : ""
          }`}
        >
          {weekday}
          <input
            type="radio"
            name="weekday"
            value={weekday}
            className="weekday-radio"
            onChange={(e) => setSelectedWeekday(e.target.value)}
            checked={selectedWeekday === weekday}
          />
        </label>
      ))}
    </div>
  );
};

export default WeekComponent;
