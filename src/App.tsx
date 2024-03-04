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

  // This is the adjustment to directly update and persist changes without returning a new function
  const handleExerciseUpdate = (updatedExercise: ExerciseObject) => {
    const updatedExercises = exercises.map((exercise) =>
      exercise.name === updatedExercise.name
        ? { ...exercise, ...updatedExercise }
        : exercise
    );

    // Update the local state with the modified exercises
    setExercises(updatedExercises);

    // Persist the changes to local storage
    useLocalStorageWrite(selectedWeekday, updatedExercises);
  };

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
          updateExercise={(updatedExercise) =>
            handleExerciseUpdate(updatedExercise)
          }
        />
      ))}
    </div>
  );
};

export default App;
