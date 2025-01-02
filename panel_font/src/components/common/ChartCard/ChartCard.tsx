import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/common/ui/select";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,AreaChart, ResponsiveContainer, Tooltip,Area } from 'recharts';

// Common Types
interface SelectOption {
  label: string;
  value: string;
}

interface ChartCardProps {
  title: string;
  options?: SelectOption[];
  onOptionChange?: (value: string) => void;
  className?: string;
}

// Device Distribution Types
interface DeviceData {
  name: string;
  value: number;
}

interface DonutChartProps extends ChartCardProps {
  data: DeviceData[];
  colors: string[];
  showLegend?: boolean;
}

// Position Distribution Types
interface PositionData {
  position: string;
  value: number;
}

interface BarChartProps extends ChartCardProps {
  data: PositionData[];
  barColor?: string;
}

// Click Through Rate Types
interface RateData {
  day: string;
  rate: number;
}

interface LineChartProps extends ChartCardProps {
  data: RateData[];
  lineColor?: string;
}

// Reusable Chart Card Wrapper
const ChartCard: React.FC<ChartCardProps & { children: React.ReactNode }> = ({
  title,
  options,
  onOptionChange,
  children,
  className
}) => (
  <Card className={className}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {options && (
        <Select defaultValue={options[0].value} onValueChange={onOptionChange}>
          <SelectTrigger className="w-20 h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </CardHeader>
    <CardContent className='mx-auto w-full '>
    <div className="h-[250px] w-full">
        {children}
        </div>
        </CardContent>
  </Card>
);

// Donut Chart Component
export const DeviceDistributionChart: React.FC<DonutChartProps> = ({
  data,
  colors,
  showLegend = true,
  ...chartCardProps
}) => (
  <ChartCard {...chartCardProps}>
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
    {showLegend && (
      <div className="flex justify-center gap-4 text-[12px] mt-4">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-1">
            <div 
              className="w-3 h-3" 
              style={{ backgroundColor: colors[index % colors.length] }} 
            />
            <span>{entry.name}</span>
            <span className="font-medium">{entry.value}%</span>
          </div>
        ))}
      </div>
    )}
  </ChartCard>
);

// Bar Chart Component
export const PositionDistributionChart: React.FC<BarChartProps> = ({
  data,
  barColor = '#1f2937',
  ...chartCardProps
}) => (
  <ChartCard {...chartCardProps}>
    <ResponsiveContainer  width="100%" height="100%">
      <BarChart data={data} margin={{ top: 0, right: 0, left: -35, bottom: 0 }}>
        <XAxis dataKey="position" fontSize={12} tickLine={false} />
        <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}K`} />
        <Bar dataKey="value" fill={barColor} radius={8} background={{ fill: '#eee', radius:8 }}/>
        <Tooltip />
      </BarChart>
    </ResponsiveContainer>
  </ChartCard>
);

// Line Chart Component
export const ClickThroughRateChart: React.FC<LineChartProps> = ({
  data,
  lineColor = '#1f2937',
  ...chartCardProps
}) => (
    <ChartCard {...chartCardProps}>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
        <XAxis dataKey="day" fontSize={12} />
        <YAxis fontSize={12}  tickFormatter={(rate)=>`${rate}%`}/>
        <Area 
          type="monotone" 
          dataKey="rate" 
          stroke={lineColor} 
          strokeWidth={2}
          fill="url(#colorUv)"
          fillOpacity={1}
        />
        <Tooltip />
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={lineColor} stopOpacity={0.3}/>
            <stop offset="85%" stopColor={lineColor} stopOpacity={0.05}/>
          </linearGradient>
        </defs>
      </AreaChart>
    </ResponsiveContainer>
  </ChartCard>
);

export default ChartCard;