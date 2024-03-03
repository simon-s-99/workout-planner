// src/components/ExerciseDetail.tsx
import React from "react";
import { WorkingSet } from "../types";

interface ExerciseDetailProps {
  exercise: {
    name: string;
    sets: WorkingSet[];
    completed: boolean;
  };
  onRemoveSet: (exerciseName: string, setId: string) => void;
  onUpdateSet: (
    exerciseName: string,
    setId: string,
    reps: number,
    weight: number
  ) => void;
  toggleSetCompleted: (exerciseName: string, setId: string) => void;
  toggleAllSetsCompleted: (exerciseName: string) => void;
}

const ExerciseDetail: React.FC<ExerciseDetailProps> = ({
  exercise,
  onRemoveSet,
  onUpdateSet,
  toggleSetCompleted,
  toggleAllSetsCompleted,
}) => {
  const renderEditableField = (set: WorkingSet, field: "reps" | "weight") => {
    return (
      <input
        type="number"
        defaultValue={field === "reps" ? set.repetitions : set.weight}
        onBlur={(e) =>
          onUpdateSet(
            exercise.name,
            set.id,
            field === "reps" ? parseInt(e.target.value, 10) : set.repetitions,
            field === "weight" ? parseInt(e.target.value, 10) : set.weight
          )
        }
      />
    );
  };

  return (
    <div>
      <button onClick={() => toggleAllSetsCompleted(exercise.name)}>
        ✔ Mark all sets as completed
      </button>
      {exercise.sets.map((set) => (
        <div key={set.id}>
          <span>Set {set.setNumber}: </span>
          {renderEditableField(set, "weight")} kgs/lbs
          {renderEditableField(set, "reps")} reps
          <input
            type="checkbox"
            checked={set.completed}
            onChange={() => toggleSetCompleted(exercise.name, set.id)}
          />
          <button onClick={() => onRemoveSet(exercise.name, set.id)}>
            Remove Set
          </button>
        </div>
      ))}
    </div>
  );
};

export default ExerciseDetail;
