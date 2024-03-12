import React from "react";
import { useLocalStorageRead } from "../hooks/useLocalStorageRead";
import { useLocalStorageOverwrite } from "../hooks/useLocalStorageOverwrite";
import type { ExerciseObject, Weekday, WeekdayExerciseMap } from "../types";

interface ResetProgressProps {
  getExerciseData: () => void;
}

const allWeekdays: Weekday[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const ResetProgress: React.FC<ResetProgressProps> = ({ getExerciseData }) => {
  const handleReset = () => {
    const updatedWeek: WeekdayExerciseMap = new Map();

    allWeekdays.forEach((weekday) => {
      // Read the exercises for the current weekday from local storage
      let exercises: ExerciseObject[] = useLocalStorageRead(weekday);

      // Iterate through all exercises and sets, untoggling completed sets
      const updatedExercises = exercises.map((exercise) => ({
        ...exercise,
        sets: exercise.sets.map((set) => ({ ...set, completed: false })),
      }));

      // Update the week map with the reset exercises
      updatedWeek.set(weekday, updatedExercises);
    });

    // Overwrite the local storage with the updated map for the entire week
    useLocalStorageOverwrite(updatedWeek);

    // Call getExerciseData to trigger any necessary updates or refreshes
    getExerciseData();
  };

  return (
    <button style={resetWeek} onClick={handleReset}>
      Reset week ♻
    </button>
  );
};

export default ResetProgress;

const resetWeek = {
  justifyContent: "space-around",
  width: "122px",
  height: "60px",
  borderRadius: "5px",
  cursor: "pointer",
};
