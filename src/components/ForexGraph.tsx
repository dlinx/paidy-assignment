import { Paper, styled } from "@material-ui/core"
import { ForexTick } from "../services/usePriceTick"
import 'chartjs-adapter-moment';

import { Filler, TimeSeriesScale, TimeScale, LineElement, PointElement, CategoryScale, LinearScale, Chart as ChartJS, } from "chart.js";
import { Line } from 'react-chartjs-2';

ChartJS.register([Filler, TimeSeriesScale, TimeScale, CategoryScale, LinearScale, PointElement, LineElement]);

type Props = {
  chartData: ForexTick[]
}
const GraphContainer = styled(Paper)({
  backgroundColor: '#3b8cff',
  width: '100%',
  padding: '10px'
})

export const ForexGraph: React.FC<Props> = ({ chartData }) => {
  if (!chartData) {
    return <div></div>
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${chartData[0].from}/${chartData[0].to}`,
      },
    },
    scales: {
      yAxis: {
        min: 0
      },
      xAxis: {
        type: 'time' as const,
        time: {
          minUnit: 'second' as const,
        },
        minTicksLimit: 10
      },
    },
    maintainAspectRatio: false
  };

  const xData = chartData.map(cd => cd ? cd.price : 0);
  const data = {
    labels: chartData.map((cd, i) => cd.time_stamp),
    datasets: [
      {
        label: 'Time',
        data: xData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        fill: true,
        pointRadius: 0
      },
    ],
  };

  return <GraphContainer square>
    <Line
      data={data}
      options={options}
      style={{ background: '#FFF' }}
    />
  </GraphContainer>
}