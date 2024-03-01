import { useEffect, useRef } from "react";

interface PieChartProps {
  // Sets
  // Muscle groups
}

const PieChart: React.FC<PieChartProps> = ({}) => {
  const map = new Map<string, number>();
  // Test values
  map.set("legs", 4);
  map.set("arms", 7);
  map.set("chest", 5);

  // Grab the element, the same as doing document.getElementById("canvas")
  const canvasRef = useRef(null);
  const colors = ["yellow", "blue", "pink"];
  const values = Array.from(map);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasContext = canvas.getContext("2d");
    let total: number = 0;
    let end = 0;

    for (let value of map.values()) {
      total += value;
    }

    for (let i = 0; i < map.size; i++) {
      canvasContext.fillStyle = colors[i];
      canvasContext.beginPath();
      canvasContext.moveTo(100 / 2, 100 / 2);
      canvasContext.arc(
        100 / 2,
        100 / 2,
        100 / 2,
        end,
        end + Math.PI * 2 * (values[i][1] / total),
        false
      );
      canvasContext.lineTo(100 / 2, 100 / 2);
      canvasContext.fill();
      end += Math.PI * 2 * (values[i][1] / total);
    }
  });

  return (
    <div className="PieChart">
      <canvas ref={canvasRef} width={100} height={100}></canvas>
      {values.map((value, index) => {
        return <div key={index}>{value[1]}</div>;
      })}

      {colors.map((color, index) => {
        return (
            <div key={index}>{color}</div>
        )
      })}
    </div>
  );
};

export default PieChart;
