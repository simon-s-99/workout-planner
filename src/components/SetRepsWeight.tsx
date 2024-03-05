import React, { useState, useEffect } from "react";
import type { ExerciseObject, Weekday, WorkingSet } from "../types";
import { useLocalStorageRead } from "../hooks/useLocalStorageRead";

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
          </ol>
        </li>
      ))}
    </ol>
  );
};

// State for the editable sets of the exercise
// const [editableSets, setEditableSets] = useState<WorkingSet[]>(weekdayExercises.sets);
// // Toggle visibility of sets
// const [showSets, setShowSets] = useState(false);
// // Track if the exercise is completed
// const [isExerciseCompleted, setIsExerciseCompleted] = useState(
//   exercise.completed
// );

// Effect hook to update state when the exercise prop changes
// useEffect(() => {
//   setEditableSets(exercise.sets);
//   setIsExerciseCompleted(exercise.sets.every((set) => set.completed));
// }, [exercise]);

// const toggleShowSets = () => setShowSets(!showSets);

// const handleSetChange = (
//   index: number,
//   field: "weight" | "repetitions",
//   value: number
// ) => {
//   // const updatedSets = editableSets.map((set, idx) =>
//   //   idx === index ? { ...set, [field]: value } : set
//   // );
//   // setEditableSets(updatedSets);
//   // updateExercise({ ...exercise, sets: updatedSets });
// };

const addSet = () => {
  const newSet: WorkingSet = {
    repetitions: 10,
    weight: 100,
    completed: false,
  };
  // const updatedSets = [...editableSets, newSet];
  // setEditableSets(updatedSets);
  // updateExercise({ ...exercise, sets: updatedSets });
};

const removeSet = (index: number) => {
  // const updatedSets = editableSets.filter((_, idx) => idx !== index);
  // setEditableSets(updatedSets);
  // updateExercise({ ...exercise, sets: updatedSets });
};

// const toggleSetCompleted = (index: number) => {
//   const updatedSets = editableSets.map((set, idx) =>
//     idx === index ? { ...set, completed: !set.completed } : set
//   );
//   // setEditableSets(updatedSets);
//   // updateExercise({ ...exercise, sets: updatedSets });
// };

// const toggleAllSetsCompleted = () => {
//   // Check if all sets are already marked as completed
//   const allCompleted = editableSets.every((set) => set.completed);

//   const updatedSets = editableSets.map((set) => ({
//     ...set,
//     completed: !allCompleted,
//   }));

// setEditableSets(updatedSets);
// updateExercise({
//   ...exercise,
//   sets: updatedSets,
//   completed: updatedSets.every((set) => set.completed),
// });
// };

// Function to handle change in the exercise's completion status
// const handleExerciseCompletedChange = () => {
//   const newCompletionStatus = !isExerciseCompleted;
//   setIsExerciseCompleted(newCompletionStatus);
//   if (newCompletionStatus) {
//     setShowSets(false); // Close the sets if the exercise is marked as completed
//   }
//   const updatedSets = editableSets.map((set) => ({
//     ...set,
//     completed: newCompletionStatus,
//   }));
//   setEditableSets(updatedSets);
//   updateExercise({
//     ...exercise,
//     sets: updatedSets,
//     completed: newCompletionStatus,
//   });
// };

//     ))}

// {
//   /* Interactive block for the current exercise */
// }
//   <div className="exercise-block">
//     {/* <h3 onClick={toggleShowSets}>{exercise.name}</h3> */}
//     <div className="input-and-button-container">
//       {/* Dynamic interaction UI for editing sets */}
//       <span className="total-sets-info">Total Sets: {editableSets.length}</span>
//       <div className="flex-container">
//         <button
//           onClick={handleExerciseCompletedChange}
//           className="exercise-completed-button"
//         >
//           Exercise Completed
//         </button>
//         <label className="flex-label">
//           <input
//             type="checkbox"
//             checked={editableSets.every((set) => set.completed)}
//             onChange={toggleAllSetsCompleted}
//             className="checkbox-margin"
//           />
//           All sets completed
//         </label>
//         <button onClick={addSet} className="add-button">
//           Add Set
//         </button>
//       </div>
//     </div>
//   </div>;

//   {
//     showSets &&
//       editableSets.map((set, index) => (
//         <div key={index} className="exercise-block exercise-block-background">
//           <span>{`Set ${index + 1}: `}</span>
//           <label className="label-margin">
//             Reps:
//             <input
//               type="number"
//               value={set.repetitions}
//               onChange={(e) =>
//                 handleSetChange(index, "repetitions", parseInt(e.target.value))
//               }
//               className="input-style"
//             />
//           </label>
//           <label className="label-margin">
//             Weight:
//             <input
//               type="number"
//               value={set.weight}
//               onChange={(e) =>
//                 handleSetChange(index, "weight", parseInt(e.target.value))
//               }
//               className="input-style"
//             />
//           </label>
//           <label className="checkbox-label">
//             <input
//               type="checkbox"
//               checked={set.completed}
//               onChange={() => toggleSetCompleted(index)}
//               className="checkbox-margin"
//             />
//             Completed
//           </label>
//           <button onClick={() => removeSet(index)} className="remove-button">
//             Remove Set
//           </button>
//         </div>
//       ));
//   }
//  };

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
