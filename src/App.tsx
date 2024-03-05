import React, { useState, useEffect } from "react";
import "./App.css";
import SetRepsWeight from "./components/SetRepsWeight";
import type { Settings, Weekday, ExerciseObject } from "./types";
import MuscleCategoryList from "./components/MuscleCategoryList";
import WeekdayPicker from "./components/WeekdayPicker";
import UnitsPicker from "./components/UnitsPicker";
import { useLocalStorageRead } from "./hooks/useLocalStorageRead";
// import { useExerciseStorage } from "./hooks/useExerciseStorage";

const App: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    units: "kilograms",
    trainingGoal: "powerlifting",
  });

  const [selectedWeekday, setSelectedWeekday] = useState<Weekday>("Monday");
  const [exercises, setExercises] = useState<ExerciseObject[]>([]);

  const weekdayExercises: ExerciseObject[] = useLocalStorageRead(selectedWeekday); 

 // loop som går in på exercise sen en loops som går in en loop med set (nestad loop)


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
