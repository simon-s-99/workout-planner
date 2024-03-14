import React from "react";
import { useLocalStorageOverwrite } from "../hooks/useLocalStorageOverwrite";
import { ExerciseObject, Weekday } from "../types";

interface AddSetButtonProps {
  exerciseIndex: number;
  weekday: Weekday;
  exercises: ExerciseObject[];
  getExerciseData: () => void;
}

const AddSetButton: React.FC<AddSetButtonProps> = ({ exerciseIndex, exercises, getExerciseData, weekday }) => {
  // CHANGE: Adds new set to selected exercise, and updates the state variable with the updated array
  const addSet = (exerciseIndex: number, weekday: Weekday): void => {
    const exercisesCopy = [...exercises];
    const selectedExercise = exercisesCopy[exerciseIndex];
    const newSet = { repetitions: 0, weight: 0, completed: false };
    selectedExercise.sets.push(newSet);

    // Replace the old exercise with updated
    exercisesCopy.splice(exerciseIndex, 1, selectedExercise);
    setExercises(exercisesCopy);

    // clears localStorage of selected day and writes new exercises to it
    // runs getExerciseData to make sure every other component based on data in localStorage re-renders
    useLocalStorageOverwrite(new Map<Weekday, ExerciseObject[]>([[weekday, exercises]]));
    getExerciseData();
  };

  return (
    <label>
      <input type="button" value="del" onClick={() => removeExercise(exerciseIndex)}></input>
    </label>
  );
};

export default AddSetButton;
