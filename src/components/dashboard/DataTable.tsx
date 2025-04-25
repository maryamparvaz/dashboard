
import { useState, useEffect } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface TableColumn {
  id: string;
  name: string;
  visible: boolean;
  fixed?: boolean;
}

export interface TableRow {
  id: string;
  [key: string]: string | number | Date;
}

interface DataTableProps {
  initialData: TableRow[];
  initialColumns: TableColumn[];
  onAddColumn: (column: TableColumn) => void;
  onUpdateData: (data: TableRow[]) => void;
  onRemoveColumn?: (columnId: string) => void;
}

const DataTable = ({ 
  initialData, 
  initialColumns, 
  onAddColumn,
  onUpdateData,
  onRemoveColumn 
}: DataTableProps) => {
  const [data, setData] = useState<TableRow[]>(initialData);
  const [columns, setColumns] = useState<TableColumn[]>(initialColumns);
  const [filter, setFilter] = useState<string>("");
  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const [isDropActive, setIsDropActive] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    setColumns(initialColumns);
  }, [initialColumns]);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleDeleteColumn = (columnId: string) => {
    const updatedColumns = columns.filter(col => col.id !== columnId);
    setColumns(updatedColumns);
    onRemoveColumn?.(columnId);
    toast({
      title: "Column Removed",
      description: "The parameter has been removed from the table",
    });
  };

  const filteredData = data.filter(row => {
    if (!filter || !activeColumn) return true;
    const cellValue = row[activeColumn];
    return cellValue && cellValue.toString().toLowerCase().includes(filter.toLowerCase());
  });

  const handleHeaderClick = (columnId: string) => {
    setActiveColumn(columnId);
    setFilter("");
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDropActive(true);
  };

  const handleDragLeave = () => {
    setIsDropActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDropActive(false);
    
    const paramData = e.dataTransfer.getData("parameter");
    if (paramData) {
      try {
        const parameter = JSON.parse(paramData);
        
        if (columns.some(col => col.id === parameter.id)) {
          toast({
            title: "Parameter Already Added",
            description: "This parameter is already in the table",
            variant: "destructive",
          });
          return;
        }

        const newColumn = {
          id: parameter.id,
          name: parameter.name,
          visible: true
        };
        
        onAddColumn(newColumn);
        
        const updatedData = data.map(row => ({
          ...row,
          [parameter.id]: `Sample ${parameter.name}`
        }));
        
        setData(updatedData);
        onUpdateData(updatedData);

        toast({
          title: "Parameter Added",
          description: `Added "${parameter.name}" to the table`,
        });
      } catch (error) {
        console.error("Error processing dropped parameter:", error);
        toast({
          title: "Error",
          description: "Failed to add parameter to the table",
          variant: "destructive",
        });
      }
    }
  };

  const visibleColumns = columns.filter(col => col.visible);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {activeColumn && (
          <Input
            placeholder={`Filter by ${columns.find(col => col.id === activeColumn)?.name || ''}...`}
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="max-w-sm"
          />
        )}
      </div>

      <div
        className={`table-responsive rounded-md ${
          isDropActive ? "ring-2 ring-purple-500 ring-opacity-50" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Table>
          <TableCaption>
            {isDropActive 
              ? "Drop parameter here to add column" 
              : "Click on column header to filter"}
          </TableCaption>
          <TableHeader>
            <TableRow>
              {visibleColumns.map((column) => (
                <TableHead
                  key={column.id}
                  onClick={() => handleHeaderClick(column.id)}
                  className={`cursor-pointer hover:bg-muted/50 transition-colors ${
                    activeColumn === column.id ? "bg-purple-50 dark:bg-purple-900/20" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span>{column.name}</span>
                    {!column.fixed && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-purple-500 hover:text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:text-purple-300 dark:hover:bg-purple-900/20"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteColumn(column.id);
                        }}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove {column.name}</span>
                      </Button>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <TableRow key={row.id}>
                  {visibleColumns.map((column) => (
                    <TableCell key={`${row.id}-${column.id}`}>
                      {row[column.id] !== undefined ? row[column.id].toString() : "—"}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={visibleColumns.length} className="text-center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
