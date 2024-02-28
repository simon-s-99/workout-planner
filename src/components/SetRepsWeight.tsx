import React, { useState, useEffect } from "react";

//might need to have a converter here depending on if it's set to kg or lbs

interface ExerciseSet {
  setNumber: number;
  reps: number;
  weight: number;
}

interface Exercise {
  name: string;
  sets: ExerciseSet[]; // An array of sets
}

//Subcomponent to display details of an exercise
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
  const [exercises, setExercises] = useState<Exercise[]>([]); // Stores the list of exercises
  const [selectedExerciseName, setSelectedExerciseName] = useState<
    string | null
  >(null); // Tracks the currently selected exercise

  useEffect(() => {
    // Fetches exercises from localStorage on component mount
    const storedExercises = localStorage.getItem("exercises");
    if (storedExercises) {
      // Parse the JSON string back into an array of Exercise objects and set it to state
      setExercises(JSON.parse(storedExercises));
    }
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

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
