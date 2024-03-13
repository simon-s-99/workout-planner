import React from "react";
import { Weekday } from "../types";

// Define the props expected by the WeekdayPicker
interface WeekdayPickerProps {
  selectedWeekday: Weekday;
  // Function to update the selected weekday
  setSelectedWeekday: React.Dispatch<React.SetStateAction<Weekday>>;
}

const WeekdayPicker: React.FC<WeekdayPickerProps> = ({
  selectedWeekday,
  setSelectedWeekday,
}) => {
  return (
    <div className="WeekdayPicker" style={styles.main}>
      <h2 className="weekdays-heading">
        Day
      </h2>
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
          style={styles.weekdayLabel}
          // Apply the "selected" class if the current weekday matches the selectedWeekday state
        >
          {weekday}
          <input
            className="weekday"
            type="radio"
            style={styles.weekday}
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

const styles = {
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  weekday: {
    opacity: "0",
    width: "0",
    height: "0",
    position: "absolute",
  },
  weekdayLabel: {
    display: "inline-block",
    textAlign: "start",
    padding: "10px 40px 10px 10px",
    cursor: "pointer",
    border: "1px solid black",
    transition: "all 0.3s ease",
    width: "60%",
    fontWeight: "bold",
  },
};

export default WeekdayPicker;
