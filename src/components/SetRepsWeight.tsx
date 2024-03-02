// add checkbox if exercise is completed in a new component
// add toggle all sets as completed
import React, { useState } from "react";
import initialExerciseData from "../components/exerciseData.json";

interface ExerciseSet {
  id: string;
  setNumber: number;
  reps: number;
  weight: number;
  completed: boolean;
}

interface Exercise {
  name: string;
  sets: ExerciseSet[];
}

// Props expected by the ExerciseDetail component, including functions for modifying exercise data.
interface ExerciseDetailProps {
  exercise: Exercise;
  onAddSet: (exerciseName: string) => void;
  onRemoveSet: (exerciseName: string, setId: string) => void;
  onUpdateSet: (
    exerciseName: string,
    setId: string,
    reps: number,
    weight: number
  ) => void;
  toggleSetCompleted: (exerciseName: string, setId: string) => void; // Function to toggle completion status of a set.
  toggleAllSetsCompleted: (exerciseName: string) => void;
}

// Component for displaying and editing details of an exercise.
const ExerciseDetail: React.FC<ExerciseDetailProps> = ({
  exercise,
  onAddSet,
  onRemoveSet,
  onUpdateSet,
  toggleSetCompleted,
  toggleAllSetsCompleted,
}) => {
  // Renders input fields for editing reps or weight of a set.
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
      <button
        onClick={() => toggleAllSetsCompleted(exercise.name)}
        //Style with svg for "toggle all sets"
        style={{
          fontSize: "24px",
          border: "none",
          background: "none",
          cursor: "pointer",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-check"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </button>

      {exercise.sets.map((set) => (
        <div key={set.id}>
          <span>Set {set.setNumber}: </span>
          {renderEditableField(set, "weight")} kgs/lbs
          {renderEditableField(set, "reps")} reps,
          <input
            type="checkbox"
            checked={set.completed}
            onChange={() => toggleSetCompleted(exercise.name, set.id)}
          />{" "}
          Completed
          <button onClick={() => onRemoveSet(exercise.name, set.id)}>
            Remove Set
          </button>
        </div>
      ))}
    </div>
  );
};

// Main component to manage and display the list of exercises.
const SetRepsWeight: React.FC = () => {
  // Initializes state with exercise data, adding unique IDs and a completed flag for each set.
  const [exercises, setExercises] = useState<Exercise[]>(() =>
    initialExerciseData.map((exercise) => ({
      ...exercise,
      sets: exercise.sets.map((set, index) => ({
        ...set,
        id: `${exercise.name.replace(/\s+/g, "")}-set-${set.setNumber}-${
          Date.now() + index
        }`,
        completed: false,
      })),
    }))
  );

  // Function to add a new set to an exercise.
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
            completed: false,
          };
          return { ...exercise, sets: [...exercise.sets, newSet] };
        }
        return exercise;
      })
    );
  };

  // Function to remove a set from an exercise.
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

  // Function to update the details of a specific set within an exercise.
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

  // Function to toggle the completion status of a set.
  const toggleSetCompleted = (exerciseName: string, setId: string) => {
    setExercises((currentExercises) =>
      currentExercises.map((exercise) => {
        if (exercise.name === exerciseName) {
          return {
            ...exercise,
            sets: exercise.sets.map((set) =>
              set.id === setId ? { ...set, completed: !set.completed } : set
            ),
          };
        }
        return exercise;
      })
    );
  };

  const toggleAllSetsCompleted = (exerciseName: string) => {
    setExercises((currentExercises) =>
      currentExercises.map((exercise) => {
        if (exercise.name === exerciseName) {
          // Check if all sets are completed to determine the new state
          const allCompleted = exercise.sets.every((set) => set.completed);
          return {
            ...exercise,
            sets: exercise.sets.map((set) => ({
              ...set,
              completed: !allCompleted,
            })),
          };
        }
        return exercise;
      })
    );
  };

  // State to track which exercise's details are being displayed.
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

  // Function to toggle the display of an exercise's detail view.
  const toggleExerciseDetail = (exerciseName: string) => {
    setSelectedExercise((prevName) =>
      prevName === exerciseName ? null : exerciseName
    );
  };

  // The component renders a list of exercises, each with a detail view that can be toggled.
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
              toggleSetCompleted={toggleSetCompleted}
              toggleAllSetsCompleted={toggleAllSetsCompleted}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default SetRepsWeight;
