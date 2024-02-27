/* PLACE YOUR CUSTOM TYPES HERE AND REFER TO THEM VIA 
import type {Type} from ./types; 
*/

export type TrainingGoal = "strength" | "bodybuilding" | "endurance";
export type Unit = "metric" | "imperial";
export type Settings = {
    units: Unit;
    trainingGoal: TrainingGoal;
}