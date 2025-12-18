interface HeatmapChartProps {
  data: Array<{
    category: string;
    value: number;
    max: number;
  }>;
}

export function HeatmapChart({ data }: HeatmapChartProps) {
  const getColor = (percentage: number) => {
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    if (percentage >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getTextColor = (percentage: number) => {
    if (percentage >= 50) return 'text-white';
    return 'text-white';
  };

  return (
    <div className="space-y-4">
      {data.map((item, index) => {
        const percentage = (item.value / item.max) * 100;
        return (
          <div key={index}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-foreground">{item.category}</span>
              <span className="text-sm font-semibold text-primary">{percentage.toFixed(0)}%</span>
            </div>
            <div className="relative h-8 bg-gray-200 rounded-lg overflow-hidden">
              <div
                className={`h-full ${getColor(percentage)} transition-all duration-500 flex items-center justify-end pr-3`}
                style={{ width: `${percentage}%` }}
              >
                {percentage > 10 && (
                  <span className={`text-xs font-semibold ${getTextColor(percentage)}`}>
                    {percentage.toFixed(0)}%
                  </span>
                )}
              </div>
              {percentage <= 10 && (
                <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-600">
                  {percentage.toFixed(0)}%
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
