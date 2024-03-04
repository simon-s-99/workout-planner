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

// Utility to serialize a WeekdayExerciseMap to a string
const serializeWeekdayExerciseMap = (map: WeekdayExerciseMap): string => {
  const entries = Array.from(map.entries());
  return JSON.stringify(entries);
};

// Utility to deserialize a string back to a WeekdayExerciseMap
const deserializeWeekdayExerciseMap = (
  serializedMap: string
): WeekdayExerciseMap => {
  const entries: [Weekday, ExerciseObject[]][] = JSON.parse(serializedMap);
  return new Map(entries);
};

// Reads exercises for a specific weekday from localStorage
const readLocalStorageForWeekday = (weekday: Weekday): ExerciseObject[] => {
  const serializedMap = localStorage.getItem("exercises");
  if (serializedMap) {
    const exercisesMap = deserializeWeekdayExerciseMap(serializedMap);
    return exercisesMap.get(weekday) || [];
  }
  return [];
};

// Writes exercises for a specific weekday to localStorage
const writeLocalStorageForWeekday = (
  weekday: Weekday,
  exercises: ExerciseObject[]
) => {
  const serializedMap = localStorage.getItem("exercises");
  const exercisesMap = serializedMap
    ? deserializeWeekdayExerciseMap(serializedMap)
    : new Map();
  exercisesMap.set(weekday, exercises);
  localStorage.setItem("exercises", serializeWeekdayExerciseMap(exercisesMap));
};

const App: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    units: "kilograms",
    trainingGoal: "powerlifting",
  });
  const [selectedWeekday, setSelectedWeekday] = useState<Weekday>("Monday");
  const [exercises, setExercises] = useState<ExerciseObject[]>([]);

  useEffect(() => {
    const storedExercises = readLocalStorageForWeekday(selectedWeekday);
    setExercises(storedExercises);
  }, [selectedWeekday]);

  const handleExerciseUpdate = (updatedExercise: ExerciseObject) => {
    const updatedExercises = exercises.map((exercise) =>
      exercise.name === updatedExercise.name
        ? { ...exercise, ...updatedExercise }
        : exercise
    );
    setExercises(updatedExercises);
    writeLocalStorageForWeekday(selectedWeekday, updatedExercises);
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
