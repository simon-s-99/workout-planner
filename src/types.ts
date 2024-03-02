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

export type ExerciseSet = {
    id: string;
    setNumber: number;
    reps: number;
    weight: number;
    completed: boolean;
  }

  export type Exercise = {
    name: string;
    sets: ExerciseSet[];
    completed: boolean;
  }

  export type ExerciseDetailProps = {
    exercise: Exercise;
    onAddSet: (exerciseName: string) => void;
    onRemoveSet: (exerciseName: string, setId: string) => void;
    onUpdateSet: (
      exerciseName: string,
      setId: string,
      reps: number,
      weight: number
    ) => void;
    toggleSetCompleted: (exerciseName: string, setId: string) => void;
    toggleAllSetsCompleted: (exerciseName: string) => void;
  }