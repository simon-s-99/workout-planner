// App component
import { useState } from "react";
import "./App.css";
import type { Settings, Weekday } from "./types";
import MuscleCategoryList from './components/MuscleCategoryList';
import WeekdayPicker from "./components/WeekdayPicker";
import UnitsPicker from "./components/UnitsPicker";
import PieChart from "./components/PieChart";
import TrainingGoalPicker from "./components/TrainingGoalPicker";

const App: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    units: "kilograms",
    trainingGoal: "powerlifting",
  });

  // Currently selected weekday, initialized to "Monday" in case we want a start value.
  const [selectedWeekday, setSelectedWeekday] = useState<Weekday>("Monday");

  // bool to help toggle between the add exercise interface and the main content
  const [showAddExerciseMenu, setShowAddExerciseMenu] = useState<boolean>(false);
  let AddExerciseOrGoBackButton: JSX.Element = (
    <label>
      <input
        type="button"
        name={showAddExerciseMenu ? "GoBackFromExerciseMenuButton" : "AddExerciseMenuButton"}
        value={showAddExerciseMenu ? "<" : "+"}
        onClick={() => setShowAddExerciseMenu(!showAddExerciseMenu)}></input>
      {/* ^ toggle showAddExerciseMenu to true if it is false and vice versa */}
    </label>
  );

  return (
    <div className="App">
      <h1>Workout Planner</h1>
      <UnitsPicker setSettings={setSettings} />
      <WeekdayPicker
        selectedWeekday={selectedWeekday}
        setSelectedWeekday={setSelectedWeekday as React.Dispatch<React.SetStateAction<Weekday>>}
      />
      <div>
        <h2>Exercises</h2>
        <h3>What is your training goal?</h3>
        <TrainingGoalPicker setSettings={setSettings} />
        <UnitsPicker setSettings={setSettings} />
      </div>

      {/* The code below shows the "normal" interface with exercise names,
          sets, reps & weight or the add exercise interface where the user
          can pick exercises to add to their program. (Uses ternary operator for brevity.)*/}
      <main>
        {showAddExerciseMenu ? (
          <div className="AddExerciseMenu">
            {AddExerciseOrGoBackButton}
            <MuscleCategoryList weekday={selectedWeekday} />
          </div>
        ) : (
          <div className="AddExerciseMenu">
            {AddExerciseOrGoBackButton}
          </div>
        )}
      </main>

      <PieChart />

    </div>
  );
};

export default App;
