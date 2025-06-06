import { motion } from 'framer-motion';
import DropIndicator from './components/DropIndicator';
import { Loader2, Trash2 } from 'lucide-react';
import { ProjectType, TaskType } from '@/types';
import { cn } from '@/lib/utils';
import { useDeleteData } from '@/hooks/useDeleteData';

interface CardProps {
  task: TaskType;
  project: ProjectType;
  onClick?: () => void;
  onDragStart?: () => void;
  color: string;
};

export default function Card({ task, project, onClick, onDragStart, color }: CardProps) {

  const { mutate, 
    isPending 
  } = useDeleteData('/tasks');

  const handleDelete = (id: string) => {
    mutate({
      id: id
    },
      {
        onSuccess: () => {
          console.log('deleted');
        },
        onError: (err) => {
          console.log('err', err);
        }
      }
    )
  };

  if(isPending){
    return <Loader2 className='animate-spin'/>
  }

  return (
    <div>
      <DropIndicator beforeId={task.id!} column={task.columnId} />
      <motion.div
        onClick={onClick}
        onDragStart={onDragStart}
        draggable
        layout
        layoutId={task.id}
        whileDrag={{
          scale: 1.03,
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
        }}
        className={cn(
          'flex cursor-grab flex-col gap-3 rounded border border-l-4 bg-secondary p-3 transition-shadow duration-150 active:cursor-grabbing'
        )}
        style={{ borderLeftColor: color || 'black' }}
      >

        <div className="flex items-center justify-between gap-1">
          <p className="max-w-[90%] text-sm">{task.title}</p>
          <Trash2 className="cursor-pointer" size={20} color="gray" onClick={() => handleDelete(task.id!)} />
        </div>
        <div className="flex items-center justify-between gap-1">
          <span className="text-sm text-muted-foreground">{project.name}</span>
        </div>
      </motion.div>
    </div>
  );
}
