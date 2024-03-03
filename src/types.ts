/* PLACE YOUR CUSTOM TYPES HERE AND REFER TO THEM VIA 
import type {Type} from ./types; 
*/

export type TrainingGoal = "strength" | "powerlifting" | "cardio";
export type Unit = "kilograms" | "pounds";
export type Settings = {
    units: Unit;
    trainingGoal: TrainingGoal;
}

export type Weekday = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export type Exercise = {
    name: string,
    type: string,
    muscle: string,
    equipment: string,
    difficulty: string, // <- this variable will most likely not be used for anything, should be a throwaway
    instructions: string
}