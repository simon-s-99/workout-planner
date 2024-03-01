// App component
import { useState } from "react";
import "./App.css";
import type { Settings, Weekday } from "./types";
import MuscleCategory from './components/MuscleCategory';
import WeekdayPicker from "./components/WeekdayPicker";
import UnitsPicker from "./components/UnitsPicker";
import PieChart from "./components/PieChart";

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
      <MuscleCategory />
      <UnitsPicker setSettings={setSettings} />
      <WeekdayPicker
        selectedWeekday={selectedWeekday}
        setSelectedWeekday={setSelectedWeekday as React.Dispatch<React.SetStateAction<Weekday>>}
      />
      <PieChart/>
    </div>
  );
};

export default App;
