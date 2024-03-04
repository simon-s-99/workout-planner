// // DayWorkout.tsx currently has no real function lol
// import React, { useState } from "react";
// import Exercise from "./SetRepsWeight";
// import { ExerciseObject } from "../types";

// const DayWorkout: React.FC = () => {
//   const [exercises, setExercises] = useState<ExerciseObject[]>([]); // Initialize with actual data as needed

//   const updateExercise = (updatedExercise: ExerciseObject) => {
//     const updatedExercises = exercises.map((exercise) =>
//       exercise.name === updatedExercise.name ? updatedExercise : exercise
//     );
//     setExercises(updatedExercises);
//   };

//   return (
//     <div>
//       {exercises.map((exercise) => (
//         <Exercise
//           key={exercise.name}
//           exercise={exercise}
//           updateExercise={updateExercise}
//         />
//       ))}
//     </div>
//   );
// };

// export default DayWorkout;
