import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

const CustomToolbar = ({ date, onNavigate }: any) => {
  const monthList = [
    {
      id: 1,
      name: 'January',
      titleName: 'Jan',
    },
    {
      id: 2,
      name: 'February',
      titleName: 'Feb',
    },
    {
      id: 3,
      name: 'March',
      titleName: 'Mar',
    },
    {
      id: 4,
      name: 'April',
      titleName: 'Apr',
    },
    {
      id: 5,
      name: 'May',
      titleName: 'May',
    },
    {
      id: 6,
      name: 'June',
      titleName: 'Jun',
    },
    {
      id: 7,
      name: 'July',
      titleName: 'Jul',
    },
    {
      id: 8,
      name: 'August',
      titleName: 'Aug',
    },
    {
      id: 9,
      name: 'September',
      titleName: 'Sep',
    },
    {
      id: 10,
      name: 'October',
      titleName: 'Oct',
    },
    {
      id: 11,
      name: 'November',
      titleName: 'Nov',
    },
    {
      id: 12,
      name: 'December',
      titleName: 'Dec',
    },
  ];

  const handleNavigate = (id: number) => {
    onNavigate('MONTH', true, id);
  };

  return (
    <HoverCard>
      <div className="mb-4 flex w-full items-center justify-center gap-x-2 lg:w-auto">
        <Button onClick={() => onNavigate('PREV', false, 0)} variant={'secondary'} size={'icon'} className="flex items-center">
          <ChevronLeftIcon size={20} className="mr-2" />
        </Button>
        <HoverCardTrigger asChild>
          <div className="flex h-8 w-full cursor-pointer items-center justify-center rounded-md border border-input px-3 py-2 lg:w-auto">
            <CalendarIcon size={20} className="mr-2" />
            <p className="text-sm">{format(date, 'MMMM yyyy')}</p>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="bg-white">
          <div className="grid grid-cols-3 gap-2 bg-white p-2">
            {monthList.map((month) => (
              <div key={month.id} className="cursor-pointer p-2 text-center hover:bg-gray-200" onClick={() => handleNavigate(month.id)}>
                {month.titleName}
              </div>
            ))}
          </div>
        </HoverCardContent>
        <Button onClick={() => onNavigate('NEXT', false, 0)} variant={'secondary'} size={'icon'} className="flex items-center">
          <ChevronRightIcon size={20} className="mr-2" />
        </Button>
      </div>
    </HoverCard>
  );
};

export default CustomToolbar;
