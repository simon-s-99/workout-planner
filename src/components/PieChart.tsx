import { useEffect, useRef, useState } from "react";
import type { ExerciseObject, MuscleGroup, MuscleGroupData } from "../types";
import { useLocalStorageRead } from "../hooks/useLocalStorageRead";

interface PieChartProps {
  // Sets
  // Muscle groups
}

const PieChart: React.FC<PieChartProps> = ({}) => {
  const exerciseData = useLocalStorageRead("Monday");
  const [muscleGroupData, setMuscleGroupData] = useState<ExerciseObject[]>(exerciseData);

  for (const exercise of exerciseData) {
    console.log(exercise);

    if (exercise.type === "Back") {
      const strength: MuscleGroupData = {
        muscleGroup: exercise.muscle as MuscleGroup,
        sets: exercise.sets.length,
        color: "red",
      };
      setMuscleGroupData([
        ...muscleGroupData,
        { muscleGroup: exercise.muscle, sets: exercise.sets.length, color: "red" },
      ]);
    }
  }

  console.log(exerciseData);
  // Grab the element, the same as doing document.getElementById("canvas")
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasContext = canvas.getContext("2d");
    let total: number = 0; // Sum of sets
    let angle: number = 0; // Where

    for (let value of muscleGroupData) {
      total += value.sets;
    }

    for (let i = 0; i < muscleGroupData.length; i++) {
      canvasContext.fillStyle = muscleGroupData[i].color;

      // Start drawing
      canvasContext.beginPath();

      // Move to the center of the canvas
      canvasContext.moveTo(50, 50);

      // Starting from the center of the canvas, add an arc with a radius of 50 from a start angle of 0 to an angle influenced by the amount of sets
      canvasContext.arc(50, 50, 50, angle, angle + Math.PI * 2 * (muscleGroupData[i].sets / total));

      // Fill the arc
      canvasContext.fill();

      // Add the end angle to the angle, thus making the next arc's start angle equal to the current arc's end angle
      angle += Math.PI * 2 * (muscleGroupData[i].sets / total);
    }
  });

  return (
    <div className="PieChart">
      <canvas ref={canvasRef} width={100} height={100}></canvas>
      {muscleGroupData
        ? muscleGroupData.map((data, index) => {
            return (
              <p key={index}>
                {data.muscleGroup} <div style={{ backgroundColor: data.color }}></div>
              </p>
            );
          })
        : null}
    </div>
  );
};

export default PieChart;
