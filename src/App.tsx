// App component
import { useState } from "react";
import "./App.css";
import type { Settings } from "./types";
import { Weekday } from "./types";
import WeekComponent from "./components/WeekComponent";
import ExerciseDropdownComponent from "./components/SetRepsWeight"; // Too lazy to change this ugly name rn

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
      <WeekComponent
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
