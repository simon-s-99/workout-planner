import { Weekday, ExerciseObject, WeekdayExerciseMap } from "../types";

// converts the WeekdayExerciseMap into a string format
// by first converting it into an array of entries (using Array.from(map.entries()))
// in order to store it as strings, not complex objects.
const serialize = (map: WeekdayExerciseMap): string =>
  JSON.stringify(Array.from(map.entries()));

// Deserialize string back to WeekdayExerciseMap
const deserialize = (serializedMap: string): WeekdayExerciseMap =>
  new Map(JSON.parse(serializedMap));

// Custom hook for managing exercise data in localStorage
export const useExerciseStorage = () => {
  // It first attempts to retrieve the serialized map string from localStorage.
  // If found, it deserializes the string back into a WeekdayExerciseMap,
  // then retrieves and returns the exercises array for the specified weekday.
  // If no data is found for that weekday, it returns an empty array.
  const read = (weekday: Weekday): ExerciseObject[] => {
    const serializedMap = localStorage.getItem("exercises");
    if (serializedMap) {
      const exercisesMap = deserialize(serializedMap);
      return exercisesMap.get(weekday) || [];
    }
    return [];
  };

  // Function to write exercises for a specific weekday to localStorage
  // It first retrieves any existing data from localStorage and deserializes it.
  // If no existing data is found, it initializes a new Map.
  // It then updates the Map with the new exercises for the specified weekday,
  // serializes the updated Map, and saves it back to localStorage.
  const write = (weekday: Weekday, exercises: ExerciseObject[]) => {
    const serializedMap = localStorage.getItem("exercises");
    const exercisesMap = serializedMap ? deserialize(serializedMap) : new Map();
    exercisesMap.set(weekday, exercises);
    localStorage.setItem("exercises", serialize(exercisesMap));
  };

  return { read, write };
};
