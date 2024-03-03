import { Weekday, ExerciseObject } from "../types";

/*
    Custom react hook, returns ExerciseObject array of chosen weekday
    meant to display users training program for the day with data from localStorage
*/
export function useLocalStorageRead(weekday: Weekday): ExerciseObject[] {
    const weekDayData: ExerciseObject[] = [];
    const weekDayDataRaw = window.localStorage.getItem(weekday); // should be type=string but js throws error
    if (weekDayDataRaw !== null) {
        weekDayData.push(JSON.parse(weekDayDataRaw));
    }
    
    // if day has no data return emtpy array
    return weekDayData;
}
