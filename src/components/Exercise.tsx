import React, { useState, useEffect } from "react";
import type { ExerciseObject, Unit, Weekday } from "../types";
import { useLocalStorageRead } from "../hooks/useLocalStorageRead";
import { useLocalStorageOverwrite } from "../hooks/useLocalStorageOverwrite";
import "../stylesheets/Exercise.css";
import WorkingSet from "./WorkingSet";
import TogglePageVisibilityButton from "./ToggleExerciseVisibilityButton";
import RemoveExerciseButton from "./RemoveExerciseButton";
import AddSetButton from "./AddSetButton";

interface ExerciseProps {
  weightUnit: Unit;
  weekday: Weekday;
  exerciseData: ExerciseObject[];
  getExerciseData: () => void;
}

const Exercise: React.FC<ExerciseProps> = ({ weekday, exerciseData: weekExerciseListLength, getExerciseData }) => {
  // Fetch all exercises for the given weekday from local storage
  let weekdayExercises: ExerciseObject[] = [];

  const [exercises, setExercises] = useState<ExerciseObject[]>([]);

  useEffect(() => {
    weekdayExercises = useLocalStorageRead(weekday);
    setExercises(weekdayExercises);
  }, [weekday, weekExerciseListLength]); // Dependency array includes 'weekday' to re-run the effect when it changes

  // v application remembers which exercises have had their dropdown minimized 
  const [hiddenExercises, setHiddenExercises] = useState<Set<number>>(new Set<number>());

  // Function to toggle all sets as completed for an exercise
  const toggleAllSetsCompleted = (exerciseIndex: number) => {
    const exercisesCopy: ExerciseObject[] = [...exercises];

    const completed: boolean[] = [];

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

  // set component
  // buttons to components?
  return (
    <div className="Exercise">
      {exercises.map((exercise, exerciseIndex) => (
        <div key={exerciseIndex} className="exerciseContainer">
          <TogglePageVisibilityButton exerciseIndex={exerciseIndex} setHiddenExercises={setHiddenExercises}/>
          <div className="exerciseHeader">
            <h3>{exercise.name}</h3>
            <strong>Total Sets: {exercise.sets.length}</strong>

            <label className="flexLabel">
              Toggle sets
              <input
                type="checkbox"
                checked={exercise.sets.every((set) => set.completed)}
                onChange={() => toggleAllSetsCompleted(exerciseIndex)}
              />
            </label>
            <RemoveExerciseButton exerciseIndex={exerciseIndex} weekday={weekday} exercises={exercises} getExerciseData={getExerciseData}/>
          </div>
          {!hiddenExercises.has(exerciseIndex) && (
            <>
              <WorkingSet
                weekday={weekday}
                exercise={exercise}
                exerciseIndex={exerciseIndex}
                setExercises={setExercises}
                getExerciseData={getExerciseData}
                exercises={exercises}
              />
              <AddSetButton />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Exercise;
