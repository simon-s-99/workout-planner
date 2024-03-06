import React, { useState, useEffect } from "react";
import type {
  ExerciseObject,
  Weekday,
  WeekdayExerciseMap,
  WorkingSet,
} from "../types";
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

    // Use splice to remove the selected set
    selectedExercise.sets.splice(setIndex, 1);

    // Replace the old exercise with the updated one
    exercisesCopy.splice(exerciseIndex, 1, selectedExercise);

    setExercises(exercisesCopy);
    // Here, you should also update local storage to reflect the changes
    // This can be done by calling your useLocalStorageWrite hook or similar functionality
  };

  // Function to toggle a set as completed
  const toggleSetCompleted = (exerciseIndex: number, setIndex: number) => {
    setExercises((exercises) =>
      exercises.map((exercise, eIndex) => {
        if (eIndex === exerciseIndex) {
          return {
            ...exercise,
            sets: exercise.sets.map((set, sIndex) => {
              if (sIndex === setIndex) {
                return { ...set, completed: !set.completed };
              }
              return set;
            }),
          };
        }
        return exercise;
      })
    );
  };

  // Function to toggle all sets as completed for an exercise
  const toggleAllSetsCompleted = (exerciseIndex: number) => {
    setExercises((exercises) =>
      exercises.map((exercise, eIndex) => {
        if (eIndex === exerciseIndex) {
          const areAllCompleted = exercise.sets.every((set) => set.completed);
          return {
            ...exercise,
            sets: exercise.sets.map((set) => ({
              ...set,
              completed: !areAllCompleted,
            })),
          };
        }
        return exercise;
      })
    );
  };

  // Function to toggle an exercise as completed (assuming you have a completed flag in ExerciseObject)
  const toggleExerciseCompleted = (exerciseIndex: number) => {
    setExercises((exercises) =>
      exercises.map((exercise, eIndex) => {
        if (eIndex === exerciseIndex) {
          const isCompleted = !exercise.completed;
          return {
            ...exercise,
            completed: isCompleted,
            sets: exercise.sets.map((set) => ({
              ...set,
              completed: isCompleted,
            })),
          };
        }
        return exercise;
      })
    );
  };

  return (
    <div className="Exercise">
      {exercises.map((exercise, exerciseIndex) => (
        <div
          key={exerciseIndex}
          className="exercise-container"
          style={styles.exerciseBlock}
        >
          <div style={styles.flexContainer}>
            <p style={exercise.completed ? styles.h3Hover : styles.h3}>
              {exercise.name}
            </p>
            <button
              onClick={() => toggleExerciseCompleted(exerciseIndex)}
              style={styles.exerciseCompletedButton}
            >
              Exercise Completed
            </button>
            <label style={styles.flexLabel}>
              <input
                type="checkbox"
                checked={exercise.sets.every((set) => set.completed)}
                onChange={() => toggleAllSetsCompleted(exerciseIndex)}
                style={styles.marginRight5}
              />
              Toggle All Sets
            </label>
          </div>
          {exercise.sets.map((set, index) => (
            <div key={index} style={styles.inputAndButtonContainer}>
              <label>
                <input
                  type="checkbox"
                  checked={set.completed}
                  onChange={() => toggleSetCompleted(exerciseIndex, index)}
                />
              </label>
              <p>
                Set {index + 1}: Reps: {set.repetitions} Weight: {set.weight}
              </p>
              <button onClick={() => removeSet(exerciseIndex, index)}>
                ❌
              </button>
            </div>
          ))}
          <button
            onClick={() => addSet(exerciseIndex, weekday)}
            style={styles.addButton}
          >
            Add Set
          </button>
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
  // removeButton: {
  //   background: "#f44336",
  //   color: "white",
  //   border: "none",
  //   borderRadius: "4px",
  //   padding: "5px 10px",
  //   cursor: "pointer",
  //   margin: "0 10px",
  // },
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
