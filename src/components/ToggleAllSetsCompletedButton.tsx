import React from "react";
import { useLocalStorageOverwrite } from "../hooks/useLocalStorageOverwrite";
import { ExerciseObject, Weekday } from "../types";

/*
  This component is a checkbox that toggles all sets of one exercise as completed or not completed
*/

interface ToggleAllSetsCompletedButtonProps {
  exerciseIndex: number;
  weekday: Weekday;
  exercises: ExerciseObject[];
  getExerciseData: () => void;
  setExercises: React.Dispatch<React.SetStateAction<ExerciseObject[]>>;
  exercise: ExerciseObject;
}

const ToggleAllSetsCompletedButton: React.FC<ToggleAllSetsCompletedButtonProps> = ({ exerciseIndex, exercises, getExerciseData, weekday, setExercises, exercise }) => {
  // Function to toggle all sets as completed for an exercise
  const toggleAllSetsCompleted = (exerciseIndex: number) => {
    const exercisesCopy: ExerciseObject[] = [...exercises];

    const completed: boolean[] = [];

    // Mark every set in every exercise as completed
    exercisesCopy[exerciseIndex].sets.forEach((set) => {
      if (set.completed) {
        completed.push(true);
      }
    });

    // this logic ensures that all sets are marked as complete if one or more sets are marked as complete
    // if all sets are marked as complete they are marked as incomplete by this toggle
    if (completed.length === exercisesCopy[exerciseIndex].sets.length) {
      for (const set of exercisesCopy[exerciseIndex].sets) {
        set.completed = false;
      }
    } else {
      for (const set of exercisesCopy[exerciseIndex].sets) {
        set.completed = true;
      }
    }

    setExercises(exercisesCopy);

    // clears localStorage of selected day and writes new exercises to it
    // runs getExerciseData to make sure every other component based on data in localStorage re-renders
    useLocalStorageOverwrite(new Map<Weekday, ExerciseObject[]>([[weekday, exercises]]));
    getExerciseData();
  };

  return (
    <label className="ToggleAllSetsCheckbox">
      Toggle sets
      {/* Is checked if every set is marked as completed and vice versa */}
      <input
        type="checkbox"
        checked={exercise.sets.every((set) => set.completed)}
        onChange={() => toggleAllSetsCompleted(exerciseIndex)}
      />
    </label>
  );
};

export default ToggleAllSetsCompletedButton;
