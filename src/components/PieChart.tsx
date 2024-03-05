import { useEffect, useRef, useState } from "react";
import type { Color, ExerciseObject, MuscleGroup, MuscleGroupData, Weekday, WeekdayExerciseMap } from "../types";
import { useLocalStorageRead } from "../hooks/useLocalStorageRead";
import { useLocalStorageWrite } from "../hooks/useLocalStorageWrite";

const PieChart: React.FC = () => {
  const styles = {
    canvas: {
      width: "300px",
      height: "300px",
    },
  };

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
  const [colorCounter, setColorCounter] = useState<number>(0);

  function getExerciseData(): ExerciseObject[] {
    const mondayData = useLocalStorageRead("Monday");
    const tuesdayData = useLocalStorageRead("Tuesday");
    const wednesdayData = useLocalStorageRead("Wednesday");
    const thursdayData = useLocalStorageRead("Thursday");
    const fridayData = useLocalStorageRead("Friday");
    const saturdayData = useLocalStorageRead("Saturday");
    const sundayData = useLocalStorageRead("Sunday");

    // Combine all arrays into one
    const exerciseData = mondayData
      .concat(tuesdayData)
      .concat(wednesdayData)
      .concat(thursdayData)
      .concat(fridayData)
      .concat(saturdayData)
      .concat(sundayData);
    return exerciseData;
  }

  useEffect(() => {
    const exerciseData = getExerciseData();
    for (const exercise of exerciseData) {
      // If muscle group is not already present
      if (muscleGroupData.filter((m) => m.muscleGroup === (exercise.muscle as MuscleGroup)).length === 0) {
        let data: MuscleGroupData = {
          muscleGroup: exercise.muscle as MuscleGroup,
          sets: exercise.sets.length,
          color: colors[colorCounter],
        };
        setMuscleGroupData([...muscleGroupData, data]);
        setColorCounter(colorCounter + 1);
      } else {
        const duplicateMuscleGroup = muscleGroupData.find((muscle) => muscle.muscleGroup === exercise.muscle);
        if (duplicateMuscleGroup) {
          // Add muscle group's sets to the total amount of sets
          duplicateMuscleGroup.sets += exercise.sets.length;
        }
      }
    }
  }, [muscleGroupData, colorCounter]);

  console.log(muscleGroupData);

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
      <canvas ref={canvasRef} style={styles.canvas} width={100} height={100}></canvas>
      {muscleGroupData
        ? muscleGroupData.map((data, index) => {
            return (
              <p key={index}>
                {data.muscleGroup} {data.sets}
                <div
                  style={{
                    backgroundColor: data.color,
                    height: "20px",
                    width: "20px",
                    display: "inline-block",
                    borderRadius: "25px",
                  }}></div>
              </p>
            );
          })
        : null}
    </div>
  );
};

export default PieChart;
