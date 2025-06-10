import { motion } from 'framer-motion';
import DropIndicator from './components/DropIndicator';
import { Trash2 } from 'lucide-react';
import { ColumnType, ProjectType, TaskType } from '@/types';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { priorityFieldsGenerator } from '@/lib';

interface CardProps {
  task: TaskType;
  project: ProjectType;
  onClick?: () => void;
  onDragStart?: () => void;
  color: string;
  setOpen: (open: boolean) => void;
  setSelectedTask: (selected: {
    task: TaskType;
    column: ColumnType;
    project: ProjectType;
  } | undefined) => void;
  setOpenTaskWindow: (openTaskWindow: boolean) => void;
  record: {
    task: TaskType;
    column: ColumnType;
    project: ProjectType;
  }
};

export default function Card({ task, project, onClick, onDragStart, color, setOpen, setSelectedTask, setOpenTaskWindow, record }: CardProps) {

  return (
    <div>
      <DropIndicator beforeId={task.id!} column={task.columnId} />
      <motion.div
        onClick={() => {
          setSelectedTask(record);
          setOpenTaskWindow(true);
          onClick && onClick();
        }}
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
          <Trash2 className="cursor-pointer" size={20} color="gray" onClick={() => {
            setSelectedTask(record)
            setOpen(true)}} 
          />
        </div>
        <div className="flex items-start justify-center flex-col gap-1">
          <Badge variant="outline" className={cn(priorityFieldsGenerator(task.priority).color, 'rounded-full')}>{priorityFieldsGenerator(task.priority).label}</Badge>
          <span className="text-sm text-muted-foreground">{project.name}</span>
        </div>
      </motion.div>
    </div>
  );
}
