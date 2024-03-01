import React, { useState } from "react";
import initialExerciseData from "../components/exerciseData.json";

// add checkbox if set is done.
// add checkbox if exercise is done.

interface ExerciseSet {
  id: string; // Unique identifier for each set
  setNumber: number; // The order number of the set
  reps: number;
  weight: number;
  // completed: boolean; // Bool to check if a set is completed
}

interface Exercise {
  name: string; // Name of the exercise
  sets: ExerciseSet[];
}

// Props for the ExerciseDetail component
interface ExerciseDetailProps {
  exercise: Exercise; // The current exercise being displayed
  onAddSet: (exerciseName: string) => void; // Function to add a set to an exercise
  onRemoveSet: (exerciseName: string, setId: string) => void; // Function to remove a set from an exercise
  onUpdateSet: (
    // Function to update the details of a set
    exerciseName: string,
    setId: string,
    reps: number,
    weight: number
  ) => void;
}

// Component for displaying and editing details of an exercise
const ExerciseDetail: React.FC<ExerciseDetailProps> = ({
  exercise,
  onAddSet,
  onRemoveSet,
  onUpdateSet,
}) => {
  // Renders input fields for editing reps or weight of a set
  const renderEditableField = (set: ExerciseSet, field: "reps" | "weight") => {
    return (
      <input
        type="number"
        defaultValue={field === "reps" ? set.reps : set.weight}
        onBlur={(e) =>
          onUpdateSet(
            exercise.name,
            set.id,
            field === "reps" ? parseInt(e.target.value, 10) : set.reps,
            field === "weight" ? parseInt(e.target.value, 10) : set.weight
          )
        }
      />
    );
  };

  return (
    <div>
      <button onClick={() => onAddSet(exercise.name)}>Add Set</button>
      {exercise.sets.map((set) => (
        <div key={set.id}>
          <span>Set {set.setNumber}: </span>
          {renderEditableField(set, "weight")} kgs/lbs
          {renderEditableField(set, "reps")} reps,
          <button onClick={() => onRemoveSet(exercise.name, set.id)}>
            Remove Set
          </button>
        </div>
      ))}
    </div>
  );
};

// Main component to manage and display the list of exercises
const SetRepsWeight: React.FC = () => {
  // State to hold the list of exercises, dynamically initialized with IDs for each set
  const [exercises, setExercises] = useState<Exercise[]>(() =>
    initialExerciseData.map((exercise) => ({
      ...exercise,
      sets: exercise.sets.map((set, index) => ({
        ...set,
        id: `${exercise.name.replace(/\s+/g, "")}-set-${set.setNumber}-${
          Date.now() + index
        }`,
      })),
    }))
  );

  // Function to add a new set to an exercise
  const addSet = (exerciseName: string) => {
    setExercises((currentExercises) =>
      currentExercises.map((exercise) => {
        if (exercise.name === exerciseName) {
          const newSet = {
            id: `${exerciseName.replace(/\s+/g, "")}-set-${
              exercise.sets.length + 1
            }-${Date.now()}`,
            setNumber: exercise.sets.length + 1,
            reps: 0,
            weight: 0,
          };
          return { ...exercise, sets: [...exercise.sets, newSet] };
        }
        return exercise;
      })
    );
  };

  // Function to remove a set from an exercise
  const removeSet = (exerciseName: string, setId: string) => {
    setExercises((currentExercises) =>
      currentExercises.map((exercise) => {
        if (exercise.name === exerciseName) {
          return {
            ...exercise,
            sets: exercise.sets.filter((set) => set.id !== setId),
          };
        }
        return exercise;
      })
    );
  };

  // Function to update the details of a specific set within an exercise
  const onUpdateSet = (
    exerciseName: string,
    setId: string,
    reps: number,
    weight: number
  ) => {
    setExercises((currentExercises) =>
      currentExercises.map((exercise) => {
        if (exercise.name === exerciseName) {
          const updatedSets = exercise.sets.map((set) =>
            set.id === setId ? { ...set, reps, weight } : set
          );
          return { ...exercise, sets: updatedSets };
        }
        return exercise;
      })
    );
  };

  // State to track which exercise's details are being displayed
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

  // Function to toggle the display of an exercise's detail view
  const toggleExerciseDetail = (exerciseName: string) => {
    setSelectedExercise((prevName) =>
      prevName === exerciseName ? null : exerciseName
    );
  };

  return (
    <div>
      {exercises.map((exercise) => (
        <div key={exercise.name}>
          <h3
            onClick={() => toggleExerciseDetail(exercise.name)}
            style={{ cursor: "pointer" }}
          >
            {exercise.name}
          </h3>
          {selectedExercise === exercise.name && (
            <ExerciseDetail
              exercise={exercise}
              onAddSet={addSet}
              onRemoveSet={removeSet}
              onUpdateSet={onUpdateSet}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default SetRepsWeight;
