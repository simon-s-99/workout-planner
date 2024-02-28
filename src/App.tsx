import { useState } from "react";
import "./App.css";
import type { Settings } from "./types";
import MuscleCategory from './components/MuscleCategory.tsx';

const App: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    // Default values
    units: "kilograms",
    trainingGoal: "powerlifting",
  });

  return (
    <div className="App">
      <h1>Workout Planner</h1>
      <MuscleCategory></MuscleCategory>
    </div>
  );
};

export default App;
