import React, { useState, useEffect } from "react";
import type { ExerciseObject, WorkingSet } from "../types";
import "../SetRepsWeight.css";

type SetRepsWeightProps = {
  exercise: ExerciseObject;
  updateExercise: (updatedExercise: ExerciseObject) => void;
};

const SetRepsWeight: React.FC<SetRepsWeightProps> = ({
  exercise,
  updateExercise,
}) => {
  // State for the editable sets of the exercise
  const [editableSets, setEditableSets] = useState<WorkingSet[]>(exercise.sets);

  // Toggle visibility of sets
  const [showSets, setShowSets] = useState(false);

  // Track if the exercise is completed
  const [isExerciseCompleted, setIsExerciseCompleted] = useState(
    exercise.completed
  );

  // Effect hook to update state when the exercise prop changes
  useEffect(() => {
    setEditableSets(exercise.sets);
    setIsExerciseCompleted(exercise.sets.every((set) => set.completed));
  }, [exercise]);

  const toggleShowSets = () => setShowSets(!showSets);

  const handleSetChange = (
    index: number,
    field: "weight" | "repetitions",
    value: number
  ) => {
    const updatedSets = editableSets.map((set, idx) =>
      idx === index ? { ...set, [field]: value } : set
    );
    setEditableSets(updatedSets);
    updateExercise({ ...exercise, sets: updatedSets });
  };

  const addSet = () => {
    const newSet: WorkingSet = {
      repetitions: 10,
      weight: 100,
      completed: false,
    };
    const updatedSets = [...editableSets, newSet];
    setEditableSets(updatedSets);
    updateExercise({ ...exercise, sets: updatedSets });
  };

  const removeSet = (index: number) => {
    const updatedSets = editableSets.filter((_, idx) => idx !== index);
    setEditableSets(updatedSets);
    updateExercise({ ...exercise, sets: updatedSets });
  };

  const toggleSetCompleted = (index: number) => {
    const updatedSets = editableSets.map((set, idx) =>
      idx === index ? { ...set, completed: !set.completed } : set
    );
    setEditableSets(updatedSets);
    updateExercise({ ...exercise, sets: updatedSets });
  };

  const toggleAllSetsCompleted = () => {
    // Check if all sets are already marked as completed
    const allCompleted = editableSets.every((set) => set.completed);

    const updatedSets = editableSets.map((set) => ({
      ...set,
      completed: !allCompleted,
    }));

    setEditableSets(updatedSets);
    updateExercise({
      ...exercise,
      sets: updatedSets,
      completed: updatedSets.every((set) => set.completed),
    });
  };

  // Function to handle change in the exercise's completion status
  const handleExerciseCompletedChange = () => {
    const newCompletionStatus = !isExerciseCompleted;
    setIsExerciseCompleted(newCompletionStatus);
    if (newCompletionStatus) {
      setShowSets(false); // Close the sets if the exercise is marked as completed
    }
    const updatedSets = editableSets.map((set) => ({
      ...set,
      completed: newCompletionStatus,
    }));
    setEditableSets(updatedSets);
    updateExercise({
      ...exercise,
      sets: updatedSets,
      completed: newCompletionStatus,
    });
  };

  return (
    <div>
      <div className="exercise-block">
        <h3 onClick={toggleShowSets}>{exercise.name}</h3>
        <div className="input-and-button-container">
          <span className="total-sets-info">
            Total Sets: {editableSets.length}
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              flex: 1,
            }}
          >
            <button
              onClick={handleExerciseCompletedChange}
              className="exercise-completed-button"
            >
              Exercise Completed
            </button>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
              <input
                type="checkbox"
                checked={editableSets.every((set) => set.completed)}
                onChange={toggleAllSetsCompleted}
                style={{ marginRight: "5px" }}
              />
              All sets completed
            </label>
            <button onClick={addSet} className="add-button">
              Add Set
            </button>
          </div>
        </div>
      </div>
      {showSets &&
        editableSets.map((set, index) => (
          <div
            key={index}
            className="exercise-block"
            style={{ background: "#ECEAEA" }}
          >
            <span>{`Set ${index + 1}: `}</span>
            <label style={{ marginRight: "5px" }}>
              Reps:
              <input
                type="number"
                value={set.repetitions}
                onChange={(e) =>
                  handleSetChange(
                    index,
                    "repetitions",
                    parseInt(e.target.value)
                  )
                }
                className="input-style"
              />
            </label>
            <label style={{ marginRight: "5px" }}>
              Weight:
              <input
                type="number"
                value={set.weight}
                onChange={(e) =>
                  handleSetChange(index, "weight", parseInt(e.target.value))
                }
                className="input-style"
              />
            </label>
            <label style={{ cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={set.completed}
                onChange={() => toggleSetCompleted(index)}
                style={{ marginRight: "5px" }}
              />
              Completed
            </label>
            <button onClick={() => removeSet(index)} className="remove-button">
              Remove Set
            </button>
          </div>
        ))}
    </div>
  );
};

export default SetRepsWeight;
