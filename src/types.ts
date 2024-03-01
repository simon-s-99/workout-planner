/* PLACE YOUR CUSTOM TYPES HERE AND REFER TO THEM VIA 
import type {Type} from ./types; 
*/

export type TrainingGoal = "strength" | "powerlifting" | "cardio";
export type Unit = "kilograms" | "pounds";
export type Settings = {
  units: Unit;
  trainingGoal: TrainingGoal;
};

export type Weekday =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type MuscleGroup =
  | "abdominals"
  | "biceps"
  | "triceps"
  | "forearms"
  | "chest"
  | "lats"
  | "traps"
  | "lower_back"
  | "middle_back"
  | "glutes"
  | "hamstrings"
  | "quadriceps"
  | "abductors"
  | "adductors"
  | "calves";

export type Color =
  | "red"
  | "green"
  | "blue"
  | "yellow"
  | "purple"
  | "cyan"
  | "magenta"
  | "orange"
  | "pink"
  | "brown"
  | "gray"
  | "black"
  | "white"
  | "teal"
  | "lime";

export type MuscleGroupData = {
    muscleGroup: MuscleGroup,
    sets: number,
    color: Color
};
