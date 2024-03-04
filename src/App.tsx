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
    const storedExercises = useLocalStorageRead(selectedWeekday);
    if (storedExercises) {
      const uniqueExercises = storedExercises.filter(
        (exercise, index, self) =>
          index === self.findIndex((e) => e.name === exercise.name)
      );
      setExercises(uniqueExercises);
    }
  }, [selectedWeekday]);

  const handleExerciseUpdate = (updatedExercise: ExerciseObject) => {
    const updatedExercises = exercises.map((exercise) =>
      exercise.name === updatedExercise.name ? updatedExercise : exercise
    );
    setExercises(updatedExercises);
  };

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

  // const clearTestData = () => {
  //   const weekdays = [
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Saturday",
  //     "Sunday",
  //   ];
  //   weekdays.forEach((day) => {
  //     localStorage.removeItem(day);
  //   });
  //   console.log("Test data cleared from localStorage.");
  // };
  // useEffect(() => {
  //   clearTestData();
  // }, []);

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
        />
      ))}
    </div>
  );
};

export default App;
