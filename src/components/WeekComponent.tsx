import React from "react";

// Props for WeekdayPicker, allowing for setting the selected weekday in a parent component
interface WeekdayPickerProps {
  setSelectedWeekday: React.Dispatch<React.SetStateAction<string>>;
}

// WeekdayPicker component for selecting a weekday
const WeekComponent: React.FC<WeekdayPickerProps> = ({
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

  // Handler function for when a radio button is changed
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    // Update the selected weekday based on the radio button's value
    setSelectedWeekday(e.target.value);
  }

  // Render radio buttons for each weekday
  return (
    <div className="WeekComponent">
      {weekdays.map((weekday) => (
        <label key={weekday}>
          {weekday}
          <input
            type="radio"
            name="weekday"
            value={weekday}
            onChange={handleChange}
            // standard value set to monday
            checked={weekday === "Monday"}
          />
        </label>
      ))}
    </div>
  );
};

export default WeekComponent;
