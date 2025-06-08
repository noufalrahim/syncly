import { useParams } from 'react-router-dom';
import { AppBar } from "@/components/AppBar";
import { KanbanBoard } from "@/components/KanbanComponents";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useReadData } from '@/hooks/useReadData';
import { useModifyData } from '@/hooks/useModifyData';
import { useCreateData } from '@/hooks/useCreateData';
import { ColumnType, TaskType } from '@/types';
import { ColumnsWithColorUtil } from '@/lib/ColumnsWithColor';
import { ColorGeneratorUtil } from '@/lib/ColorGeneratorUtil';

export default function Board() {
  const { projectId } = useParams();

  const {
    data: rawColumnsData,
    isLoading,
    refetch: refetchColumnData,
  } = useReadData<ColumnType[]>('columns', `/columns/fields/many?projectId=${projectId}`);

  const { mutate: updateTaskMutate } = useModifyData<TaskType>('/tasks');
  const { mutate: createColumnMutate } = useCreateData<Omit<ColumnType, 'id'>>('/columns');

  const handleCreateColumn = (name: string) => {
    const newColumn: Omit<ColumnType, 'id'> = {
      name,
      projectId: projectId!,
    };

    createColumnMutate(newColumn, {
      onSuccess: () => {
        refetchColumnData();
      },
    });
  };

  const handleMoveTask = (task: TaskType, newColumnId: string) => {
    const updatedTask = { ...task, columnId: newColumnId };
    updateTaskMutate(updatedTask, {
      onSuccess: () => refetchColumnData(),
    });
  };

  const handleCardClick = (task: TaskType) => {
    console.log("Clicked task:", task);
  };

  if (isLoading) return <p>Loading...</p>;

  const coloursList = ColorGeneratorUtil(rawColumnsData?.length);
  const columnsData = ColumnsWithColorUtil(rawColumnsData, coloursList);

  return (
    <div className="h-screen w-full flex flex-col">
      <AppBar title="Kanban" description="Manage all your tasks here" />
      <div className="flex-1 p-6 overflow-hidden">
        <Tabs defaultValue="kanban" className="h-full w-full flex flex-col space-y-6">
          <TabsList className="grid grid-cols-2 bg-gray-200 w-fit mb-0">
            <TabsTrigger value="kanban" className="data-[state=active]:bg-white flex items-center gap-2">
              Kanban
            </TabsTrigger>
            <TabsTrigger value="table" className="data-[state=active]:bg-white flex items-center gap-2">
              Table
            </TabsTrigger>
          </TabsList>
          <div className="flex-1 overflow-y-auto">
            <TabsContent value="kanban" className="h-full">
              <KanbanBoard
                columnsData={columnsData}
                onCreateColumn={handleCreateColumn}
                onMoveTask={handleMoveTask}
                onCardClick={handleCardClick}
                projectId={projectId}
              />
            </TabsContent>
            <TabsContent value="table" className="h-full">
              <KanbanBoard
                columnsData={columnsData}
                onCreateColumn={handleCreateColumn}
                onMoveTask={handleMoveTask}
                onCardClick={handleCardClick}
                projectId={projectId}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
