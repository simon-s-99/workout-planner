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

interface ExerciseProps {
  weightUnit: Unit;
  weekday: Weekday;
  exerciseData: ExerciseObject[];
  getExerciseData: () => void;
}

const Exercise: React.FC<ExerciseProps> = ({
  weekday,
  exerciseData: weekExerciseListLength,
  getExerciseData,
}) => {
  // Fetch all exercises for the given weekday from local storage
  let weekdayExercises: ExerciseObject[] = [];

  const [exercises, setExercises] = useState<ExerciseObject[]>([]);
  const [hiddenExercises, setHiddenExercises] = useState<Set<number>>(
    new Set<number>()
  );

  useEffect(() => {
    weekdayExercises = useLocalStorageRead(weekday);
    setExercises(weekdayExercises);
  }, [weekday, weekExerciseListLength]); // Dependency array includes 'weekday' to re-run the effect when it changes

  return (
    <div className="Exercise">
      {exercises.map((exercise, exerciseIndex) => (
        <div key={exerciseIndex} className="exerciseContainer">
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
                setHiddenExercises={setHiddenExercises}
              />
              <p>{exercise.name}</p>
            </div>

            <p>
              <i>Total Sets: {exercise.sets.length}</i>
            </p>

            <ToggleAllSetsCompletedButton
              exerciseIndex={exerciseIndex}
              weekday={weekday}
              exercises={exercises}
              getExerciseData={getExerciseData}
              setExercises={setExercises}
              exercise={exercise}
            />
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
        </div>
      ))}
    </div>
  );
};

export default Exercise;
