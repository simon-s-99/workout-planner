import React, { useState, useEffect } from "react";
import type { ExerciseObject, Unit, Weekday } from "../types";
import { useLocalStorageRead } from "../hooks/useLocalStorageRead";
import { useLocalStorageOverwrite } from "../hooks/useLocalStorageOverwrite";
import "../stylesheets/Exercise.css";
import WorkingSet from "./WorkingSet";
import TogglePageVisibilityButton from "./ToggleExerciseVisibilityButton";
import RemoveExerciseButton from "./RemoveExerciseButton";
import AddSetButton from "./AddSetButton";
import ToggleAllSetsCompletedButton from "./ToggleAllSetsCompletedButton";

// add function to click on exercise in order to show, and hide sets
// Exercise completed should close the exercise when checked.
//if already checked and unchecking it (while having the exercise + setmenu open) should not close it

// Restructure positions of buttons, text etc
//implement weekday logic

//details + summary to show and hide

interface ExerciseProps {
  weightUnit: Unit;
  weekday: Weekday;
  exerciseData: ExerciseObject[];
  getExerciseData: () => void;
}

const Exercise: React.FC<ExerciseProps> = ({ weekday, exerciseData: weekExerciseListLength, getExerciseData }) => {
  // Fetch all exercises for the given weekday from local storage
  let weekdayExercises: ExerciseObject[] = [];

  //form, when submitted send to localstorage. Give write an exercisemap,
  // pair weekdayexercies with the weekday and send to localstorageWrite

  const [exercises, setExercises] = useState<ExerciseObject[]>([]);
  // const [exercises, setExercises] = useState(weekdayExercises);
  const [hiddenExercises, setHiddenExercises] = useState<Set<number>>(new Set<number>());

  useEffect(() => {
    weekdayExercises = useLocalStorageRead(weekday);
    setExercises(weekdayExercises);
  }, [weekday, weekExerciseListLength]); // Dependency array includes 'weekday' to re-run the effect when it changes

  // save new sets to localstorage
  // when adding a new set, make the update show directly.
  // currently only updates the page if switching day and then returning.


  return (
    <div className="Exercise">
      {exercises.map((exercise, exerciseIndex) => (
        <div key={exerciseIndex} className="exerciseContainer">
          <TogglePageVisibilityButton exerciseIndex={exerciseIndex} setHiddenExercises={setHiddenExercises} />
          <div className="exerciseHeader">
            <h3>{exercise.name}</h3>
            <strong>Total Sets: {exercise.sets.length}</strong>

            <ToggleAllSetsCompletedButton
              exerciseIndex={exerciseIndex}
              weekday={weekday}
              exercises={exercises}
              getExerciseData={getExerciseData}
              setExercises={setExercises}
              exercise={exercise}
            />
            <RemoveExerciseButton
              exerciseIndex={exerciseIndex}
              weekday={weekday}
              exercises={exercises}
              getExerciseData={getExerciseData}
            />
          </div>
          {!hiddenExercises.has(exerciseIndex) && (
            <>
              <WorkingSet
                weekday={weekday}
                exercise={exercise}
                exerciseIndex={exerciseIndex}
                setExercises={setExercises}
                getExerciseData={getExerciseData}
                exercises={exercises}
              />
              <AddSetButton
                exerciseIndex={exerciseIndex}
                exercises={exercises}
                setExercises={setExercises}
                weekday={weekday}
                getExerciseData={getExerciseData}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Exercise;
