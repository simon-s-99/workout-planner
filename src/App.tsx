// App component
import { useState } from "react";
import "./App.css";
import ExerciseDropdownComponent from "./components/SetRepsWeight"; // Too lazy to change this ugly name rn
import type { Settings, Weekday } from "./types";
import WeekdayPicker from "./components/WeekdayPicker";
import UnitsPicker from "./components/UnitsPicker";

const App: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    units: "kilograms",
    trainingGoal: "powerlifting",
  });

  // Currently selected weekday, initialized to "Monday" in case we want a start value.
  const [selectedWeekday, setSelectedWeekday] = useState<Weekday>("Monday");
  return (
    <div className="App">
      <h1>Workout Planner</h1>

      <UnitsPicker setSettings={setSettings} />
      <WeekdayPicker
        selectedWeekday={selectedWeekday}
        setSelectedWeekday={
          setSelectedWeekday as React.Dispatch<React.SetStateAction<Weekday>>
        }
      />
      {/* Include the ExerciseDropdownComponent here */}
      <ExerciseDropdownComponent />
    </div>
  );
};

export default App;
