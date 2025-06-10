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
import { TableView } from '@/components/TableComponents';
import { useQueryClient } from '@tanstack/react-query';
import { CalendarView } from '@/components/CalendarComponents';
import { useState } from 'react';

export default function Board() {
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  const [boardItem, setBoardItem] = useState<'Kanban' | 'Table' | 'Calendar'>('Kanban');

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

  const refetchTask = (colId: string) => {
    queryClient.refetchQueries({
      queryKey: ['tasks', `/tasks/fields/many?columnId=${colId}`],
      type: 'active',
    });
  }

  const handleMoveTask = (task: TaskType, newColumnId: string) => {
    const updatedTask = { ...task, columnId: newColumnId };
    updateTaskMutate(updatedTask, {
      onSuccess: () => {
        refetchTask(task.columnId)
        refetchTask(newColumnId)
      },
      onError: (err) => console.log('err', err)
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
      <AppBar title={`${boardItem}`} description="Manage all your tasks here" />
      <div className="flex-1 p-6 overflow-hidden">
        <Tabs defaultValue="kanban" className="h-full w-full flex flex-col space-y-6">
          <TabsList className="grid grid-cols-3 bg-gray-200 w-fit mb-0">
            <TabsTrigger value="kanban" className="data-[state=active]:bg-white flex items-center gap-2" onClick={() => setBoardItem('Kanban')}>
              Kanban
            </TabsTrigger>
            <TabsTrigger value="table" className="data-[state=active]:bg-white flex items-center gap-2" onClick={() => setBoardItem('Table')}>
              Table
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-white flex items-center gap-2" onClick={() => setBoardItem('Calendar')}>
            Calendar
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
                refetchTask={refetchTask}
                refetchColumnData={refetchColumnData}
              />
            </TabsContent>
            <TabsContent value="table" className="h-full">
              <TableView 
                projectId={projectId}
              />
            </TabsContent>
            <TabsContent value="calendar" className="h-full">
              <CalendarView 
                projectId={projectId}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
