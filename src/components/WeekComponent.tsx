import React from "react";
import { Weekday } from "../types";

// Define the props expected by the WeekComponent
interface WeekdayPicker {
  selectedWeekday: Weekday;
  // Function to update the selected weekday
  setSelectedWeekday: React.Dispatch<React.SetStateAction<Weekday>>;
}

const WeekComponent: React.FC<WeekdayPicker> = ({
  selectedWeekday,
  setSelectedWeekday,
}) => {
  return (
    <div className="WeekComponent">
      <h2 className="weekdays-heading">Day</h2>
      {(
        [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ] as Weekday[]
      ).map((weekday) => (
        <label
          key={weekday} // Unique key for each element in the list, which is required by React.
          className={`weekday-label ${
            selectedWeekday === weekday ? "selected" : ""
          }`}
          // Apply the "selected" class if the current weekday matches the selectedWeekday state
        >
          {weekday}
          <input
            className="weekday"
            type="radio"
            name="weekday"
            value={weekday}
            onChange={(e) => setSelectedWeekday(e.target.value as Weekday)}
            checked={selectedWeekday === weekday}
            // The radio button is checked if its value matches the selectedWeekday state.
          />
        </label>
      ))}
    </div>
  );
};

export default WeekComponent;
