import { useMemo } from 'react';

interface RadarChartProps {
  data: Array<{
    name: string;
    value: number;
    max: number;
  }>;
  width?: number;
  height?: number;
}

export function RadarChart({ data, width = 400, height = 400 }: RadarChartProps) {
  const center = { x: width / 2, y: height / 2 };
  const radius = Math.min(width, height) / 2 - 40;
  const levels = 5;
  const angleSlice = (Math.PI * 2) / data.length;

  const points = useMemo(() => {
    return data.map((item, index) => {
      const angle = angleSlice * index - Math.PI / 2;
      const percentage = (item.value / item.max) * 100;
      const r = (radius * percentage) / 100;
      return {
        x: center.x + r * Math.cos(angle),
        y: center.y + r * Math.sin(angle),
        angle,
        percentage
      };
    });
  }, [data, angleSlice, radius]);

  const gridPoints = useMemo(() => {
    const grids = [];
    for (let level = 1; level <= levels; level++) {
      const levelRadius = (radius / levels) * level;
      const levelPoints = data.map((_, index) => {
        const angle = angleSlice * index - Math.PI / 2;
        return {
          x: center.x + levelRadius * Math.cos(angle),
          y: center.y + levelRadius * Math.sin(angle)
        };
      });
      grids.push(levelPoints);
    }
    return grids;
  }, [data.length, angleSlice, radius]);

  const axisLines = useMemo(() => {
    return data.map((_, index) => {
      const angle = angleSlice * index - Math.PI / 2;
      return {
        x2: center.x + radius * Math.cos(angle),
        y2: center.y + radius * Math.sin(angle),
        angle
      };
    });
  }, [data.length, angleSlice, radius]);

  const polygonPath = useMemo(() => {
    const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    return pathData + ' Z';
  }, [points]);

  return (
    <svg width={width} height={height} className="mx-auto">
      {/* Grid circles */}
      {gridPoints.map((levelPoints, levelIndex) => {
        const pathData = levelPoints
          .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
          .join(' ');
        return (
          <path
            key={`grid-${levelIndex}`}
            d={pathData + ' Z'}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        );
      })}

      {/* Axis lines */}
      {axisLines.map((axis, index) => (
        <line
          key={`axis-${index}`}
          x1={center.x}
          y1={center.y}
          x2={axis.x2}
          y2={axis.y2}
          stroke="#d1d5db"
          strokeWidth="1"
        />
      ))}

      {/* Data polygon */}
      <path d={polygonPath} fill="#1e40af" fillOpacity="0.2" stroke="#1e40af" strokeWidth="2" />

      {/* Data points */}
      {points.map((point, index) => (
        <circle
          key={`point-${index}`}
          cx={point.x}
          cy={point.y}
          r="5"
          fill="#1e40af"
          stroke="white"
          strokeWidth="2"
        />
      ))}

      {/* Labels */}
      {points.map((point, index) => {
        const labelDistance = radius + 30;
        const labelX = center.x + labelDistance * Math.cos(point.angle);
        const labelY = center.y + labelDistance * Math.sin(point.angle);
        return (
          <g key={`label-${index}`}>
            <text
              x={labelX}
              y={labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs font-medium fill-gray-700"
            >
              {data[index].name}
            </text>
            <text
              x={labelX}
              y={labelY + 14}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs fill-gray-500"
            >
              {point.percentage.toFixed(0)}%
            </text>
          </g>
        );
      })}

      {/* Level labels */}
      {Array.from({ length: levels }).map((_, levelIndex) => {
        const levelRadius = (radius / levels) * (levelIndex + 1);
        const labelX = center.x + levelRadius;
        const labelY = center.y - 5;
        return (
          <text
            key={`level-${levelIndex}`}
            x={labelX}
            y={labelY}
            className="text-xs fill-gray-400"
            textAnchor="start"
          >
            {Math.round(((levelIndex + 1) / levels) * 100)}%
          </text>
        );
      })}
    </svg>
  );
}
