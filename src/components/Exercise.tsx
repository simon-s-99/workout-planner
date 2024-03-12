import React, { useState, useEffect } from "react";
import type { ExerciseObject, Unit, Weekday, WorkingSet } from "../types";
import { useLocalStorageRead } from "../hooks/useLocalStorageRead";
import { useLocalStorageOverwrite } from "../hooks/useLocalStorageOverwrite";

// add function to click on exercise in order to show, and hide sets
// Exercise completed should close the exercise when checked.
//if already checked and unchecking it (while having the exercise + setmenu open) should not close it

// Restructure positions of buttons, text etc
//implement weekday logic

//details + summary to show and hide

interface ExerciseProps {
  weightUnit: Unit;
  weekday: Weekday;
  exerciseData: ExerciseObject[];
  getExerciseData: () => void;
}

const Exercise: React.FC<ExerciseProps> = ({
  weekday,
  exerciseData: weekExerciseListLength,
  getExerciseData,
}) => {
  // Fetch all exercises for the given weekday from local storage
  let weekdayExercises: ExerciseObject[] = [];

  //form, when submitted send to localstorage. Give write an exercisemap,
  // pair weekdayexercies with the weekday and send to localstorageWrite

  const [exercises, setExercises] = useState<ExerciseObject[]>([]);
  // const [exercises, setExercises] = useState(weekdayExercises);

  useEffect(() => {
    weekdayExercises = useLocalStorageRead(weekday);
    setExercises(weekdayExercises);
  }, [weekday, weekExerciseListLength]); // Dependency array includes 'weekday' to re-run the effect when it changes

  // save new sets to localstorage
  // when adding a new set, make the update show directly.
  // currently only updates the page if switching day and then returning.

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
    useLocalStorageOverwrite(
      new Map<Weekday, ExerciseObject[]>([[weekday, exercises]])
    );
    getExerciseData();
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

    // clears localStorage of selected day and writes new exercises to it
    // runs getExerciseData to make sure every other component based on data in localStorage re-renders
    useLocalStorageOverwrite(
      new Map<Weekday, ExerciseObject[]>([[weekday, exercises]])
    );
    getExerciseData();
  };

  // Function to toggle a set as completed
  const toggleSetCompleted = (exerciseIndex: number, setIndex: number) => {
    const exercisesCopy = [...exercises];
    const selectedExercise = exercisesCopy[exerciseIndex];
    const selectedSet = selectedExercise.sets[setIndex];

    selectedSet.completed = !selectedSet.completed;

    exercisesCopy[exerciseIndex].sets.splice(setIndex, 1, selectedSet);
    setExercises(exercisesCopy);

    // clears localStorage of selected day and writes new exercises to it
    // runs getExerciseData to make sure every other component based on data in localStorage re-renders
    useLocalStorageOverwrite(
      new Map<Weekday, ExerciseObject[]>([[weekday, exercises]])
    );
    getExerciseData();
  };

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
    useLocalStorageOverwrite(
      new Map<Weekday, ExerciseObject[]>([[weekday, exercises]])
    );
    getExerciseData();
  };

  const [hiddenExercises, setHiddenExercises] = useState(new Set<number>());
  //toggles whether the sets of an exercise are hidden.
  //It works with a Set that keeps track of the indexes of exercises whose details are currently hidden.
  const toggleExerciseVisibility = (exerciseIndex: number) => {
    setHiddenExercises((prevHiddenExercises) => {
      const newHiddenExercises = new Set(prevHiddenExercises);
      if (newHiddenExercises.has(exerciseIndex)) {
        newHiddenExercises.delete(exerciseIndex);
      } else {
        newHiddenExercises.add(exerciseIndex);
      }
      return newHiddenExercises;
    });
  };

  const updateSetDetails = (
    exerciseIndex: number,
    setIndex: number,
    field: keyof WorkingSet, // Use keyof to ensure field is a valid key
    value: string
  ) => {
    setExercises((currentExercises) => {
      const updatedExercises = [...currentExercises];
      const exerciseToUpdate = { ...updatedExercises[exerciseIndex] };

      // Since field is now guaranteed to be a key of WorkingSet, TypeScript knows this indexing is safe
      const setToUpdate: WorkingSet = { ...exerciseToUpdate.sets[setIndex] };

      // Make sure to handle conversion safely. Since "completed" is a boolean, it shouldn't be converted to number
      if (field === "repetitions" || field === "weight") {
        setToUpdate[field] = Number(value);
      } else if (field === "completed") {
        setToUpdate[field] = value === "true";
      }

      exerciseToUpdate.sets[setIndex] = setToUpdate;
      updatedExercises[exerciseIndex] = exerciseToUpdate;

      // clears localStorage of selected day and writes new exercises to it
      // runs getExerciseData to make sure every other component based on data in localStorage re-renders
      useLocalStorageOverwrite(
        new Map<Weekday, ExerciseObject[]>([[weekday, exercises]])
      );
      getExerciseData();

      return updatedExercises;
    });
  };

  // removes the selected exercise from current weekday
  function removeExercise(exerciseIndex: number): void {
    const updatedExercises = [...exercises];

    // Use splice to remove the selected exercise
    updatedExercises.splice(exerciseIndex, 1);

    // Update local storage with the new set of exercises
    useLocalStorageOverwrite(
      new Map<Weekday, ExerciseObject[]>([[weekday, updatedExercises]])
    );
    getExerciseData();
  }

  return (
    <div className="Exercise">
      {exercises.map((exercise, exerciseIndex) => (
        <div key={exerciseIndex} style={styles.exerciseContainer}>
          <div style={styles.exerciseHeader}>
            <h3 style={styles.h3}>{exercise.name}</h3>
            <strong>Total Sets: {exercise.sets.length}</strong>
            <button onClick={() => toggleExerciseVisibility(exerciseIndex)}>
              <img
                src="/src/assets/expandArrow.png"
                style={styles.visibilityButtonImg}
                alt="Toggle visibilityButton"
              />
            </button>
            <label style={styles.flexLabel}>
              Toggle sets
              <input
                type="checkbox"
                checked={exercise.sets.every((set) => set.completed)}
                onChange={() => toggleAllSetsCompleted(exerciseIndex)}
              />
            </label>
            <label>
              <input
                type="button"
                value="del"
                onClick={() => removeExercise(exerciseIndex)}
              ></input>
            </label>
          </div>
          {!hiddenExercises.has(exerciseIndex) && (
            <div>
              {exercise.sets.map((set, setIndex) => (
                <div key={setIndex} style={styles.inputAndButtonContainer}>
                  <button onClick={() => removeSet(exerciseIndex, setIndex)}>
                    ❌
                  </button>
                  <span style={styles.labelSpan}>Set {setIndex + 1}:</span>
                  Reps
                  <input
                    type="number"
                    style={styles.setInput}
                    value={set.repetitions}
                    onChange={(e) =>
                      updateSetDetails(
                        exerciseIndex,
                        setIndex,
                        "repetitions",
                        e.target.value
                      )
                    }
                  />{" "}
                  Weight
                  <input
                    type="number"
                    style={styles.setInput}
                    value={set.weight}
                    onChange={(e) =>
                      updateSetDetails(
                        exerciseIndex,
                        setIndex,
                        "weight",
                        e.target.value
                      )
                    }
                  />{" "}
                  <label>
                    <input
                      type="checkbox"
                      checked={set.completed}
                      onChange={() => {
                        toggleSetCompleted(exerciseIndex, setIndex);
                      }}
                    />
                  </label>
                  {/* Completed */}
                </div>
              ))}
              <button
                onClick={() => addSet(exerciseIndex, weekday)}
                style={styles.addButton}
              >
                Add Set
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const styles = {
  exerciseContainer: {
    backgroundColor: "#f9f9f9",
    border: "1px solid #e1e1e1",
    borderRadius: "11px",
    padding: "19px",
    marginBottom: "20px",
  },
  flexLabel: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    marginLeft: "10px",
  },
  exerciseHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  setContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "50px",
  },
  setInput: {
    margin: " 18px",
    padding: "11px",
    width: "60px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },

  inputAndButtonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "11px",
    // flex: 1,
  },

  inputStyle: {
    margin: "0 10px",
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },

  visibilityButtonImg: {
    width: "20px",
    height: "20px",
  },

  addButton: {
    display: "inline-block",
    backgroundColor: "#4CAF50",
    // border: "none",
    color: "white",
    padding: "10px 15px",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },

  totalSetsInfo: {
    fontWeight: "bold",
    marginLeft: "50px",
  },
  h3: {
    cursor: "pointer",
    margin: "0",
    fontSize: "20px",
  },
  h3Hover: {
    backgroundColor: "#f2f2f2",
    color: "#007bff",
    textDecoration: "underline",
  },

  labelSpan: {
    marginRight: "20px",
  },
};

export default Exercise;
