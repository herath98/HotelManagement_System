import {
  User,
  TrendingUp,
  ArrowDownLeft,
  Activity,
} from "lucide-react";
import MetricCard from "../components/common/Card/metric-card";
import { SimpleTable } from "@/components/common/Tables/SimpleTable";
import { CheckboxTable } from "@/components/common/Tables/CheckboxTable";
import { columns, data } from "@/components/common/Tables/table-data";
// import { CustomForm } from "./CustomForm";

export const Dashboard = () => {
    const generateDummyData = (count: number) => {
      return Array.from({ length: count }, (_, i) => ({
        date: `Day ${i + 1}`,
        value: Math.floor(Math.random() * 50) + 10
      }));
    };
  
    const dummyData = {
      sessions: {
        title: "Sessions",
        value: "2,765",
        changePercentage: 10.5,
        changeTimeframe: "From last 2 Weeks",
        data: generateDummyData(13),
        chartColor: "#818cf8",
        chartType: "bar" as const,
        icon: <User/>,
      },
      avgSessions: {
        title: "Avg.Sessions",
        value: "42:50",
        changePercentage: 12,
        changeTimeframe: "From last month",
        data: generateDummyData(12),
        chartColor: "#10b981",
        chartType: "area" as const,
        icon: <TrendingUp/>,
      },
      bounceRate: {
        title: "Bounce Rate",
        value: "1,853",
        changePercentage: 10,
        changeTimeframe: "From last week",
        data: generateDummyData(7),
        chartColor: "#f59e0b",
        chartType: "line" as const,
        icon: <ArrowDownLeft/>,
      },
      goalCompletions: {
        title: "Goal Completions",
        value: "2,153",
        changePercentage: -12,
        changeTimeframe: "From last month",
        data: generateDummyData(30),
        chartColor: "#3b82f6",
        chartType: "bar" as const,
        icon: <Activity/>,
      }
    };
   console.log(dummyData)
    return (
      <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        <MetricCard {...dummyData.sessions} />
        <MetricCard {...dummyData.avgSessions} />
        <MetricCard {...dummyData.bounceRate} />
        <MetricCard {...dummyData.goalCompletions} />
      </div>
      {/* <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Custom Form Inputs</h1>
    </div> */}
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Custom Tables Example</h1>
      
      <h2 className="text-xl font-semibold mb-3">Table without Checkboxes</h2>
      <SimpleTable columns={columns} data={data} />
      
      <h2 className="text-xl font-semibold mt-10 mb-3">Table with Checkboxes</h2>
      <CheckboxTable columns={columns} data={data} />
    </div>
      </>
    );
  };
  
  export default Dashboard;