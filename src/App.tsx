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

  const weekdayExercises: ExerciseObject[] =
    useLocalStorageRead(selectedWeekday);

  // This function handles updates to an individual exercise. It's typically triggered
  // by some user action in the UI, such as completing an exercise or updating its details.
  const handleExerciseUpdate = (updatedExercise: ExerciseObject) => {
    // Maps over the current list of exercises, looking for the exercise that matches it

    const updatedExercises = exercises.map((exercise) =>
      exercise.name === updatedExercise.name
        ? { ...exercise, ...updatedExercise }
        : exercise
    );

    setExercises(updatedExercises);

    // Calls the "write" function with the currently selected weekday and the updated list
    useLocalStorageRead(selectedWeekday);
  };

  const testData: WeekdayExerciseMap = new Map<Weekday, ExerciseObject[]>([
    [
      "Friday",
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

  return (
    <div className="App">
      <h1>Workout Planner</h1>
      <MuscleCategoryList />
      <UnitsPicker setSettings={setSettings} />
      <WeekdayPicker
        selectedWeekday={selectedWeekday}
        setSelectedWeekday={setSelectedWeekday}
      />
      {exercises.map((exercise, index) => (
        <SetRepsWeight
          key={index}
          exercise={exercise}
          updateExercise={handleExerciseUpdate}
          weekday={selectedWeekday}
        />
      ))}
    </div>
  );
};

export default App;
