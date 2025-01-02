import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common/ui/select';
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const deviceData = [
  { name: 'Desktop', value: 53.6 },
  { name: 'Mobile', value: 45.3 },
  { name: 'Tablet', value: 1.1 },
];

const positionData = [
  { range: '1-3', value: 4000 },
  { range: '4-10', value: 3000 },
  { range: '11-20', value: 2000 },
  { range: '21-40', value: 1000 },
  { range: '41-60', value: 2000 },
  { range: '61-80', value: 3000 },
  { range: '81-100', value: 7000 },
];

const clickThroughData = Array.from({ length: 20 }, (_, i) => ({
  day: i + 1,
  rate: Math.max(5, 30 * Math.exp(-i/5) + Math.random() * 5)
}));

const ChartSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Device Distribution */}
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-base font-medium">Device Distribution</CardTitle>
          <Select defaultValue="all">
            <SelectTrigger className="w-24 h-8">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={deviceData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#080909"
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 text-sm mt-4">
            {deviceData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-900" />
                <span className="text-gray-600">{entry.name}</span>
                <span className="font-medium">{entry.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Position Distribution */}
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-base font-medium">Position Distribution</CardTitle>
          <Select defaultValue="all">
            <SelectTrigger className="w-24 h-8">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={positionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis 
                dataKey="range" 
                fontSize={12}
                tick={{ fill: '#666' }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                fontSize={12}
                tick={{ fill: '#666' }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <Bar 
                dataKey="value" 
                fill="#080909"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Click Through Rate */}
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-base font-medium">Click Through Rate</CardTitle>
          <Select defaultValue="all">
            <SelectTrigger className="w-24 h-8">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={clickThroughData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis 
                dataKey="day" 
                fontSize={12}
                tick={{ fill: '#666' }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                fontSize={12}
                tick={{ fill: '#666' }}
                axisLine={{ stroke: '#e5e7eb' }}
                tickFormatter={(value) => `${value}%`}
              />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#080909"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartSection;