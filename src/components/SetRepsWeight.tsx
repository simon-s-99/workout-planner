import React, { useState, useEffect } from "react";
import type {
  ExerciseObject,
  Weekday,
  WeekdayExerciseMap,
  WorkingSet,
} from "../types";
import { useLocalStorageRead } from "../hooks/useLocalStorageRead";
import { useLocalStorageWrite } from "../hooks/useLocalStorageWrite";

type SetRepsWeightProps = {
  // exercise: ExerciseObject;
  weekday: Weekday;
  // updateExercise: (updatedExercise: ExerciseObject) => void;
};

const SetRepsWeight: React.FC<SetRepsWeightProps> = ({ weekday }) => {
  // Fetch all exercises for the given weekday from local storage
  const weekdayExercises: ExerciseObject[] = useLocalStorageRead(weekday);

  //form, when submitted send to localstorage. Give write an exercisemap,
  // pair weekdayexercies with the weekday and send to localstorageWrite

  const [exercises, setExercises] = useState(weekdayExercises);

  // Function to add a set to an exercise
  const addSet = (
    exerciseIndex: number,
    weekday: Weekday,
    exercises: ExerciseObject[]
  ): void => {
    const newExercises = [...exercises];
    const newSet = { repetitions: 0, weight: 0, completed: false };
    newExercises[exerciseIndex].sets.push(newSet);

    // Use React's useState hook or a similar state management solution to update exercises
    // setExercises(newExercises);

    // Construct a new WeekdayExerciseMap
    const weekdayExerciseMap: WeekdayExerciseMap = new Map();
    weekdayExerciseMap.set(weekday, newExercises);

    // Using the useLocalStorageWrite function with the newly constructed Map
    useLocalStorageWrite(weekdayExerciseMap);
  };

  // Function to remove a set from an exercise
  const removeSet = (exerciseIndex: number, setIndex: number): void => {
    const newExercises = [...exercises];
    newExercises[exerciseIndex].sets.splice(setIndex, 1);
    setExercises(newExercises);
    // Update local storage accordingly
  };

  // Function to toggle a set as completed
  const toggleSetCompleted = (
    exerciseIndex: number,
    setIndex: number
  ): void => {
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
    newExercises[exerciseIndex].completed =
      !newExercises[exerciseIndex].completed;
    setExercises(newExercises);
    // Update local storage accordingly
  };

  return (
    <ol>
      {weekdayExercises.map((exerciseObject, index) => (
        <li key={index} className="exercise-container">
          <p>{exerciseObject.name}</p>
          <ol>
            {exerciseObject.sets.map((set, setIndex) => (
              <li key={setIndex} className="set-details">
                <p>
                  Set {setIndex + 1}: Reps: {set.repetitions} Weight:{" "}
                  {set.weight}
                </p>
              </li>
            ))}
            {/* Add Set button for each exercise */}
            <li>
              <button onClick={() => addSet(index, weekday, weekdayExercises)}>
                Add Set
              </button>
            </li>
            <li>
              <button onClick={() => removeSet(exerciseIndex, setIndex)}>
                ❌
              </button>
            </li>
          </ol>
        </li>
      ))}
    </ol>
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

export default SetRepsWeight;
