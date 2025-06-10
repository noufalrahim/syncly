import { useEffect, useRef, useState } from 'react';
import Column from './Column';
import { ColumnType, ProjectType, TaskType } from '@/types';
import { Loader2, PlusIcon, Trash2 } from 'lucide-react';
import { Input } from '../ui/input';
import { DialogModal } from '../DialogModal';
import { useDeleteData } from '@/hooks/useDeleteData';
import { PrimaryButton } from '../Button';
import { TaskForm } from '@/forms';

interface KanbanBoardProps {
  columnsData: ColumnType[] | null;
  onCreateColumn: (name: string) => void;
  onMoveTask: (task: TaskType, columnId: string, refetchTasksData: () => void) => void;
  onCardClick: (task: TaskType) => void;
  projectId: string | undefined;
  refetchTask: (id: string) => void;
  refetchColumnData: () => void;
}

export default function KanbanBoard({
  columnsData,
  onCreateColumn,
  onMoveTask,
  onCardClick,
  projectId,
  refetchTask,
  refetchColumnData
}: KanbanBoardProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');
  const [draggedTask, setDraggedTask] = useState<TaskType | null>(null);
  const [draggedColumn, setDraggedColumn] = useState<ColumnType | null>(null);
  const [columnOrder, setColumnOrder] = useState<ColumnType[]>(columnsData || []);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<{
    task: TaskType;
    column: ColumnType;
    project: ProjectType;
  } | undefined>();
  const [openTaskWindow, setOpenTaskWindow] = useState<boolean>(false);

  const { mutate,
    isPending,
  } = useDeleteData('/tasks');

  const inputWrapperRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newColumnName.trim()) {
      onCreateColumn(newColumnName.trim());
      setNewColumnName('');
      setIsClicked(false);
    }
  };

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        inputWrapperRef.current &&
        !inputWrapperRef.current.contains(event.target as Node)
      ) {
        setIsClicked(false);
        setNewColumnName('');
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (columnsData) setColumnOrder(columnsData);
  }, [columnsData]);

  const handleColumnDrop = (targetColumn: ColumnType) => {
    if (draggedColumn && draggedColumn.id !== targetColumn.id) {
      const updatedOrder = [...columnOrder];
      const fromIndex = updatedOrder.findIndex(c => c.id === draggedColumn.id);
      const toIndex = updatedOrder.findIndex(c => c.id === targetColumn.id);

      updatedOrder.splice(fromIndex, 1);
      updatedOrder.splice(toIndex, 0, draggedColumn);

      setColumnOrder(updatedOrder);
      setDraggedColumn(null);
    }
  };

  const handleDelete = () => {
    mutate({
      id: selectedTask?.task.id!
    },
      {
        onSuccess: () => {
          setOpen(false);
          refetchTask(selectedTask?.task.columnId!);
        },
        onError: (err) => {
          console.log('err', err);
        }
      }
    )
  };

  if (isPending) {
    return <Loader2 className='animate-spin' />
  }

  return (
    <div className="h-[80vh]">
      <div className="flex h-full max-w-[150vh] gap-3 overflow-x-scroll p-5">
        {columnOrder && columnOrder.length > 0 && columnOrder.map((column) => (
          <Column
            key={column.id}
            column={column}
            onCardClick={onCardClick}
            draggedTask={draggedTask}
            setDraggedTask={setDraggedTask}
            moveTaskToColumn={onMoveTask}
            projectId={projectId}
            draggable
            onDragStartColumn={() => setDraggedColumn(column)}
            onDropColumn={() => handleColumnDrop(column)}
            setOpen={setOpen}
            setOpenTaskWindow={setOpenTaskWindow}
            setSelectedTask={setSelectedTask}
            refetchColumnData={refetchColumnData}
          />
        ))}

        <div
          ref={inputWrapperRef}
          className="w-72 shrink-0 bg-primary px-5 rounded-md shadow-sm transition-transform h-14"
          onClick={() => setIsClicked(true)}
        >
          <div className="flex items-center justify-between h-full">
            {!isClicked ? (
              <div className="flex flex-row gap-2 items-center justify-center">
                <PlusIcon size={14} className="text-gray-600" />
                <h3 className="font-medium text-gray-600">Add Column</h3>
              </div>
            ) : (
              <div className="h-full flex items-center">
                <Input
                  className="border border-gray-400"
                  value={newColumnName}
                  onChange={(e) => setNewColumnName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <DialogModal open={open} setOpen={setOpen} title='Delete'>
        <div className='items-start flex gap-5 flex-col'>
          <p className='font-bold text-lg'>Are you sure you want to delete this task? This task cannot be undone!</p>
          <div className='flex flex-row gap-3 w-full'>
            <PrimaryButton className='bg-gray-500 hover:bg-gray-400 text-white' label='Cancel' startIcon={<Trash2 />} onClick={() => setOpen(false)} />
            <PrimaryButton className='bg-red-600 hover:bg-red-500 text-white' label='Delete' startIcon={<Trash2 />} onClick={handleDelete} />
          </div>
        </div>
      </DialogModal>
      <DialogModal open={openTaskWindow} setOpen={setOpenTaskWindow} title='Task'>
        <TaskForm
          refetch={(colId: string) => refetchTask(colId)}
          setOpenModal={setOpenTaskWindow}
          editItem={selectedTask}
          projectId={projectId!}
        />
      </DialogModal>
    </div>
  );
}
