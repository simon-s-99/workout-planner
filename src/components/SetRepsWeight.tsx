import React, { useState, useEffect } from "react";
import type { ExerciseObject, WorkingSet } from "../types";

type SetRepsWeightProps = {
  exercise: ExerciseObject;
  updateExercise: (updatedExercise: ExerciseObject) => void;
};

const SetRepsWeight: React.FC<SetRepsWeightProps> = ({
  exercise,
  updateExercise,
}) => {
  const [editableSets, setEditableSets] = useState<WorkingSet[]>(exercise.sets);
  const [showSets, setShowSets] = useState(false);
  const [isExerciseCompleted, setIsExerciseCompleted] = useState(
    exercise.completed
  );

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

  const exerciseBlockStyle = {
    background: "#f0f0f0",
    padding: "10px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    cursor: "pointer",
  };

  const inputAndButtonContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  };

  const inputStyle = {
    margin: "0 10px",
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const addButtonStyle = {
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
    margin: "0 10px",
  };

  const removeButtonStyle = {
    background: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
    margin: "0 10px",
  };

  const checkboxLabelStyle = {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    margin: "0 10px",
  };

  const toggleAllButtonStyle = {
    ...addButtonStyle,
    background: "#008CBA",
  };

  return (
    <div>
      <div style={exerciseBlockStyle}>
        <h3 style={{ margin: "0", cursor: "pointer" }} onClick={toggleShowSets}>
          {exercise.name}
        </h3>
        <div style={inputAndButtonContainerStyle}>
          <button onClick={toggleAllSetsCompleted} style={toggleAllButtonStyle}>
            Toggle All Sets
          </button>
          <button onClick={addSet} style={addButtonStyle}>
            Add Set
          </button>
        </div>
        <label
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <input
            type="checkbox"
            checked={isExerciseCompleted}
            onChange={handleExerciseCompletedChange}
            style={{ marginRight: "5px" }}
          />
          Exercise Completed
        </label>
      </div>
      {showSets &&
        editableSets.map((set, index) => (
          <div
            key={index}
            style={{ ...exerciseBlockStyle, background: "#ECEAEA" }}
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
                style={inputStyle}
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
                style={inputStyle}
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
            <button onClick={() => removeSet(index)} style={removeButtonStyle}>
              Remove Set
            </button>
          </div>
        ))}
    </div>
  );
};

export default SetRepsWeight;
