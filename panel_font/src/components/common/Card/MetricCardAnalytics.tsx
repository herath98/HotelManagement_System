import { ArrowDown, ArrowUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export default function   MetricCard({ title, value, change, trend }: {
    title: string
    value: string
    change: number
    trend: 'up' | 'down'
  }) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3">
          <div className="text-3xl font-bold">{value}</div>
          <div className={`flex items-center rounded-md bg-light-gray h-[20px] px-2 mt-3  text-[12px] ${
            trend === 'up' ? 'text-green-600' : 'text-dark-gray'
          }`}>
            {trend === 'up' ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
            <span>{Math.abs(change)}%</span>
          </div>
        </CardContent>
      </Card>
    )
  }