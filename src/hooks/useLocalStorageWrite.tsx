import { WeekdayExerciseMap, ExerciseObject, Weekday } from "../types";

/*
    Custom React hook that writes a map of weekdays and their associated exercises to localStorage.
    Hook retrieves the old exercises for the day first (if there are any) & adds the new exercises at the end.
*/

export function useLocalStorageWrite(
  weekdayExerciseMap: WeekdayExerciseMap
): void {
  weekdayExerciseMap.forEach((newExercises, day) => {
    const newData: ExerciseObject[] = [];
    const oldDataRaw = localStorage.getItem(day); // this should be type=string but js throws an error
    if (oldDataRaw !== null) {
      newData.push(...JSON.parse(oldDataRaw));
    }

    newData.push(...newExercises);
    localStorage.setItem(day, JSON.stringify(newData));
  });
}

// export function useLocalStorageWrite(
//   weekday: Weekday,
//   exercises: ExerciseObject[]
// ): void {
//   localStorage.setItem(weekday, JSON.stringify(exercises));
// }
