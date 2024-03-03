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

// WorkingSet is only used here locally but working around export is a pain apparently
export type WorkingSet = {
    repetitions: number,
    weight: number,
    completed: boolean
};

export type ExerciseObject = {
    name: string,
    type: string,
    muscle: string,
    equipment: string,
    difficulty: string,
    instructions: string,
    sets: WorkingSet[],
    completed: boolean
};

// this will be the json structure of the localstorage file (technically SQLite in most cases)
// access a weekdays planned exercises by retrieving the value of that particular weekday (weekday=key)
export type WeekdayExerciseMap = Map<Weekday, ExerciseObject[]>;
