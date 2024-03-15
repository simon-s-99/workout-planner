import React, { useState, useEffect } from "react";
import type { ExerciseObject, Unit, Weekday } from "../types";
import { useLocalStorageRead } from "../hooks/useLocalStorageRead";
import "../stylesheets/Exercise.css";
import WorkingSet from "./WorkingSet";
import TogglePageVisibilityButton from "./ToggleExerciseVisibilityButton";
import RemoveExerciseButton from "./RemoveExerciseButton";
import AddSetButton from "./AddSetButton";
import ToggleAllSetsCompletedButton from "./ToggleAllSetsCompletedButton";

interface ExerciseProps {
  weightUnit: Unit;
  weekday: Weekday;
  exerciseData: ExerciseObject[];
  getExerciseData: () => void;
}

const Exercise: React.FC<ExerciseProps> = ({ weekday, exerciseData, getExerciseData }) => {
  // Fetch all exercises for the given weekday from local storage
  let weekdayExercises: ExerciseObject[] = [];

  const [exercises, setExercises] = useState<ExerciseObject[]>([]);

  // keeps track of which exercises that the user has "minimized" i.e. the dropdown is either
  // active or not active showing the exercises sets to the user or hiding them
  const [hiddenExercises, setHiddenExercises] = useState<Set<number>>(new Set<number>());

  useEffect(() => {
    // Get the current day's exercises
    weekdayExercises = useLocalStorageRead(weekday);
    setExercises(weekdayExercises);
  }, [weekday, exerciseData]); // Dependency array includes 'weekday' to re-run the effect when it changes

  return (
    <>
      {exercises.map((exercise, exerciseIndex) => (
        <div key={exerciseIndex} className="ExerciseContainer">
          <div className="RemoveExerciseButton">
            <RemoveExerciseButton
              exerciseIndex={exerciseIndex}
              weekday={weekday}
              exercises={exercises}
              getExerciseData={getExerciseData}
            />
          </div>
          <div className="InnerExerciseContainer">
            <div className="ExerciseHeader">
              <TogglePageVisibilityButton
                exerciseIndex={exerciseIndex}
                hiddenExercises={hiddenExercises}
                setHiddenExercises={setHiddenExercises} />
              <p>{exercise.name}</p>
            </div>

            <p>
              <i>Total Sets: {exercise.sets.length}</i>
            </p>

            {!hiddenExercises.has(exerciseIndex) && (
              <>
                <ToggleAllSetsCompletedButton
                  exerciseIndex={exerciseIndex}
                  weekday={weekday}
                  exercises={exercises}
                  getExerciseData={getExerciseData}
                  setExercises={setExercises}
                  exercise={exercise}
                />
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
        </div>
      ))}
    </>
  );
};

export default Exercise;
