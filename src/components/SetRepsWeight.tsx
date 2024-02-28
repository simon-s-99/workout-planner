import React, { useState } from "react";

// Define the structure for individual sets within an exercise
interface ExerciseSet {
  setNumber: number;
  reps: number;
  weight: number;
}

// Define the structure for an Exercise object
interface Exercise {
  name: string;
  sets: ExerciseSet[];
}

// Subcomponent to display details of an exercise
const ExerciseDetail: React.FC<{ exercise: Exercise }> = ({ exercise }) => {
  // Maps over each set in the exercise to display its details
  return (
    <div>
      {exercise.sets.map((set, index) => (
        <div key={index}>
          {/* Display information about the set */}
          <div>
            Set {set.setNumber}: {set.reps} reps, {set.weight} kgs/lbs (change
            this later)
          </div>
        </div>
      ))}
    </div>
  );
};

// Main component to display exercises and manage which exercise's details are shown
const ExerciseDropdownComponent: React.FC = () => {
  // Initialize the component with example exercises
  const [exercises] = useState<Exercise[]>([
    {
      name: "Barbell Bench Press",
      sets: [
        { setNumber: 1, reps: 10, weight: 135 },
        { setNumber: 2, reps: 8, weight: 185 },
      ],
    },
    {
      name: "Deadlift",
      sets: [
        { setNumber: 1, reps: 5, weight: 225 },
        { setNumber: 2, reps: 5, weight: 275 },
      ],
    },
    {
      name: "Squats",
      sets: [
        { setNumber: 1, reps: 8, weight: 185 },
        { setNumber: 2, reps: 8, weight: 235 },
      ],
    },
  ]);

  const [selectedExerciseName, setSelectedExerciseName] = useState<
    string | null
  >(null); // Tracks the currently selected exercise

  // Function to toggle the visibility of an exercise's details
  const toggleExerciseDetail = (name: string) => {
    setSelectedExerciseName((prevName) => (prevName === name ? null : name));
    // If the selected exercise is clicked again, it hides its details, otherwise shows the new one
  };

  return (
    <div>
      {exercises.map((exercise) => (
        <div key={exercise.name}>
          {/* Button to toggle the display of the exercise details */}
          <button onClick={() => toggleExerciseDetail(exercise.name)}>
            {exercise.name}
          </button>
          {/* Conditionally render the ExerciseDetail component if this exercise is selected */}
          {selectedExerciseName === exercise.name && (
            <ExerciseDetail exercise={exercise} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ExerciseDropdownComponent;
