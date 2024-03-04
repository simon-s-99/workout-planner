import React, { useState, useEffect } from "react";
import "./App.css";
import SetRepsWeight from "./components/SetRepsWeight";
import type { Settings, Weekday, ExerciseObject } from "./types";
import MuscleCategoryList from "./components/MuscleCategoryList";
import WeekdayPicker from "./components/WeekdayPicker";
import UnitsPicker from "./components/UnitsPicker";
import { useExerciseStorage } from "./hooks/useExerciseStorage";

const App: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    units: "kilograms",
    trainingGoal: "powerlifting",
  });
  const [selectedWeekday, setSelectedWeekday] = useState<Weekday>("Monday");
  const [exercises, setExercises] = useState<ExerciseObject[]>([]);
  const { read, write } = useExerciseStorage();

  // This useEffect hook is used to fetch and set the exercises for the selected weekday
  // whenever the selectedWeekday changes. It leverages the `read` function from the
  // useExerciseStorage hook to fetch the exercises from localStorage.
  useEffect(() => {
    setExercises(read(selectedWeekday));
  }, [selectedWeekday, read]);

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
    write(selectedWeekday, updatedExercises);
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
