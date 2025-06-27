import { useState, DragEvent } from 'react';
import DropIndicator from './components/DropIndicator';
import { ColumnType, ProjectType, TaskType } from '@/types';
import { useReadData } from '@/hooks/useReadData';
import TaskCard from './TaskCard';
import AddTask from './AddTask';
import { Trash2 } from 'lucide-react';
import { useDeleteData } from '@/hooks/useDeleteData';

interface ColumnProps {
  projectId: string | undefined;
  column: ColumnType;
  onCardClick: (card: TaskType) => void;
  draggedTask: TaskType | null;
  setDraggedTask: (task: TaskType | null) => void;
  moveTaskToColumn: (task: TaskType, columnId: string, refetchTasksData: () => void) => void;
  draggable?: boolean;
  onDragStartColumn?: () => void;
  onDropColumn?: () => void;
  setOpen: (open: boolean) => void;
  setSelectedTask: (selected: {
    task: TaskType;
    column: ColumnType;
    project: ProjectType;
  } | undefined) => void;
  setOpenTaskWindow: (openTaskWindow: boolean) => void;
  refetchColumnData: () => void;
}

export default function Column({
  projectId,
  column,
  onCardClick,
  draggedTask,
  setDraggedTask,
  moveTaskToColumn,
  draggable,
  onDragStartColumn,
  onDropColumn,
  setOpen,
  setSelectedTask,
  setOpenTaskWindow,
  refetchColumnData
}: ColumnProps) {

  const [isOver, setIsOver] = useState(false);

  const { data: tasksData, isLoading: tasksLoading, refetch: refetchTasksData } = useReadData<{
    task: TaskType;
    project: ProjectType;
    column: ColumnType;
  }[]>('tasks', `/tasks/fields/many?columnId=${column.id}`);

  const {
    mutate: deleteMutate,
    isPending: deleteMutateIsPending
  } = useDeleteData('/columns');

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

  const handleDelete = (id: string) => {
    deleteMutate({
      id: id
    },
      {
        onSuccess: () => {
          refetchColumnData();
        },
        onError: (err) => {
          console.log("err", err)
        }
      }
    )
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    if (draggedTask && draggedTask.columnId !== column.id) {
      moveTaskToColumn(draggedTask, column.id, refetchTasksData);
      setDraggedTask(null);
    }
    onDropColumn?.();
  };

  const handleColumnDragStart = (e: DragEvent) => {
    onDragStartColumn?.();
    e.stopPropagation();
  };

  if (tasksLoading || deleteMutateIsPending) return <p>Loading...</p>;

  return (
    <div
      className="w-72 shrink-0 bg-primary px-5 rounded-md shadow-md h-full flex flex-col"
      draggable={draggable}
      onDragStart={handleColumnDragStart}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="my-4 flex items-center justify-between">
        <div className='flex items-center gap-2'>
          <h3 className="font-medium text-black">{column.name}</h3>
          <div className='min-h-5 min-w-5 p-1 aspect-square items-center justify-center flex bg-gray-300 rounded-full'>
            <p className="text-[13px]">
              {tasksData?.filter(record => record.task.columnId === column.id).length ?? 0}
            </p>
          </div>
        </div>
        <div className='hover:bg-gray-300 items-center justify-center p-1 rounded-full' onClick={() => handleDelete(column.id)}>
          <Trash2 size={16} className='text-gray-700' />
        </div>
      </div>
      <div
        className={`flex-1 overflow-y-auto rounded-md transition-all duration-150 ease-in-out space-y-2 pr-1
          ${isOver ? 'bg-primary-main/60 scale-[1.01]' : 'bg-primary'}`}
      >
        {tasksData &&
          tasksData
            .filter(record => record.task.columnId === column.id)
            .map(record => (
              <TaskCard
                key={record.task.id}
                task={record.task}
                color={column.color!}
                project={record.project}
                onClick={() => onCardClick(record.task)}
                onDragStart={() => setDraggedTask(record.task)}
                setOpen={setOpen}
                setSelectedTask={setSelectedTask}
                record={record}
                setOpenTaskWindow={setOpenTaskWindow}
              />
            ))}
        {isOver && <DropIndicator beforeId={null} column={column.id} />}
        <AddTask columnId={column.id} projectId={projectId!} refetch={refetchTasksData} />
      </div>
    </div>
  );
}
