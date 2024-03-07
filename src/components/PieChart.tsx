import { useEffect, useRef, useState } from "react";
import type { Color, ExerciseObject, MuscleGroup, MuscleGroupData } from "../types";
import { useLocalStorageRead } from "../hooks/useLocalStorageRead";

const PieChart: React.FC = () => {
  const styles = {
    canvas: {},
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
  const [totalSets, setTotalSets] = useState<number>(0);
  const [data, setData] = useState<ExerciseObject[] | null>(null);

  function getExerciseData() {
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
    console.log(data?.length, exerciseData.length)
    if (exerciseData.length !== data?.length) {
      setData(exerciseData);
    }
  }

  useEffect(() => {
    getExerciseData();
    let dataArr: MuscleGroupData[] = [];
    let colorCounter: number = 0;

    if (!data) {
      return;
    }
    for (const exercise of data) {
      // If muscle group is not already present
      if (dataArr.filter((m) => m.muscleGroup === (exercise.muscle as MuscleGroup)).length === 0) {
        let dataa: MuscleGroupData = {
          muscleGroup: exercise.muscle as MuscleGroup,
          sets: exercise.sets.length,
          color: colors[colorCounter],
        };
        dataArr.push(dataa);
        colorCounter++;
      } else {
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

  // Grab the element, the same as doing document.getElementById("canvas")
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    const canvasContext = canvas.getContext("2d");
    let total: number = 0; // Sum of sets
    let angle: number = 0;

    for (let value of muscleGroupData) {
      total += value.sets;
    }

    for (let i = 0; i < muscleGroupData.length; i++) {
      canvasContext.fillStyle = muscleGroupData[i].color;

      // Start drawing
      canvasContext.beginPath();

      // Move to the center of the canvas
      canvasContext.moveTo(150, 150);

      // Starting from the center of the canvas, add an arc with a radius of 50 from a start angle of 0 to an angle influenced by the amount of sets
      canvasContext.arc(150, 150, 150, angle, angle + Math.PI * 2 * (muscleGroupData[i].sets / total));

      // Fill the arc
      canvasContext.fill();

      // Add the end angle to the angle, thus making the next arc's start angle equal to the current arc's end angle
      angle += Math.PI * 2 * (muscleGroupData[i].sets / total);
    }
    setTotalSets(total);
  });

  return (
    <div className="PieChart">
      <canvas ref={canvasRef} style={styles.canvas} width={300} height={300}></canvas>
      {muscleGroupData.map((data, index) => {
        return (
          <p key={index}>
            <div
              style={{
                backgroundColor: data.color,
                height: "20px",
                width: "20px",
                display: "inline-block",
                borderRadius: "25px",
              }}></div>
            {Math.round((data.sets / totalSets) * 100)}% -{" "}
            {data.muscleGroup.charAt(0).toUpperCase() + data.muscleGroup.slice(1)}, {data.sets}{" "}
            {data.sets === 1 ? "set" : "sets"}
          </p>
        );
      })}
    </div>
  );
};

export default PieChart;
