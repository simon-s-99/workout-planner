import { useState } from "react";
import "./App.css";
import type { Settings } from "./types";

const App: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    // Default values
    units: "metric",
    trainingGoal: "bodybuilding",
  });

  return (
    <div className="App">
      <h1>Workout Planner</h1>
    </div>
  );
};

export default App;
