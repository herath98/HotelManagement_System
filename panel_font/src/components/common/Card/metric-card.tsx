import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  ResponsiveContainer,
//   XAxis,
//   YAxis,
//   Tooltip
} from 'recharts';
import { Card } from '../ui/card';

interface MetricCardProps {
  title: string;
  value: string | number;
  changePercentage: number;
  changeTimeframe: string;
  data: Array<{ date: string; value: number }>;
  chartType: 'line' | 'bar' | 'area';
  chartColor: string;
  icon?: React.ReactNode;
}

const MetricCard = ({
  title,
  value,
  changePercentage,
  changeTimeframe,
  data,
  chartType,
  chartColor,
  icon
}: MetricCardProps) => {
  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 0, right: 0, left: 0, bottom: 0 }
    };

    switch (chartType) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={chartColor}
              fill={`url(#gradient-${title})`}
              strokeWidth={2}
            />
          </AreaChart>
        );
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <Bar
              dataKey="value"
              fill={chartColor}
              opacity={0.8}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        );
      case 'line':
        return (
          <LineChart {...commonProps}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={chartColor}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        );
      default:
        return <></>;
    }
  };

  return (
    <Card className="p-6 border-[0.5px] border-gray">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600 font-medium flex items-center gap-2">
          {title}
       
        </span>
        <div>   {icon && <span className="text-gray-400">{icon}</span>}</div>
      </div>
      
      <div className="mb-4">
        <div className="text-2xl font-bold text-gray-900">
          {value}
        </div>
        <div className="flex items-center mt-1">
          <span 
            className={`text-sm font-medium ${
              changePercentage >= 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {changePercentage >= 0 ? '↑' : '↓'} {Math.abs(changePercentage)}%
          </span>
          <span className="text-gray-500 text-sm ml-1">
            {changeTimeframe}
          </span>
        </div>
      </div>

      <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
export default MetricCard;