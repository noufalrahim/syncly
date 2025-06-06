import { useEffect, useRef, useState } from 'react';
import Column from './Column';
import { useReadData } from '@/hooks/useReadData';
import { ColumnType, TaskType } from '@/types';
import { useModifyData } from '@/hooks/useModifyData';
import { ColumnsWithColorUtil } from '@/lib/ColumnsWithColor';
import { ColorGeneratorUtil } from '@/lib/ColorGeneratorUtil';
import { useParams } from 'react-router-dom';
import { PlusIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { useCreateData } from '@/hooks/useCreateData';

export default function Board() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<TaskType | null>(null);
  const [draggedTask, setDraggedTask] = useState<TaskType | null>(null);
  const [isClicked, setIsClicked] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');
  const inputWrapperRef = useRef<HTMLDivElement>(null);

  const { projectId } = useParams();
  console.log(openModal, selectedCard);

  const {
    data: rawColumnsData,
    isLoading: rawColumnsDataIsLoading,
    refetch: refetchColumnData,
  } = useReadData<ColumnType[]>('columns', `/columns/fields/many?projectId=${projectId}`);

  const { mutate: createColumnMutate, 
    // isPending: createColumnIsPending 
  } = useCreateData<Omit<ColumnType, 'id'>>('/columns');

  const coloursList = ColorGeneratorUtil(rawColumnsData?.length);
  const columnsData = ColumnsWithColorUtil(rawColumnsData, coloursList);

  const { mutate: updateTaskMutate, isPending: updateTaskIsPending } =
    useModifyData<TaskType>('/tasks');

  const handleCardClick = (card: TaskType) => {
    setSelectedCard(card);
    setOpenModal(true);
  };

  const moveTaskToColumn = (task: TaskType, newColumnId: string) => {
    const updatedTask: TaskType = {
      ...task,
      columnId: newColumnId,
    };

    updateTaskMutate(updatedTask, {
      onSuccess: () => {
        refetchColumnData();
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

    if (e.key === 'Enter' && newColumnName.trim()) {

      const newColumn: Omit<ColumnType, 'id'> = {
        name: newColumnName,
        projectId: projectId!,
      };

      createColumnMutate(newColumn, {
        onSuccess: () => {
          console.log('Column added');
          refetchColumnData();
          setIsClicked(false);
          setNewColumnName('');
        },
        onError: (err) => {
          console.log("Error", err);
        }
      })

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

  if (rawColumnsDataIsLoading || updateTaskIsPending) {
    return <p>Loading...</p>;
  }

  return (
    <div className="h-[80vh]">
      <div className="flex h-full max-w-[150vh] gap-3 overflow-x-scroll p-5">
        {columnsData && columnsData.length > 0 ? (
          <>
            {columnsData.map((column) => (
              <Column
                key={column.id}
                column={column}
                onCardClick={handleCardClick}
                draggedTask={draggedTask}
                setDraggedTask={setDraggedTask}
                moveTaskToColumn={moveTaskToColumn}
                projectId={projectId}
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
                  <div className='h-full flex items-center'>
                    <Input
                      className='border border-gray-400'
                      value={newColumnName}
                      onChange={(e) => setNewColumnName(e.target.value)}
                      onKeyDown={handleKeyDown}
                      autoFocus
                    />
                  </div>
                )}
                <span className="rounded text-sm text-black">0</span>
              </div>
            </div>
          </>
        ) : (
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
                  <div className='h-full flex items-center'>
                    <Input
                      className='border border-gray-400'
                      value={newColumnName}
                      onChange={(e) => setNewColumnName(e.target.value)}
                      onKeyDown={handleKeyDown}
                      autoFocus
                    />
                  </div>
                )}
                <span className="rounded text-sm text-black">0</span>
              </div>
            </div>
        )}
      </div>
{/* 
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title="Task Details"
      >
        <TaskListForm
          task={selectedCard}
          fetchTasks={() => { }}
          onClose={() => setOpenModal(false)}
        />
      </Modal> */}
    </div>
  );
}
