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
//     // Here, you might want to update the local storage or global state as well
//   };

//   return (
//     <div>
//       {exercises.map((exercise) => (
//         <Exercise
//           key={exercise.name}
//           exercise={exercise}
//           onUpdate={updateExercise}
//         />
//       ))}
//     </div>
//   );
// };

// export default DayWorkout;
