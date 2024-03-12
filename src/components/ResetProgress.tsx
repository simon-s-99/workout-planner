import React from "react";
import { useLocalStorageRead } from "../hooks/useLocalStorageRead";
import { useLocalStorageOverwrite } from "../hooks/useLocalStorageOverwrite";
import type { ExerciseObject, Weekday } from "../types";

interface ResetProgressProps {
  selectedWeekday: Weekday;
  onResetComplete: () => void;
  getExerciseData: () => void;
}

const ResetProgress: React.FC<ResetProgressProps> = ({
  selectedWeekday,
  onResetComplete,
}) => {
  const handleReset = () => {
    // Read the exercises from local storage for the selected weekday
    let exercises: ExerciseObject[] = useLocalStorageRead(selectedWeekday);

    // Iterate through all exercises and sets, untoggling completed sets
    const updatedExercises = exercises.map((exercise) => ({
      ...exercise,
      sets: exercise.sets.map((set) => ({ ...set, completed: false })),
    }));

    //Overwrite the local storage with the updated list of exercises
    useLocalStorageOverwrite(
      new Map<Weekday, ExerciseObject[]>([[selectedWeekday, updatedExercises]])
    );

    //Call the onResetComplete callback to trigger any necessary updates or refreshes
    onResetComplete();
  };

  return <button onClick={handleReset}>Reset Week</button>;
};

export default ResetProgress;
