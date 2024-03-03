// src/components/SetRepsWeight.tsx
import React, { useState, useEffect } from "react";
import ExerciseDetail from "./ExerciseDetail";
import { useLocalStorageRead } from "../hooks/useLocalStorageRead";
import { useLocalStorageWrite } from "../hooks/useLocalStorageWrite";
import {
  ExerciseObject,
  Weekday,
  WeekdayExerciseMap,
  WorkingSet,
} from "../types";

const SetRepsWeight: React.FC = () => {
  const currentWeekday = "Monday";
  const initialExercises = useLocalStorageRead(currentWeekday);
  const [exercises, setExercises] =
    useState<ExerciseObject[]>(initialExercises);
  const [setIdCounter, setSetIdCounter] = useState(0); // New state to keep track of the setIdCounter

  useEffect(() => {
    // Find the highest set number across all exercises to ensure unique IDs for newly added sets
    const highestSetId = exercises.reduce((acc, curr) => {
      const maxSetId = curr.sets.reduce(
        (setAcc, setCurr) => Math.max(setAcc, parseInt(setCurr.id, 10) || 0),
        0
      );
      return Math.max(acc, maxSetId);
    }, 0);
    setSetIdCounter(highestSetId + 1);
  }, [exercises]);

  const generateId = () => {
    const newId = setIdCounter;
    setSetIdCounter((prevId) => prevId + 1);
    return newId.toString();
  };

  const addSet = (exerciseName: string) => {
    setExercises((currentExercises) =>
      currentExercises.map((exercise) => {
        if (exercise.name === exerciseName) {
          const newSet: WorkingSet = {
            id: generateId(),
            setNumber: exercise.sets.length + 1,
            repetitions: 10, // default value
            weight: 20, // default value
            completed: false,
          };
          return { ...exercise, sets: [...exercise.sets, newSet] };
        }
        return exercise;
      })
    );
  };

  const removeSet = (exerciseName: string, setId: string) => {
    setExercises((currentExercises) =>
      currentExercises.map((exercise) => {
        if (exercise.name === exerciseName) {
          return {
            ...exercise,
            sets: exercise.sets.filter((set) => set.id !== setId),
          };
        }
        return exercise;
      })
    );
  };

  const updateSet = (
    exerciseName: string,
    setId: string,
    reps: number,
    weight: number
  ) => {
    setExercises((currentExercises) =>
      currentExercises.map((exercise) => {
        if (exercise.name === exerciseName) {
          return {
            ...exercise,
            sets: exercise.sets.map((set) =>
              set.id === setId ? { ...set, reps, weight } : set
            ),
          };
        }
        return exercise;
      })
    );
  };

  const toggleSetCompleted = (exerciseName: string, setId: string) => {
    setExercises((currentExercises) =>
      currentExercises.map((exercise) => {
        if (exercise.name === exerciseName) {
          return {
            ...exercise,
            sets: exercise.sets.map((set) =>
              set.id === setId ? { ...set, completed: !set.completed } : set
            ),
          };
        }
        return exercise;
      })
    );
  };

  const toggleAllSetsCompleted = (exerciseName: string) => {
    setExercises((currentExercises) =>
      currentExercises.map((exercise) => {
        if (exercise.name === exerciseName) {
          // Determine if all sets are already completed to toggle them all
          const areAllCompleted = exercise.sets.every((set) => set.completed);
          const toggledSets = exercise.sets.map((set) => ({
            ...set,
            completed: !areAllCompleted,
          }));
          return {
            ...exercise,
            sets: toggledSets,
            completed: !areAllCompleted,
          };
        }
        return exercise;
      })
    );
  };

  useEffect(() => {
    const weekdayExercisesMap = new Map<Weekday, ExerciseObject[]>();
    weekdayExercisesMap.set(currentWeekday, exercises);

    useLocalStorageWrite(weekdayExercisesMap);
  }, [exercises, currentWeekday]);

  return (
    <div className="exercises-container">
      {exercises.map((exercise, index) => (
        <ExerciseDetail
          key={index}
          exercise={exercise}
          onRemoveSet={removeSet}
          onUpdateSet={updateSet}
          toggleSetCompleted={toggleSetCompleted}
          toggleAllSetsCompleted={toggleAllSetsCompleted}
        />
      ))}

      <button onClick={() => addSet(exercises[0].name)}>Add Set</button>
    </div>
  );

  //Mark an exercise as completed //currently redundant
  const toggleExerciseCompleted = (exerciseName: string) => {
    setExercises((currentExercises) =>
      currentExercises.map((exercise) => {
        if (exercise.name === exerciseName) {
          const newCompletedStatus = !exercise.completed;

          return {
            ...exercise,

            sets: exercise.sets.map((set) => ({
              ...set,

              completed: newCompletedStatus,
            })),

            completed: newCompletedStatus,
          };
        }

        return exercise;
      })
    );
  };
};

export default SetRepsWeight;
