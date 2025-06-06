import React from 'react';
import { EventsCardProps, TaskStatus } from './types';
import { cn } from '@/lib/utils';


const statusColorMap: Record<TaskStatus, string> = {
  [TaskStatus.BACKLOG]: 'border-l-pink-500',
  [TaskStatus.TODO]: 'border-l-red-500',
  [TaskStatus.IN_PROGRESS]: 'border-l-yellow-500',
  [TaskStatus.IN_REVIEW]: 'border-l-blue-500',
  [TaskStatus.DONE]: 'border-l-green-500',
  [TaskStatus.CANCELED]: 'border-l-gray-500',
};

const EventsCard: React.FC<EventsCardProps> = ({ title, assignee, status, id, event }) => {
  const color = statusColorMap[status as TaskStatus] || 'border-l-gray-500';

  console.log(assignee);
  return (
    <>
      <div className="px-2">
        <div
          onClick={() => {
            console.log('Event clicked', id, event);
          }}
          className={cn('flex cursor-pointer flex-col gap-y-1.5 rounded-md border border-l-4 bg-gray-100 p-1.5 text-xs text-primary transition hover:opacity-75', color)}
        >
          <p className="text-xs font-semibold">{title.length >= 10 ? `${title.slice(0, 10)}...` : title}</p>
          <div className="flex items-center justify-between gap-x-1">
            {/* <Avatar className="h-7 w-7">
              <AvatarImage src={assigneeData?.image} />
              {assigneeData?.name && assigneeData?.name.length > 0 ? (
                <AvatarFallback className="border border-gray-300 bg-primary text-xs text-black">{AvatarFallbackFunction(assigneeData?.name)}</AvatarFallback>
              ) : (
                <div className="h-7 w-7">
                  <AvatarImage src={'https://www.tech101.in/wp-content/uploads/2018/07/blank-profile-picture.png'} />
                </div>
              )}
            </Avatar> */}
            <div className="size-l rounded-full" />
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-900 text-xs text-white">{"NR"}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsCard;
