

import MetricCardAnalytics from "@/components/common/Card/MetricCardAnalytics"
import { ClickThroughRateChart, DeviceDistributionChart, PositionDistributionChart } from "@/components/common/ChartCard/ChartCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/common/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/common/ui/table"
import { ExternalLink } from 'lucide-react'


// Common Types
interface SelectOption {
    label: string;
    value: string;
  }
  

  
  // Device Distribution Types
  interface DeviceData {
    name: string;
    value: number;
  }
  

  
  // Position Distribution Types
  interface PositionData {
    position: string;
    value: number;
  }
  

  
  // Click Through Rate Types
  interface RateData {
    day: string;
    rate: number;
  }


const deviceData: DeviceData[] = [
    { name: 'Mobile', value: 45.3 },
    { name: 'Tablet', value: 1.1 },
    { name: 'Desktop', value: 53.6 }
  ];

  const positionData: PositionData[] = [
    { position: '1-3', value: 4500 },
    { position: '4-10', value: 2500 },
    { position: '11-20', value: 1500 },
    { position: '21-40', value: 800 },
    { position: '41-60', value: 2000 },
    { position: '61-80', value: 3200 },
    { position: '81-100', value: 7000 }
  ];

  const clickThroughData: RateData[] = [
    { day: '1', rate: 20 },
    { day: '4', rate: 28 },
    { day: '7', rate: 15 },
    { day: '10', rate: 15 },
    { day: '13', rate: 8 },
    { day: '16', rate: 5 },
    { day: '20', rate: 4 }
  ];

  const chartOptions: SelectOption[] = [
    { label: 'All', value: 'all' },
    { label: 'Today', value: 'today' },
    { label: 'Week', value: 'week' }
  ];

  const COLORS = ['#1f2937', '#4b5563', '#9ca3af'];




export default function AnalyticsDashboard() {
  return (
    <div className="p-4 space-y-6 ">
        <div>
            <Card className="h-24 px-4 flex items-center" >
                <div>  <h2 className="text-[22px]   items-center text-dark-gray">Analytics Dashboard</h2>
                <p>stay updated <span className="bg-light-gray px-2 py-1 text-[12px] rounded ml-1">last update 5 min. ago</span></p></div>
              
                </Card>
            
        </div>
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
          { title: "Traffic", value: "23,351", change: -1.97, trend: "down" as "down" | "up" },
          { title: "Impressions", value: "411,712", change: -25.07, trend: "down" as "down" | "up" },
          { title: "Avg. Position", value: "26.03", change: 0.51, trend: "up" as "down" | "up" },
          { title: "CTR", value: "5.42%", change: 0.04, trend: "up" as "down" | "up" },
        ].map((metric) => (
          <MetricCardAnalytics
            key={metric.title}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            trend={metric.trend}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
      <DeviceDistributionChart
        title="Device Distribution"
        data={deviceData}
        colors={COLORS}
        options={chartOptions}
        onOptionChange={(value) => console.log('Device filter:', value)}
      />
      <PositionDistributionChart
        title="Position Distribution"
        data={positionData}
        options={chartOptions}
        onOptionChange={(value) => console.log('Position filter:', value)}
        className=""
      />
      <ClickThroughRateChart
        title="Click Through Rate"
        data={clickThroughData}
        options={chartOptions}
        onOptionChange={(value) => console.log('CTR filter:', value)}
      />
    </div>
   

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* New Pages */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium">New Pages</CardTitle>
            <Select defaultValue="pages">
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Pages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pages">Pages</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page URL</TableHead>
                  <TableHead className="text-right">Impressions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="flex items-center gap-2">
                    /platform/plan-content
                    <ExternalLink className="h-4 w-4 text-gray-500" />
                  </TableCell>
                  <TableCell className="text-right">697</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2">
                    /platform/generate-content-brief
                    <ExternalLink className="h-4 w-4 text-gray-500" />
                  </TableCell>
                  <TableCell className="text-right">358</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Lost Pages */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium">Lost Pages</CardTitle>
            <Select defaultValue="pages">
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Pages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pages">Pages</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page URL</TableHead>
                  <TableHead className="text-right">Impressions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="flex items-center gap-2">
                    /solutions/seo-content-strategist
                    <ExternalLink className="h-4 w-4 text-gray-500" />
                  </TableCell>
                  <TableCell className="text-right">274</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2">
                    /platform/content-creators
                    <ExternalLink className="h-4 w-4 text-gray-500" />
                  </TableCell>
                  <TableCell className="text-right">214</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


