import React, { useState } from "react";
import exerciseData from "../components/exerciseData.json";

interface ExerciseSet {
  setNumber: number; // Identifies the order of the set
  reps: number;
  weight: number;
}

interface Exercise {
  name: string;
  sets: ExerciseSet[]; // Array of sets associated with the exercise
}

// Component for displaying and editing details of an exercise
const ExerciseDetail: React.FC<{
  exercise: Exercise; // The current exercise to display
  onAddSet: (exerciseName: string) => void; // Function to handle adding a new set
  onRemoveSet: (exerciseName: string, index: number) => void; // Adjusted to use index
  onUpdateSet: (
    exerciseName: string,
    setNumber: number,
    reps: number,
    weight: number
  ) => void; // Function to update the details of a set
}> = ({ exercise, onAddSet, onRemoveSet, onUpdateSet }) => {
  // Function to render an input field for editing either reps or weight of a set
  const renderEditableField = (
    set: ExerciseSet,
    field: "reps" | "weight",
    index: number
  ) => {
    return (
      <input
        type="number"
        defaultValue={field === "reps" ? set.reps : set.weight}
        // Update the set details when the user leaves the input field
        onBlur={(e) =>
          onUpdateSet(
            exercise.name,
            index + 1, // Adjust setNumber based on index for consistency
            field === "reps" ? parseInt(e.target.value, 10) : set.reps,
            field === "weight" ? parseInt(e.target.value, 10) : set.weight
          )
        }
      />
    );
  };

  return (
    <div>
      {exercise.sets.map((set, index) => (
        <div key={index}>
          <span>Set {index + 1}: </span>{" "}
          {/* Displaying index + 1 for user clarity */}
          {renderEditableField(set, "weight", index)} kgs/lbs
          {renderEditableField(set, "reps", index)} reps,
          <button onClick={() => onRemoveSet(exercise.name, index)}>
            Remove Set
          </button>
        </div>
      ))}
      <button onClick={() => onAddSet(exercise.name)}>Add Set</button>
    </div>
  );
};

// Main component to manage and display the list of exercises
const SetRepsWeight: React.FC = () => {
  // State to hold the list of exercises, initialized from JSON data
  const [exercises, setExercises] = useState<Exercise[]>(exerciseData);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

  // Adds a new set to the specified exercise
  const addSet = (exerciseName: string) => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.name === exerciseName) {
          const newSetNumber = exercise.sets.length + 1;
          const newSet = { setNumber: newSetNumber, reps: 0, weight: 0 };
          return { ...exercise, sets: [...exercise.sets, newSet] };
        }
        return exercise;
      })
    );
  };

  // Always removes the last set. Might have to do with setNumber
  // Removes a set from the specified exercise
  const removeSet = (exerciseName: string, indexToRemove: number) => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.name === exerciseName) {
          // Create a new array without the set to remove
          const newSets = exercise.sets.filter(
            (_, index) => index !== indexToRemove
          );
          return { ...exercise, sets: newSets };
        }
        return exercise;
      })
    );
  };

  // Updates the details of a specific set within an exercise
  const onUpdateSet = (
    exerciseName: string,
    setNumber: number,
    reps: number,
    weight: number
  ) => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.name === exerciseName) {
          const updatedSets = exercise.sets.map((set) =>
            set.setNumber === setNumber ? { ...set, reps, weight } : set
          );
          return { ...exercise, sets: updatedSets };
        }
        return exercise;
      })
    );
  };

  // Function to toggle the selected exercise's detail view
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
