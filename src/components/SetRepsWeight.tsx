import React, { useState } from "react";
import initialExerciseData from "../components/exerciseData.json";
import { ExerciseSet, Exercise, ExerciseDetailProps } from "../types";

// Gives each set a unique id
function generateSetId(exerciseName: string, setNumber: number, index = 0) {
  // fugly ass code, but it works to create a unique id.
  const cleanName = exerciseName.replace(/\s+/g, "");
  const timestamp = Date.now() + index;
  return `${cleanName}-set-${setNumber}-${timestamp}`;
}

// Component for displaying and editing details of an exercise.
const ExerciseDetail: React.FC<ExerciseDetailProps> = ({
  exercise,
  onRemoveSet,
  onUpdateSet, //Allows the user to edit their set
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
    // Change this button later on
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
          />{" "}
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
        id: generateSetId(exercise.name, set.setNumber, index),
        completed: false,
      })),
      completed: false,
    }))
  );

  //Mark an exercise as completed
  const toggleExerciseCompleted = (exerciseName: string) => {
    setExercises((currentExercises) =>
      currentExercises.map((exercise) => {
        if (exercise.name === exerciseName) {
          const newCompletedStatus = !exercise.completed;
          return {
            ...exercise,
            sets: exercise.sets.map((set) => ({
              ...set,
              completed: newCompletedStatus,
            })),
            completed: newCompletedStatus,
          };
        }
        return exercise;
      })
    );
  };

  // Function to add a new set to an exercise.
  const addSet = (exerciseName: string) => {
    setExercises((currentExercises) =>
      currentExercises.map((exercise) => {
        if (exercise.name === exerciseName) {
          const newSetNumber = exercise.sets.length + 1;
          const newSet = {
            id: generateSetId(exerciseName, newSetNumber),
            setNumber: newSetNumber,
            reps: 8, //current default values. These will most likely be changed by training goal values
            weight: 20,
            completed: false,
          };
          return { ...exercise, sets: [...exercise.sets, newSet] };
        }
        return exercise;
      })
    );
  };
  // Function to remove a set from an exercise.
  const removeSet = (exerciseName: string, setId: string): void => {
    setExercises((currentExercises) =>
      currentExercises.map((exercise) => {
        if (exercise.name === exerciseName) {
          // Remove the set by its id
          const filteredSets = exercise.sets.filter((set) => set.id !== setId);

          //Renumber the sets to maintain sequential setNumbers after a removal
          const renumberedSets = filteredSets.map((set, index) => ({
            ...set,
            setNumber: index + 1,
          }));

          return {
            ...exercise,
            sets: renumberedSets,
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
  const toggleExerciseDetail = (
    exerciseName: string,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // Prevent toggling if the checkbox was clicked
    if (
      (event.target as HTMLElement).className.includes(
        "exercise-completion-checkbox"
      )
    ) {
      return;
    }

    setSelectedExercise((prevName) =>
      prevName === exerciseName ? null : exerciseName
    );
  };

  // Rendering of each exerciseDetail
  return (
    <div className="exercises-container">
      {exercises.map((exercise) => (
        <div key={exercise.name} className="exercise-item">
          <div
            className="exercise-header"
            // "(a) to pass the click event for toggleExerciseDetails"
            onClick={(a) => toggleExerciseDetail(exercise.name, a)}
          >
            <h3 className="exercise-title" style={{ cursor: "pointer" }}>
              {exercise.name}
            </h3>
            <button
              onClick={(a) => {
                // prevents the click from reaching the parent div, that toggles exercise detail
                a.stopPropagation();
                addSet(exercise.name);
              }}
              className="add-set-button"
            >
              Add Set
            </button>

            <div className="exercise-completion">
              <label className="exercise-completion-label">
                <input
                  type="checkbox"
                  checked={exercise.completed}
                  onChange={(event) => {
                    const isChecked = event.target.checked;
                    event.stopPropagation();
                    toggleExerciseCompleted(exercise.name);
                    // Close the exercise detail view if the checkbox is being checked
                    if (isChecked && selectedExercise === exercise.name) {
                      setSelectedExercise(null);
                    }
                  }}
                  className="exercise-completion-checkbox"
                />
                Exercise completed
              </label>
            </div>
          </div>
          {selectedExercise === exercise.name && (
            <ExerciseDetail
              // Pass functions as props
              exercise={exercise}
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
