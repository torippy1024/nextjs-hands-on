import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import {Radar} from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

type FeatureRadarType = {
  acousticness: number;
  danceability: number;
  energy: number;
  liveness: number;
  speechiness: number;
  valence: number;
};

const FeatureRadar = (props: FeatureRadarType) => {
  return (
    <Radar
      data={{
        labels: [
          'acousticness',
          'danceability',
          'energy',
          'liveness',
          'speechiness',
          'valence',
        ],
        datasets: [
          {
            label: 'Audio Feature',
            data: [
              props.acousticness,
              props.danceability,
              props.energy,
              props.liveness,
              props.speechiness,
              props.valence,
            ],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      }}
      options={{
        scales: {
          r: {
            max: 1,
            min: 0,
          },
        },
      }}
    />
  );
};

export default FeatureRadar;
