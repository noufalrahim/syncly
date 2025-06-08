import { useEffect, useRef, useState } from 'react';
import Column from './Column';
import { ColumnType, TaskType } from '@/types';
import { PlusIcon } from 'lucide-react';
import { Input } from '../ui/input';

interface KanbanBoardProps {
  columnsData: ColumnType[] | null;
  onCreateColumn: (name: string) => void;
  onMoveTask: (task: TaskType, columnId: string) => void;
  onCardClick: (task: TaskType) => void;
  projectId: string | undefined;
}

export default function KanbanBoard({
  columnsData,
  onCreateColumn,
  onMoveTask,
  onCardClick,
  projectId,
}: KanbanBoardProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');
  const [draggedTask, setDraggedTask] = useState<TaskType | null>(null);

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

  return (
    <div className="h-[80vh]">
      <div className="flex h-full max-w-[150vh] gap-3 overflow-x-scroll p-5">
        {columnsData && columnsData?.length > 0 ? (
          <>
            {columnsData.map((column) => (
              <Column
                key={column.id}
                column={column}
                onCardClick={onCardClick}
                draggedTask={draggedTask}
                setDraggedTask={setDraggedTask}
                moveTaskToColumn={onMoveTask}
                projectId={projectId}
              />
            ))}
          </>
        ) : null}

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
    </div>
  );
}
