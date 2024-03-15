import React from "react";
import { Weekday } from "../types";
import "../stylesheets/WeekdayPicker.css";

// This component is the list of weekdays that the user can choose from (switch to & from)
// ranging from monday-sunday allowing the user to have different lists of exercises & sets
// on different weekdays. 

// Define the props expected by the WeekdayPicker
interface WeekdayPickerProps {
  selectedWeekday: Weekday;
  // Function to update the selected weekday
  setSelectedWeekday: React.Dispatch<React.SetStateAction<Weekday>>;
}

const WeekdayPicker: React.FC<WeekdayPickerProps> = ({ selectedWeekday, setSelectedWeekday }) => {

const allWeekdays: Weekday[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <>
      <h2>Day</h2>
      <div className="WeekdayPicker">
        {allWeekdays.map(
          (weekday) => (
            <label
              key={weekday} // Unique key for each element in the list, which is required by React.
              className={`WeekdayLabel ${selectedWeekday === weekday ? "Selected" : ""}`}
              // Apply the "selected" class if the current weekday matches the selectedWeekday state
            >
              {weekday}
              <input
                className="WeekdayInput"
                type="radio"
                name="weekday"
                value={weekday}
                onChange={(e) => setSelectedWeekday(e.target.value as Weekday)}
                checked={selectedWeekday === weekday}
                // The radio button is checked if its value matches the selectedWeekday state.
              />
            </label>
          )
        )}
      </div>
    </>
  );
};

export default WeekdayPicker;
