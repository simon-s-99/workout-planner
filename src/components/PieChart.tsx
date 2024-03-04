import { useEffect, useRef, useState } from "react";
import type { Color, MuscleGroup, MuscleGroupData } from "../types";
import { useLocalStorageRead } from "../hooks/useLocalStorageRead";

const PieChart: React.FC = () => {
  const muscleGroups: MuscleGroup[] = [
    "Abdominals",
    "Biceps",
    "Triceps",
    "Forearms",
    "Chest",
    "Lats",
    "Traps",
    "Lower_back",
    "Middle_back",
    "Glutes",
    "Back",
    "Hamstrings",
    "Quadriceps",
    "Abductors",
    "Adductors",
    "Calves",
  ];

  const exerciseData = useLocalStorageRead("Monday");
  const [muscleGroupData, setMuscleGroupData] = useState<MuscleGroupData[]>([]);

  useEffect(() => {
    for (const exercise of exerciseData) {
      if (muscleGroups.includes(exercise.muscle as MuscleGroup)) {
        if (muscleGroupData.filter((m) => m.muscleGroup === exercise.muscle).length === 0) {
          const data: MuscleGroupData = {
            muscleGroup: exercise.muscle as MuscleGroup,
            sets: exercise.sets.length,
            color: "red" as Color,
          };
          setMuscleGroupData([...muscleGroupData, data]);
        } else {
          const duplicateMuscleGroup = muscleGroupData.find((muscle) => muscle.muscleGroup === exercise.muscle);
          if (duplicateMuscleGroup) {
            duplicateMuscleGroup.sets += exercise.sets.length;
          }
        }
      }
    }
  }, []);
  
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
