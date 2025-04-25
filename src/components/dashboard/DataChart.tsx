
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableRow, TableColumn } from "./DataTable";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";

interface DataChartProps {
  data: TableRow[];
  columns: TableColumn[];
}

const DataChart = ({ data, columns }: DataChartProps) => {
  const [chartType, setChartType] = useState<"bar" | "line">("bar");
  const [xAxis, setXAxis] = useState<string | null>(null);
  const [yAxis, setYAxis] = useState<string | null>(null);

  // Try to find suitable default columns for chart axes
  useEffect(() => {
    const visibleColumns = columns.filter(col => col.visible);
    
    // Set default X-axis (prefer date or string columns)
    if (!xAxis && visibleColumns.length > 0) {
      const dateColumn = visibleColumns.find(col => 
        data.length > 0 && data[0][col.id] instanceof Date);
      
      const stringColumn = visibleColumns.find(col => 
        data.length > 0 && typeof data[0][col.id] === 'string');
      
      setXAxis((dateColumn || stringColumn || visibleColumns[0])?.id || null);
    }
    
    // Set default Y-axis (prefer numeric columns)
    if (!yAxis && visibleColumns.length > 0) {
      const numericColumn = visibleColumns.find(col => 
        data.length > 0 && typeof data[0][col.id] === 'number');
      
      const secondColumn = visibleColumns.length > 1 ? visibleColumns[2] : null;
      setYAxis((numericColumn || secondColumn || visibleColumns[0])?.id || null);
    }
  }, [columns, data, xAxis, yAxis]);

  const hasValidAxes = Boolean(xAxis && yAxis);
  
  const chartData = hasValidAxes
    ? data.map((row) => ({
        name: row[xAxis!]?.toString() || "",
        value: Number(row[yAxis!]) || 0,
      }))
    : [];

  const visibleColumns = columns.filter(col => col.visible);

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Data Visualization</CardTitle>
          <Tabs
            defaultValue="bar"
            value={chartType}
            onValueChange={(value) => setChartType(value as "bar" | "line")}
            className="h-9"
          >
            <TabsList className="grid grid-cols-2 w-[160px]">
              <TabsTrigger value="bar">Bar Chart</TabsTrigger>
              <TabsTrigger value="line">Line Chart</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex gap-2 mt-3">
          <Select value={xAxis || ""} onValueChange={setXAxis}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select X-axis" />
            </SelectTrigger>
            <SelectContent>
              {visibleColumns.map((column) => (
                <SelectItem key={column.id} value={column.id}>
                  {column.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={yAxis || ""} onValueChange={setYAxis}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Y-axis" />
            </SelectTrigger>
            <SelectContent>
              {visibleColumns.map((column) => (
                <SelectItem key={column.id} value={column.id}>
                  {column.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {hasValidAxes && chartData.length > 0 ? (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "bar" ? (
                <BarChart
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="hsl(var(--primary))" />
                </BarChart>
              ) : (
                <LineChart
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[300px] bg-muted/20 rounded-md">
            <p className="text-muted-foreground">
              {!hasValidAxes 
                ? "Select columns for X and Y axes" 
                : "No data available for chart"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataChart;
