import { useState } from "react";
import "./App.css";
import type { Settings } from "./types";
import WeekComponent from "./components/weekComponent";

const App: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    // Default values
    units: "kilograms",
    trainingGoal: "powerlifting",
  });

  // State for managing the selected weekday
  const [selectedWeekday, setSelectedWeekday] = useState<string>("Monday");

  return (
    <div className="App">
      <h1>Workout Planner</h1>
      {/* Week selection */}
      <div className="week-selector-container">
        <WeekComponent setSelectedWeekday={setSelectedWeekday} />
      </div>

      <div>Selected Day: {selectedWeekday}</div>
    </div>
  );
};

export default App;
