import { useState, useEffect } from "react";
import Papa from "papaparse";  // Import PapaParse library
import DataTable, { TableColumn, TableRow } from "@/components/dashboard/DataTable";
import ParameterSidebar, { Parameter } from "@/components/dashboard/ParameterSidebar";
import DataChart from "@/components/dashboard/DataChart";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

// Initial visible columns with fixed property
const initialColumns: TableColumn[] = [
  { id: "name", name: "Name", visible: true, fixed: true },
  { id: "date", name: "Date", visible: true, fixed: true },
  { id: "value", name: "Value", visible: true, fixed: true },
];

// Available parameters for drag and drop
const availableParameters: Parameter[] = [
  { id: "category", name: "Category", type: "category" },
  { id: "region", name: "Region", type: "string" },
  { id: "quantity", name: "Quantity", type: "number" },
  { id: "created_at", name: "Created At", type: "date" },
  { id: "status", name: "Status", type: "category" },
  { id: "price", name: "Price", type: "number" },
];

const Dashboard = () => {
  const isMobile = useIsMobile();
  const [columns, setColumns] = useState<TableColumn[]>(initialColumns);
  const [data, setData] = useState<TableRow[]>([]); 
  const [parameters, setParameters] = useState(availableParameters.map(p => ({ ...p, disabled: false })));

  useEffect(() => {
    const fetchCSVData = async () => {
      const response = await fetch("./data.csv"); 
      const csvText = await response.text();

      Papa.parse(csvText, {
        complete: (result) => {
          const parsedData = result.data.map((row: any) => ({
            id: row[0], 
            name: row[1],
            date: row[2],
            value: row[3]
          }));
          setData(parsedData);  
        },
        header: false 
      });
    };

    fetchCSVData();
  }, []);

  const handleAddColumn = (column: TableColumn) => {
    if (!columns.some((col) => col.id === column.id)) {
      setColumns([...columns, column]);
      setParameters(prev => prev.map(p =>
        p.id === column.id ? { ...p, disabled: true } : p
      ));
    }
  };

  const handleRemoveColumn = (columnId: string) => {
    setColumns(prev => prev.filter(col => col.id !== columnId || col.fixed));
    setParameters(prev => prev.map(p =>
      p.id === columnId ? { ...p, disabled: false } : p
    ));
  };

  const handleUpdateData = (newData: TableRow[]) => {
    setData(newData);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-purple-900 dark:text-purple-100">Dashboard</h1>
        <p className="text-muted-foreground">Drag parameters to customize your view</p>
      </div>

      {isMobile ? (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <ParameterSidebar parameters={availableParameters} />
            </CardContent>
          </Card>
          
          <div>
            <DataTable 
              initialData={data} 
              initialColumns={columns} 
              onAddColumn={handleAddColumn} 
              onUpdateData={handleUpdateData} 
            />
          </div>
          
          <div>
            <DataChart data={data} columns={columns} />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-9 space-y-6">
            <Card className="overflow-hidden border-purple-100 dark:border-none">
              <CardContent className="p-6">
                <DataTable 
                  initialData={data} 
                  initialColumns={columns} 
                  onAddColumn={handleAddColumn}
                  onRemoveColumn={handleRemoveColumn}
                  onUpdateData={handleUpdateData} 
                />
              </CardContent>
            </Card>
            <Card className="overflow-hidden border-purple-100 dark:border-none">
              <CardContent className="p-6">
                <DataChart data={data} columns={columns} />
              </CardContent>
            </Card>
          </div>
          <div className="col-span-3">
            <ParameterSidebar parameters={parameters} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
