import React from "react";
import { useLocalStorageOverwrite } from "../hooks/useLocalStorageOverwrite";
import { ExerciseObject, Weekday } from "../types";

interface RemoveExerciseButtonProps {
  exerciseIndex: number;
  weekday: Weekday;
  exercises: ExerciseObject[];
  getExerciseData: () => void;
}

const RemoveExerciseButton: React.FC<RemoveExerciseButtonProps> = (
  { exerciseIndex, exercises, getExerciseData, weekday }) => {

  // removes the selected exercise from current weekday
  function removeExercise(exerciseIndex: number): void {
    const updatedExercises = [...exercises];

    // Use splice to remove the selected exercise
    updatedExercises.splice(exerciseIndex, 1);

    // Update local storage with the new set of exercises
    useLocalStorageOverwrite(new Map<Weekday, ExerciseObject[]>([[weekday, updatedExercises]]));
    getExerciseData();
  }

  return (
    <label>
      <input type="button" value="❌" alt="RemoveExercise" onClick={() => removeExercise(exerciseIndex)}></input>
    </label>
  );
};

export default RemoveExerciseButton;
