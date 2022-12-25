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

const backgroundAlpha = 0.2;
const borderAlpha = 1;
const mainColorValue = 255;
const subColorValue = 50;

export const FeatureRadarColor = {
  DEFAULT: {
    backgroundColor: `rgba(${mainColorValue}, ${subColorValue}, ${subColorValue}, ${backgroundAlpha})`,
    borderColor: `rgba(${mainColorValue}, ${subColorValue}, ${subColorValue}, ${borderAlpha})`,
  },
  RED: {
    backgroundColor: `rgba(${mainColorValue}, ${subColorValue}, ${subColorValue}, ${backgroundAlpha})`,
    borderColor: `rgba(${mainColorValue}, ${subColorValue}, ${subColorValue}, ${borderAlpha})`,
  },
  GREEN: {
    backgroundColor: `rgba(${subColorValue}, ${mainColorValue}, ${subColorValue}, ${backgroundAlpha})`,
    borderColor: `rgba(${subColorValue}, ${mainColorValue}, ${subColorValue}, ${borderAlpha})`,
  },
  BLUE: {
    backgroundColor: `rgba(${subColorValue}, ${subColorValue}, ${mainColorValue}, ${backgroundAlpha})`,
    borderColor: `rgba(${subColorValue}, ${subColorValue}, ${mainColorValue}, ${borderAlpha})`,
  },
};

export type FeatureRadarColorType = {
  [key: string]: {
    backgroundColor: string;
    borderColor: string;
  };
};

type FeatureRadarType = {
  datasets: {
    label?: string;
    data: {
      acousticness: number;
      danceability: number;
      energy: number;
      liveness: number;
      tempo: number;
      valence: number;
    };
    color?: {
      backgroundColor: string;
      borderColor: string;
    };
    borderWidth?: number;
  }[];
};

const FeatureRadar = ({datasets}: FeatureRadarType) => {
  return (
    <Radar
      data={{
        labels: [
          'アコースティック感',
          'ダンス感',
          'エナジー',
          'ライブ感',
          'BPM',
          '明るさ',
        ],
        datasets: datasets.map((dataset) => {
          return {
            label: dataset.label ?? 'Audio Feature',
            data: [
              dataset.data.acousticness,
              dataset.data.danceability,
              dataset.data.energy,
              dataset.data.liveness,
              (dataset.data.tempo - 50) / 150,
              dataset.data.valence,
            ],
            backgroundColor:
              dataset.color?.backgroundColor ??
              FeatureRadarColor.DEFAULT.backgroundColor,
            borderColor:
              dataset.color?.borderColor ??
              FeatureRadarColor.DEFAULT.borderColor,
            borderWidth: dataset.borderWidth ?? 1,
          };
        }),
      }}
      options={{
        scales: {
          r: {
            max: 1,
            min: 0,
            pointLabels: {
              font: {
                size: 20,
              },
            },
            ticks: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              font: {
                size: 15,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.dataset.label || '';
                const value =
                  context.label === 'BPM'
                    ? Math.round(context.parsed.r * 150 + 50)
                    : Math.round(context.parsed.r * 100) / 100;
                return `${label}: ${value}`;
              },
            },
          },
        },
      }}
    />
  );
};

export default FeatureRadar;
