import React from "react";

// works as a dropdown toggle to either hide or display sets for an exercise 

interface TogglePageVisibilityButtonProps {
  exerciseIndex: number;
  hiddenExercises: Set<number>;
  setHiddenExercises: React.Dispatch<React.SetStateAction<Set<number>>>;
}

const TogglePageVisibilityButton: React.FC<TogglePageVisibilityButtonProps> = ({
  exerciseIndex,
  hiddenExercises,
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
      {/* If exercise is hidden, show a special icon, if not, show another icon */}
      <img src={
        hiddenExercises.has(exerciseIndex)
          ? "./rightFacingArrow.svg"
          : "./downFacingArrow.svg"
      }
        className="visibilityButtonImg" alt="Toggle visibilityButton" />
    </button>
  );
};

export default TogglePageVisibilityButton;
