// App component
import { useState } from "react";
import "./App.css";
import type { Settings, Weekday } from "./types";
import MuscleCategory from "./components/MuscleCategory";
import WeekdayPicker from "./components/WeekdayPicker";
import UnitsPicker from "./components/UnitsPicker";
import TrainingGoalPicker from "./components/TrainingGoalPicker";

const App: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    units: "kilograms",
    trainingGoal: "powerlifting",
  });

  // Currently selected weekday, initialized to "Monday" in case we want a start value.
  const [selectedWeekday, setSelectedWeekday] = useState<Weekday>("Monday");
  return (
    <div className="App">
      <WeekdayPicker
        selectedWeekday={selectedWeekday}
        setSelectedWeekday={setSelectedWeekday as React.Dispatch<React.SetStateAction<Weekday>>}
      />
      <div>
        <h2>Exercises</h2>
        <h3>What is your training goal?</h3>
        <TrainingGoalPicker setSettings={setSettings} />
        <UnitsPicker setSettings={setSettings} />
        <MuscleCategory />
      </div>
    </div>
  );
};

export default App;
