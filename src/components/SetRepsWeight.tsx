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
  // Local state to manage edits to sets
  const [editableSets, setEditableSets] = useState<WorkingSet[]>(exercise.sets);

  useEffect(() => {
    setEditableSets(exercise.sets);
  }, [exercise.sets]);

  const handleSetChange = (
    index: number,
    field: "weight" | "repetitions",
    value: number
  ) => {
    const updatedSets = editableSets.map((set, idx) =>
      idx === index ? { ...set, [field]: value } : set
    );
    setEditableSets(updatedSets);
    // Update the parent component immediately with the new set values
    updateExercise({ ...exercise, sets: updatedSets });
  };

  const addSet = () => {
    const newSet: WorkingSet = {
      repetitions: 10,
      weight: 100,
      completed: false,
    }; // Default values for new set
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

  return (
    <div>
      <h3>{exercise.name}</h3>
      {editableSets.map((set, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <label>
            Reps:
            <input
              type="number"
              value={set.repetitions}
              onChange={(e) =>
                handleSetChange(index, "repetitions", parseInt(e.target.value))
              }
              style={{ margin: "0 5px" }}
            />
          </label>
          <label>
            Weight:
            <input
              type="number"
              value={set.weight}
              onChange={(e) =>
                handleSetChange(index, "weight", parseInt(e.target.value))
              }
              style={{ margin: "0 5px" }}
            />
          </label>
          <button
            onClick={() => toggleSetCompleted(index)}
            style={{ margin: "0 5px" }}
          >
            {set.completed ? "Undo Complete" : "Complete"}
          </button>
          <button onClick={() => removeSet(index)} style={{ margin: "0 5px" }}>
            Remove Set
          </button>
        </div>
      ))}
      <button onClick={addSet} style={{ marginTop: "10px" }}>
        Add Set
      </button>
    </div>
  );
};

export default SetRepsWeight;
