import { useState, DragEvent } from 'react';
import DropIndicator from './components/DropIndicator';
import { ColumnType, ProjectType, TaskType } from '@/types';
import { useReadData } from '@/hooks/useReadData';
import Card from './Card';
import AddTask from './AddTask';

interface ColumnProps {
  projectId: string | undefined;
  column: ColumnType;
  onCardClick: (card: TaskType) => void;
  draggedTask: TaskType | null;
  setDraggedTask: (task: TaskType | null) => void;
  moveTaskToColumn: (task: TaskType, columnId: string) => void;
};

export default function Column({
  projectId,
  column,
  onCardClick,
  draggedTask,
  setDraggedTask,
  moveTaskToColumn
}: ColumnProps) {

  const [isOver, setIsOver] = useState(false);

  const { data: tasksData, isLoading: tasksLoading, refetch: refetchTasksData } = useReadData<{
    task: TaskType;
    project: ProjectType;
  }[]>('tasks', `/tasks/fields/many?columnId=${column.id}`);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    if (draggedTask && draggedTask.columnId !== column.id) {
      moveTaskToColumn(draggedTask, column.id);
      setDraggedTask(null);
    }
  };

  if (tasksLoading) return <p>Loading...</p>;

  return (
    <div className="w-72 shrink-0 bg-primary px-5 rounded-md shadow-md h-full flex flex-col">
      <div className="my-4 flex items-center justify-between">
        <h3 className="font-medium text-black">{column.name}</h3>
        <span className="rounded text-sm text-black">
          {tasksData?.filter(record => record.task.columnId === column.id).length ?? 0}
        </span>
      </div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragEnter={handleDragEnter}
        className={`flex-1 overflow-y-auto rounded-md transition-all duration-150 ease-in-out space-y-2 pr-1
          ${isOver ? 'bg-primary-main/60 scale-[1.01]' : 'bg-primary'}`}
      >
        {tasksData &&
          tasksData
            .filter(record => record.task.columnId === column.id)
            .map(record => (
              <Card
                key={record.task.id}
                task={record.task}
                color={column.color!}
                project={record.project}
                onClick={() => onCardClick(record.task)}
                onDragStart={() => setDraggedTask(record.task)}
              />
            ))}
        {isOver && <DropIndicator beforeId={null} column={column.id} />}
        <AddTask columnId={column.id} projectId={projectId!} refetch={refetchTasksData} />
      </div>
    </div>
  );

}
