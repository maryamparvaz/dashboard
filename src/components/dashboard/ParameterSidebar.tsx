import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export interface Parameter {
  id: string;
  name: string;
  type: "number" | "string" | "date" | "category";
  color?: string;
  disabled?: boolean;
}

interface ParameterSidebarProps {
  parameters: Parameter[];
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "number":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
    case "string":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "date":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "category":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};

const ParameterSidebar = ({ parameters }: ParameterSidebarProps) => {
  const [dragging, setDragging] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDragStart = (e: React.DragEvent, parameter: Parameter) => {
    if (parameter.disabled) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData("parameter", JSON.stringify(parameter));
    setDragging(parameter.id);
    toast({
      title: "Parameter Selected",
      description: `Drag "${parameter.name}" to the table to add it as a column`,
    });
  };

  const handleDragEnd = () => {
    setDragging(null);
  };

  return (
    <Card className="h-full overflow-hidden border-purple-100 dark:border-none">
      <CardHeader className="bg-purple-50/50 dark:bg-purple-900/20 py-3">
        <CardTitle className="text-sm font-medium text-purple-800 dark:text-purple-200">
          Available Parameters
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="text-xs text-muted-foreground mb-3">
          Drag parameters to the table to add columns
        </div>
        <div className="space-y-2">
          {parameters.map((param) => (
            <div
              key={param.id}
              draggable={!param.disabled}
              onDragStart={(e) => handleDragStart(e, param)}
              onDragEnd={handleDragEnd}
              className={`draggable-item flex items-center justify-between p-2 rounded-md border border-transparent transition-all ${
                dragging === param.id ? "opacity-50" : ""
              } ${
                param.disabled 
                  ? "opacity-50 cursor-not-allowed bg-purple-50/50 dark:bg-purple-900/20" 
                  : "hover:border-purple-200 hover:bg-purple-50/50 dark:hover:border-purple-700 dark:hover:bg-purple-900/20 cursor-grab"
              }`}
            >
              <span className={param.disabled ? "text-purple-400 dark:text-purple-600" : "text-purple-700 dark:text-purple-300"}>
                {param.name}
              </span>
              <Badge 
                variant="outline"
                className={`text-xs ${getTypeColor(param.type)} ${
                  param.disabled ? "opacity-50" : ""
                }`}
              >
                {param.type}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ParameterSidebar;
