export interface MetricCardProps {
    title: string;
    value: string | number;
    change: {
      value: number;
      timeframe: string;
      trend: 'up' | 'down';
    };
    chartData: {
      labels: string[];
      values: number[];
    };
    chartType: 'bar' | 'line' | 'area';
    chartColor: string;
    icon?: React.ReactNode;
  }
  
  