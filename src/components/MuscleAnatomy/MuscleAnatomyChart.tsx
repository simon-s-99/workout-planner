import { Weekday } from "../../types";
import FullBody from "./FullBody";

interface MuscleAnatomyChartProps {
    weekday: Weekday;
}

const MuscleAnatomyChart: React.FC<MuscleAnatomyChartProps> = ({ weekday }) => {
    return (
        <div>
            <FullBody fill={false} />
        </div>
    )
}

export default MuscleAnatomyChart;