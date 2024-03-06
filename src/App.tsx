import React, { useState, useEffect } from "react";
import "./App.css";
import Exercise from "./components/Exercise";
import type {
  Settings,
  Weekday,
  ExerciseObject,
  WeekdayExerciseMap,
} from "./types";
import MuscleCategoryList from "./components/MuscleCategoryList";
import WeekdayPicker from "./components/WeekdayPicker";
import UnitsPicker from "./components/UnitsPicker";
import { useLocalStorageRead } from "./hooks/useLocalStorageRead";
import { useLocalStorageWrite } from "./hooks/useLocalStorageWrite";
import PieChart from "./components/PieChart";

const App: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    units: "kilograms",
    trainingGoal: "powerlifting",
  });

  const [selectedWeekday, setSelectedWeekday] = useState<Weekday>("Monday");

  // const [exercises, setExercises] = useState<ExerciseObject[]>([]);

  const weekdayExercises: ExerciseObject[] =
    useLocalStorageRead(selectedWeekday);

  const testData: WeekdayExerciseMap = new Map<Weekday, ExerciseObject[]>([
    [
      "Monday",
      [
        {
          name: "Bench Press",
          type: "Strength",
          muscle: "Chest",
          equipment: "Barbell",
          difficulty: "Intermediate",
          instructions:
            "Lie on the bench, lift the barbell, keep your feet flat on the ground.",
          sets: [
            {
              repetitions: 10,
              weight: 200,
              completed: false,
            },
            {
              repetitions: 8,
              weight: 220,
              completed: false,
            },
          ],
          completed: false,
        },
        {
          name: "Bench Press",
          type: "Strength",
          muscle: "Chest",
          equipment: "Barbell",
          difficulty: "Intermediate",
          instructions:
            "Lie on the bench, lift the barbell, keep your feet flat on the ground.",
          sets: [
            {
              repetitions: 10,
              weight: 200,
              completed: false,
            },
            {
              repetitions: 8,
              weight: 220,
              completed: false,
            },
          ],
          completed: false,
        },
        {
          name: "Bench Press",
          type: "Strength",
          muscle: "Chest",
          equipment: "Barbell",
          difficulty: "Intermediate",
          instructions:
            "Lie on the bench, lift the barbell, keep your feet flat on the ground.",
          sets: [
            {
              repetitions: 10,
              weight: 200,
              completed: false,
            },
            {
              repetitions: 8,
              weight: 220,
              completed: false,
            },
          ],
          completed: false,
        },
      ],
    ],
  ]);

  // useLocalStorageWrite(testData);

  // bool to help toggle between the add exercise interface and the main content
  const [showAddExerciseMenu, setShowAddExerciseMenu] =
    useState<boolean>(false);
  let AddExerciseOrGoBackButton: JSX.Element = (
    <label>
      <input
        type="button"
        name={
          showAddExerciseMenu
            ? "GoBackFromExerciseMenuButton"
            : "AddExerciseMenuButton"
        }
        value={showAddExerciseMenu ? "<" : "+"}
        onClick={() => setShowAddExerciseMenu(!showAddExerciseMenu)}
      ></input>
      {/* ^ toggle showAddExerciseMenu to true if it is false and vice versa */}
    </label>
  );

  return (
    <div className="App">
      <h1>Workout Planner</h1>
      <UnitsPicker setSettings={setSettings} />
      <WeekdayPicker
        selectedWeekday={selectedWeekday}
        setSelectedWeekday={setSelectedWeekday}
      />

      <Exercise weekday={selectedWeekday} />

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
          <div className="AddExerciseMenu">{AddExerciseOrGoBackButton}</div>
        )}
      </main>

      <PieChart />
    </div>
  );
};
export default App;
