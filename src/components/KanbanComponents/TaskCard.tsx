import { motion } from 'framer-motion';
import DropIndicator from './components/DropIndicator';
import { Dot, FlagIcon, GitBranch, Trash2 } from 'lucide-react';
import { ColumnType, ProjectType, TaskType } from '@/types';
import { cn } from '@/lib/utils';
import { priorityFieldsGenerator } from '@/lib';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { BadgeComponent } from '../BadgeComponent';

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

export default function TaskCard({ task, project, onClick, onDragStart, setOpen, setSelectedTask, setOpenTaskWindow, record }: CardProps) {
  return (
    <div className='shadow-sm rounded-lg'>
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
        className={cn('flex cursor-grab flex-col gap-3 rounded bg-secondary p-3 transition-shadow duration-150 active:cursor-grabbing')}
      >

        <div className="flex items-center justify-between gap-1">
          <p className="max-w-[90%] text-md fint-bold">{task.title}</p>
          <Trash2 className="cursor-pointer" size={20} color="gray" onClick={() => {
            setSelectedTask(record)
            setOpen(true)
          }}
          />
        </div>
        <div className="flex items-start justify-start w-full flex-row gap-1">
          {
            task.priority && (
              <BadgeComponent title={priorityFieldsGenerator(task.priority).label} icon={FlagIcon} bgColor={priorityFieldsGenerator(task.priority).color} textColor={priorityFieldsGenerator(task.priority).textColor}/>
            )
          }
          {
            record.column && (
              <BadgeComponent title={record.column.name} icon={GitBranch} bgColor={'bg-gray-100'} textColor={'text-gray-700'}/>
            )
          }
        </div>
        <div className='w-full border-t border-gray-300 py-2 border-dashed flex flex-col items-start py-3c justify-center'>
          <div className="flex items-center flex-center">
            <Avatar className="bg-gray-300 w-5 h-5 text-gray-700">
              <AvatarFallback className="text-xs">
                N
              </AvatarFallback>
            </Avatar>
            <Dot className='text-blue-600'/>
            <span className='text-[12px] text-gray-600'>{record.task.dueDate ? new Date(record.task.dueDate).toDateString() : 'N/A'}</span>
          </div>
          <span className="text-sm text-gray-600 py-1">{project.name}</span>
        </div>
      </motion.div>
    </div>
  );
}
