import React, { useState, useEffect } from "react";
import type { ExerciseObject, Weekday, WeekdayExerciseMap, WorkingSet } from "../types";
import { useLocalStorageRead } from "../hooks/useLocalStorageRead";
import { useLocalStorageWrite } from "../hooks/useLocalStorageWrite";

type ExerciseProps = {
  // exercise: ExerciseObject;
  weekday: Weekday;
  // updateExercise: (updatedExercise: ExerciseObject) => void;
};

const Exercise: React.FC<ExerciseProps> = ({ weekday }) => {
  // Fetch all exercises for the given weekday from local storage
  const weekdayExercises: ExerciseObject[] = useLocalStorageRead(weekday);

  //form, when submitted send to localstorage. Give write an exercisemap,
  // pair weekdayexercies with the weekday and send to localstorageWrite

  const [exercises, setExercises] = useState(weekdayExercises);

  // Function to add a set to an exercise
  // CHANGE: Adds new set to selected exercise, and updates the state variable with the updated array
  const addSet = (exerciseIndex: number, weekday: Weekday): void => {
    const exercisesCopy = [...exercises];
    const selectedExercise = exercisesCopy[exerciseIndex];
    const newSet = { repetitions: 0, weight: 0, completed: false };
    selectedExercise.sets.push(newSet);

    // Replace the old exercise with updated
    exercisesCopy.splice(exerciseIndex, 1, selectedExercise);
    setExercises(exercisesCopy);

    // Construct a new WeekdayExerciseMap
    /*const weekdayExerciseMap: WeekdayExerciseMap = new Map();
    weekdayExerciseMap.set(weekday, se);

    // Using the useLocalStorageWrite function with the newly constructed Map
    useLocalStorageWrite(weekdayExerciseMap);*/
  };

  // Function to remove a set from an exercise
  // CHANGE: Removes set from selected exercise, and updates the state variable with the new amount of sets
  const removeSet = (exerciseIndex: number, setIndex: number): void => {
    const exercisesCopy = [...exercises];
    const selectedExercise = exercisesCopy[exerciseIndex];

    // Remove selected set
    selectedExercise.sets.slice(setIndex, 1);

    // Add replace old exercise with updated one
    exercisesCopy.splice(exerciseIndex, 1, selectedExercise)

    setExercises(exercisesCopy);
    // Update local storage accordingly
  };

  // Function to toggle a set as completed
  const toggleSetCompleted = (exerciseIndex: number, setIndex: number): void => {
    const newExercises = [...exercises];
    const set = newExercises[exerciseIndex].sets[setIndex];
    set.completed = !set.completed;
    setExercises(newExercises);
    // Update local storage accordingly
  };

  // Function to toggle all sets as completed for an exercise
  const toggleAllSetsCompleted = (exerciseIndex: number): void => {
    const newExercises = [...exercises];
    const sets = newExercises[exerciseIndex].sets;
    const areAllCompleted = sets.every((set) => set.completed);
    newExercises[exerciseIndex].sets = sets.map((set) => ({
      ...set,
      completed: !areAllCompleted,
    }));
    setExercises(newExercises);
    // Update local storage accordingly
  };

  // Function to toggle an exercise as completed (assuming you have a completed flag in ExerciseObject)
  const toggleExerciseCompleted = (exerciseIndex: number): void => {
    const newExercises = [...exercises];
    newExercises[exerciseIndex].completed = !newExercises[exerciseIndex].completed;
    setExercises(newExercises);
    // Update local storage accordingly
  };

  return (
    <div className="Exercise">
      {exercises.map((exercise, exerciseIndex) => (
        <div key={exerciseIndex} className="exercise-container">
          <p>{exercise.name}</p>
          {exercise.sets.map((set, index) => (
            <div key={index}>
              <p className="set-details">
                Set {index + 1}: Reps: {set.repetitions} Weight: {set.weight}
              </p>
              <button onClick={() => removeSet(exerciseIndex, index)}>❌</button>
            </div>
          ))}
          {/* Add Set button for each exercise */}
          <button onClick={() => addSet(exerciseIndex, weekday)}>Add Set</button>
        </div>
      ))}
    </div>
  );
};

const styles = {
  flexContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
  },
  flexLabel: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    marginLeft: "10px",
  },

  marginRight5: {
    marginRight: "5px",
  },
  exerciseBlockBackground: {
    background: "#ECEAEA",
  },
  exerciseBlock: {
    background: "#f0f0f0",
    padding: "10px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    cursor: "pointer",
  },
  inputAndButtonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  inputStyle: {
    margin: "0 10px",
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  exerciseCompletedButton: {
    background: "#008CBA",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
    margin: "0 10px",
    marginRight: "30px",
  },
  addButton: {
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
    margin: "0 10px",
  },
  removeButton: {
    background: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
    margin: "0 10px",
  },
  totalSetsInfo: {
    fontWeight: "bold",
    marginLeft: "50px",
  },
  h3: {
    cursor: "pointer",
  },
  h3Hover: {
    backgroundColor: "#f2f2f2",
    color: "#007bff",
    textDecoration: "underline",
  },
};

export default Exercise;
