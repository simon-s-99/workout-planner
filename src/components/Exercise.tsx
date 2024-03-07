import React, { useState, useEffect } from "react";
import type {
  ExerciseObject,
  Weekday,
  WeekdayExerciseMap,
  WorkingSet,
} from "../types";
import { useLocalStorageRead } from "../hooks/useLocalStorageRead";
import { useLocalStorageWrite } from "../hooks/useLocalStorageWrite";

// add function to click on exercise in order to show, and hide sets
// Exercise completed should close the exercise when checked.
//if already checked and unchecking it (while having the exercise + setmenu open) should not close it

// Restructure positions of buttons, text etc
//implement weekday logic

//details + summary to show and hide

interface ExerciseProps {
  weekday: Weekday;
};

const Exercise: React.FC<ExerciseProps> = ({ weekday }) => {
  // Fetch all exercises for the given weekday from local storage
  let weekdayExercises: ExerciseObject[] = [];

  //form, when submitted send to localstorage. Give write an exercisemap,
  // pair weekdayexercies with the weekday and send to localstorageWrite

  const [exercises, setExercises] = useState(weekdayExercises);
  
  useEffect(() => {
    weekdayExercises = useLocalStorageRead(weekday);
    setExercises(weekdayExercises);
  }, [weekday]); // Dependency array includes 'weekday' to re-run the effect when it changes
  // -------------------------------------------------------------------------------------------

  useEffect(() => {
    const newExercises = useLocalStorageRead(weekday);
    setExercises(newExercises);
  }, [weekday]);

  useEffect(() => {
    useLocalStorageWrite(exercises);

  }, [exercises, weekday]);

  useEffect(() => {
    // Use the key 'exercises-{weekday}' to store exercises data for different weekdays separately
    useLocalStorageWrite(`exercises-${weekday}`, exercises);
  }, [exercises, weekday]);



// save new sets to localstorage
    // when adding a new set, make the update show directly.
    // currently only updates the page if switching day and then returning.

  

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
  // const toggleExercise = (exerciseIndex: number) => {
  //   setExercises((currentExercises) => 
  //     currentExercises.map((exercise, index) => {
  //       if (index === exerciseIndex) {
  //         // Toggle the visibility
  //         return { ...exercise, isVisible: !exercise.isVisible };
  //       }
  //       return exercise;
  //     })
  //   );
  // };
  
    
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

      // Make sure to handle conversion safely. Since 'completed' is a boolean, it shouldn't be converted to number
      if (field === "repetitions" || field === "weight") {
        setToUpdate[field] = Number(value);
      } else if (field === "completed") {
        setToUpdate[field] = value === "true";
      }

      exerciseToUpdate.sets[setIndex] = setToUpdate;
      updatedExercises[exerciseIndex] = exerciseToUpdate;

      return updatedExercises;
    });
  };

  return (
    <div className="Exercise">
      {exercises.map((exercise, exerciseIndex) => (
        <div key={exerciseIndex} style={styles.exerciseContainer}>
          <div style={styles.exerciseHeader}>
            <h3 style={exercise.completed ? styles.h3Hover : styles.h3}>
              {exercise.name} {" "}
            </h3>
              <strong>Total Sets: {exercise.sets.length}</strong>
            <div>
            <button
                // onClick={() => toggleExercise(exerciseIndex)}
                // style={styles.exerciseButton}
              >
                🔽
              </button>
              
              <label style={styles.flexLabel}>
                All sets completed
                <input
                  type="checkbox"
                  checked={exercise.sets.every((set) => set.completed)}
                  onChange={() => toggleAllSetsCompleted(exerciseIndex)}
                />{" "}
              </label>
            </div>
          </div>
          {/* {exercise.isVisible && exercise.sets.map((set, setIndex) => (
    ))} */}
          {exercise.sets.map((set, setIndex) => (
            <div key={setIndex} style={styles.inputAndButtonContainer}>
              <button
                onClick={() => removeSet(exerciseIndex, setIndex)}
                // style={styles.removeButton}
              >
                ❌
              </button>             
              <span>Set {setIndex + 1}:</span>
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
              Reps
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
              Weight
              <label>
                <input
                  type="checkbox"
                  checked={set.completed}
                  onChange={() => toggleSetCompleted(exerciseIndex, setIndex)}
                />
              </label>
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
  exerciseContainer: {
    marginTop: "10px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    backgroundColor: "#FFFAFA",
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
    marginBottom: "15px",
  },
  setContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "5px",
  },
  setInput: {
    margin: "0 5px",
    padding: "5px",
    width: "60px",
    borderRadius: "4px",
    border: "1px solid #ccc",
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

  // exerciseButton: {
  //   background: "#008CBA",
  //   color: "white",
  //   border: "none",
  //   borderRadius: "4px",
  //   padding: "5px 10px",
  //   cursor: "pointer",
  //   margin: "0 10px",
  //   marginRight: "30px",
  // },

  addButton: {
    display: "inline-block",
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  },

  // removeButton: {
  //   cursor: 'pointer',
  //   marginLeft: '10px',
  //   backgroundColor: '#f44336',
  //   color: 'white',
  //   border: 'none',
  //   borderRadius: '4px',
  //   padding: '5px 10px',
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
