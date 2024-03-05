import React, { useState, useEffect } from "react";
import "./App.css";
import SetRepsWeight from "./components/SetRepsWeight";
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

const App: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    units: "kilograms",
    trainingGoal: "powerlifting",
  });

  const [selectedWeekday, setSelectedWeekday] = useState<Weekday>("Monday");

  const [exercises, setExercises] = useState<ExerciseObject[]>([]);

  useEffect(() => {
    // Use the hook to fetch data and then set it to state
    const fetchedExercises = useLocalStorageRead(selectedWeekday);
    setExercises(fetchedExercises);
  }, [selectedWeekday]); // Re-fetch when selectedWeekday changes

  const weekdayExercises: ExerciseObject[] =
    useLocalStorageRead(selectedWeekday);

  function handleExerciseUpdate(updatedExercise: ExerciseObject): void {
    // Find and update the exercise in `weekdayExercises` or `exercises` state
    const updatedExercises = exercises.map((ex) =>
      ex.name === updatedExercise.name ? updatedExercise : ex
    );

    // Update your state and write back to localStorage
    setExercises(updatedExercises);
    useLocalStorageWrite(new Map([[selectedWeekday, updatedExercises]]));
  }

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

  //useLocalStorageWrite(testData);

  return (
    <div className="App">
      <h1>Workout Planner</h1>
      <MuscleCategoryList />
      <UnitsPicker setSettings={setSettings} />
      <WeekdayPicker
        selectedWeekday={selectedWeekday}
        setSelectedWeekday={setSelectedWeekday}
      />
      <SetRepsWeight weekday={selectedWeekday} />
    </div>
  );
};
export default App;
