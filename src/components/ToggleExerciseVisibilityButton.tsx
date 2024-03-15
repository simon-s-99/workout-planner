import React from "react";

interface TogglePageVisibilityButtonProps {
  exerciseIndex: number;
  setHiddenExercises: React.Dispatch<React.SetStateAction<Set<number>>>;
}

const TogglePageVisibilityButton: React.FC<TogglePageVisibilityButtonProps> = ({
  exerciseIndex,
  setHiddenExercises,
}) => {
  //toggles whether the sets of an exercise are hidden.
  //It works with a Set that keeps track of the indexes of exercises whose details are currently hidden.
  const toggleExerciseVisibility = (exerciseIndex: number) => {
    setHiddenExercises((prevHiddenExercises) => {
      const newHiddenExercises = new Set(prevHiddenExercises);
      if (newHiddenExercises.has(exerciseIndex)) {
        newHiddenExercises.delete(exerciseIndex);
      } else {
        newHiddenExercises.add(exerciseIndex);
      }
      return newHiddenExercises;
    });
  };

  return (
    <button type="button" onClick={() => toggleExerciseVisibility(exerciseIndex)}>
      <img src="/src/assets/rightFacingArrow.svg" className="visibilityButtonImg" alt="Toggle visibilityButton" />
    </button>
  );
};

export default TogglePageVisibilityButton;
