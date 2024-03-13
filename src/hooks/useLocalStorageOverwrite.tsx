import { WeekdayExerciseMap } from "../types";

/*
    Custom React hook that effectively deletes a weekdays content and writes 
    new exercises to that day in localStorage.
*/

export function useLocalStorageOverwrite(
  weekdayExerciseMap: WeekdayExerciseMap
): void {
  weekdayExerciseMap.forEach((newExercises, day) => {
    localStorage.setItem(day, JSON.stringify(newExercises));
  });
}