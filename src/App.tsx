// App component
import { useState } from "react";
import "./App.css";
import type { Settings } from "./types";
import WeekComponent from "./components/WeekComponent";

const App: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    units: "kilograms",
    trainingGoal: "powerlifting",
  });

  // Currently selected weekday, initialized to "Monday" in case we want a start value.
  const [selectedWeekday, setSelectedWeekday] = useState<string>("Monday");

  return (
    <div className="App">
      <h1>Workout Planner</h1>

      <div className="weekComponent">
        <WeekComponent
          selectedWeekday={selectedWeekday}
          setSelectedWeekday={setSelectedWeekday}
        />
      </div>
    </div>
  );
};

export default App;
