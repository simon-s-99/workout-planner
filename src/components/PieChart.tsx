import { useEffect, useRef, useState } from "react";
import type { Color, ExerciseObject, MuscleGroup, MuscleGroupData } from "../types";

interface PieChartProps {
  exerciseData: ExerciseObject[];
  getExerciseData: () => void;
}
const PieChart: React.FC<PieChartProps> = ({exerciseData, getExerciseData}) => {

  const colors: Color[] = [
    "red",
    "green",
    "blue",
    "yellow",
    "purple",
    "cyan",
    "magenta",
    "orange",
    "pink",
    "brown",
    "gray",
    "black",
    "white",
    "teal",
    "lime",
    "aquamarine",
  ];

  const [muscleGroupData, setMuscleGroupData] = useState<MuscleGroupData[]>([]);
  const [totalSets, setTotalSets] = useState<number>(0);

  useEffect(() => {
    let dataArr: MuscleGroupData[] = [];
    let colorCounter: number = 0; // <-- Keeps track of which color to assign each exercise

    for (const exercise of exerciseData) {
      // If muscle group is not already present
      if (dataArr.filter((m) => m.muscleGroup === (exercise.muscle as MuscleGroup)).length === 0) {
        let newExerciseData: MuscleGroupData = {
          muscleGroup: exercise.muscle as MuscleGroup,
          sets: exercise.sets.length,
          color: colors[colorCounter],
        };
        dataArr.push(newExerciseData);
        colorCounter++;
      } else {
        // Gets the muscle group if it already exists
        const duplicateMuscleGroup = dataArr.find((muscle) => muscle.muscleGroup === exercise.muscle);

        // To resolve TypeScript undefined error
        if (duplicateMuscleGroup) {
          // Add muscle group's sets to the total amount of sets
          duplicateMuscleGroup.sets += exercise.sets.length;
        }
      }
    }
    setMuscleGroupData(dataArr);
  }, [exerciseData]);

  // Ugly solution: does exactly the same thing as the useEffect above, but only runs once
  // Its purpose is to display the graph when the user first loads the app
  useEffect(() => {
    getExerciseData();
    let dataArr: MuscleGroupData[] = [];
    let colorCounter: number = 0;

    if (!exerciseData) {
      return;
    }

    for (const exercise of exerciseData) {
      // If muscle group is not already present
      if (dataArr.filter((m) => m.muscleGroup === (exercise.muscle as MuscleGroup)).length === 0) {
        let newExerciseData: MuscleGroupData = {
          muscleGroup: exercise.muscle as MuscleGroup,
          sets: exercise.sets.length,
          color: colors[colorCounter],
        };
        dataArr.push(newExerciseData);
        colorCounter++;
      } else {
        // Gets the muscle group if it already exists
        const duplicateMuscleGroup = dataArr.find((muscle) => muscle.muscleGroup === exercise.muscle);

        // To resolve TypeScript undefined error
        if (duplicateMuscleGroup) {
          // Add muscle group's sets to the total amount of sets
          duplicateMuscleGroup.sets += exercise.sets.length;
        }
      }
    }
    setMuscleGroupData(dataArr);
  }, []);

  // Grab the element in the DOM, the same as doing document.getElementById("canvas")
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    // Below error is caused by TypeScript, we know for a fact that canvas will not be null
    // @ts-ignore: canvas is possibly 'null'.
    const canvasContext: CanvasRenderingContext2D = canvas.getContext("2d");
    let total: number = 0; // Sum of sets
    let angle: number = 0; // Current angle used when drawing an arc

    for (let value of muscleGroupData) {
      total += value.sets;
    }

    for (let i = 0; i < muscleGroupData.length; i++) {
      // Set the color
      canvasContext.fillStyle = muscleGroupData[i].color;

      // Start drawing
      canvasContext.beginPath();

      // Move to the center of the canvas
      canvasContext.moveTo(150, 150);

      // Starting from the center of the canvas, add an arc with a radius of 150 from a start angle of 0 to an angle influenced by the amount of sets
      canvasContext.arc(150, 150, 150, angle, angle + Math.PI * 2 * (muscleGroupData[i].sets / total));

      // Fill the arc
      canvasContext.fill();

      // Add the end angle to the angle, thus making the next arc's start angle equal to the current arc's end angle
      angle += Math.PI * 2 * (muscleGroupData[i].sets / total);
    }
    // To calculate percentages
    setTotalSets(total);
  });

  return (
    <div className="PieChart">
      <canvas ref={canvasRef} width={300} height={300}></canvas>
      {muscleGroupData.map((data, index) => {
        return (
          <p key={index}>
            <span
              style={{
                backgroundColor: data.color,
                height: "20px",
                width: "20px",
                display: "inline-block",
                borderRadius: "25px",
              }}></span>
              {/* Get the individual exercise's percentage, rounded down */}
            {Math.floor(Math.round((data.sets / totalSets) * 100))}% -{" "}
            {/* Make the first character uppercase, remove the underline found in some exercises */}
            {data.muscleGroup.charAt(0).toUpperCase() + data.muscleGroup.slice(1).replace("_", " ")}, {data.sets}{" "}
            {data.sets === 1 ? "set" : "sets"}
          </p>
        );
      })}
    </div>
  );
};

export default PieChart;
