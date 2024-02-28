import React, { useState, useEffect } from "react";

interface ExerciseSet {
  setNumber: number;
  reps: number;
  weight: number;
}

interface Exercise {
  name: string;
  sets: ExerciseSet[];
}

// Assume a prop for weight unit is added to this component
const ExerciseDetail: React.FC<{ exercise: Exercise; unit: "kgs" | "lbs" }> = ({
  exercise,
  unit,
}) => {
  return (
    <div>
      {exercise.sets.map((set, index) => (
        <div key={index}>
          <div>
            Set {set.setNumber}: {set.reps} reps, {set.weight} {unit}
          </div>
        </div>
      ))}
    </div>
  );
};

// Adding a prop for the selected weight unit
const ExerciseDropdownComponent: React.FC<{ unit: "kgs" | "lbs" }> = ({
  unit,
}) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExerciseName, setSelectedExerciseName] = useState<
    string | null
  >(null);

  useEffect(() => {
    // Placeholder for fetching data from an API or localStorage
    // TODO: Replace with actual data fetching logic
    const storedExercises = localStorage.getItem("exercises");
    if (storedExercises) {
      setExercises(JSON.parse(storedExercises));
    }
  }, []);

  const toggleExerciseDetail = (name: string) => {
    setSelectedExerciseName((prevName) => (prevName === name ? null : name));
  };

  return (
    <div>
      {exercises.map((exercise) => (
        <div key={exercise.name}>
          <button onClick={() => toggleExerciseDetail(exercise.name)}>
            {exercise.name}
          </button>
          {selectedExerciseName === exercise.name && (
            <ExerciseDetail exercise={exercise} unit={unit} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ExerciseDropdownComponent;
