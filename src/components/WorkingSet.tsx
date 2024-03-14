import type { ExerciseObject, Weekday, WorkingSet } from "../types";
import { useLocalStorageOverwrite } from "../hooks/useLocalStorageOverwrite";
import "../stylesheets/WorkingSet.css";

interface WorkingSetProps {
  weekday: Weekday;
  exercise: ExerciseObject;
  exerciseIndex: number;
  setExercises: React.Dispatch<React.SetStateAction<ExerciseObject[]>>;
  getExerciseData: () => void;
  exercises: ExerciseObject[];
}

const WorkingSet: React.FC<WorkingSetProps> = ({
  weekday,
  exercise,
  setExercises,
  getExerciseData,
  exercises,
  exerciseIndex
}) => {
  // Function to remove a set from an exercise
  // CHANGE: Removes set from selected exercise, and updates the state variable with the new amount of sets
  const removeSet = (exerciseIndex: number, setIndex: number): void => {
    const exercisesCopy = [...exercises];
    const selectedExercise = exercisesCopy[exerciseIndex];

    // Use splice to remove the selected set
    selectedExercise.sets.splice(setIndex, 1);

    // Replace the old exercise with the updated one
    exercisesCopy.splice(exerciseIndex, 1, selectedExercise);

    setExercises(exercisesCopy);
    // Here, you should also update local storage to reflect the changes
    // This can be done by calling your useLocalStorageWrite hook or similar functionality

    // clears localStorage of selected day and writes new exercises to it
    // runs getExerciseData to make sure every other component based on data in localStorage re-renders
    useLocalStorageOverwrite(new Map<Weekday, ExerciseObject[]>([[weekday, exercises]]));
    getExerciseData();
  };

  // Function to toggle a set as completed
  const toggleSetCompleted = (exerciseIndex: number, setIndex: number) => {
    const exercisesCopy = [...exercises];
    const selectedExercise = exercisesCopy[exerciseIndex];
    const selectedSet = selectedExercise.sets[setIndex];

    selectedSet.completed = !selectedSet.completed;

    exercisesCopy[exerciseIndex].sets.splice(setIndex, 1, selectedSet);
    setExercises(exercisesCopy);

    // clears localStorage of selected day and writes new exercises to it
    // runs getExerciseData to make sure every other component based on data in localStorage re-renders
    useLocalStorageOverwrite(new Map<Weekday, ExerciseObject[]>([[weekday, exercises]]));
    getExerciseData();
  };

  const updateSetDetails = (
    exerciseIndex: number,
    setIndex: number,
    field: keyof WorkingSet, // Use keyof to ensure field is a valid key
    value: string
  ) => {
    setExercises((currentExercises) => {
      const updatedExercises = [...currentExercises];
      const exerciseToUpdate = { ...updatedExercises[exerciseIndex] };

      // Since field is now guaranteed to be a key of WorkingSet, TypeScript knows this indexing is safe
      const setToUpdate: WorkingSet = { ...exerciseToUpdate.sets[setIndex] };

      // Make sure to handle conversion safely. Since "completed" is a boolean, it shouldn't be converted to number
      if (field === "repetitions" || field === "weight") {
        setToUpdate[field] = Number(value);
      } else if (field === "completed") {
        setToUpdate[field] = value === "true";
      }

      exerciseToUpdate.sets[setIndex] = setToUpdate;
      updatedExercises[exerciseIndex] = exerciseToUpdate;

      // clears localStorage of selected day and writes new exercises to it
      // runs getExerciseData to make sure every other component based on data in localStorage re-renders
      useLocalStorageOverwrite(new Map<Weekday, ExerciseObject[]>([[weekday, exercises]]));
      getExerciseData();

      return updatedExercises;
    });
  };

  return (
    <>
      {exercise.sets.map((set, setIndex) => (
        <div key={setIndex} className="inputAndButtonContainer">
          <button type="button" onClick={() => removeSet(exerciseIndex, setIndex)}>❌</button>
          <span>Set {setIndex + 1}:</span>
          Reps
          <input
            type="number"
            className="setInput"
            min="0"
            value={set.repetitions}
            onChange={(e) => updateSetDetails(exerciseIndex, setIndex, "repetitions", e.target.value)}
          />

          Weight
          <input
            type="number"
            className="setInput"
            min="0"
            value={set.weight}
            onChange={(e) => updateSetDetails(exerciseIndex, setIndex, "weight", e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              checked={set.completed}
              onChange={() => {
                toggleSetCompleted(exerciseIndex, setIndex);
              }}
            />
          </label>
        </div>
      ))}
    </>
  );
};

export default WorkingSet;
