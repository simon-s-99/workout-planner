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
      setExercises(storedExercises);
    }
  }, [selectedWeekday]);

  useEffect(() => {
    // Construct a WeekdayExerciseMap for the current selectedWeekday and its exercises
    const updatedMap: WeekdayExerciseMap = new Map();
    updatedMap.set(selectedWeekday, exercises);

    // Directly call useLocalStorageWrite with the updated map
    useLocalStorageWrite(updatedMap);
  }, [selectedWeekday, exercises]);

  const handleExerciseUpdate = (updatedExercise: ExerciseObject) => {
    const updatedExercises = exercises.map((exercise) =>
      exercise.name === updatedExercise.name ? updatedExercise : exercise
    );
    setExercises(updatedExercises);
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
          updateExercise={handleExerciseUpdate}
        />
      ))}
    </div>
  );
};

export default App;
