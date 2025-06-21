import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { useReadData } from '@/hooks/useReadData';
import { ColumnType, ProjectType, TaskType } from '@/types';
import { SecondaryButton } from '../Button';
import { priorityFieldsGenerator } from '@/lib';
import { cn } from '@/lib/utils';

interface CalendarViewProps {
  projectId: string | undefined;
}

function normalizeDate(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

export default function CalendarView({ projectId }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { data: tasksData, isLoading: tasksLoading } = useReadData<{
    task: TaskType;
    project: ProjectType;
    column: ColumnType;
  }[]>('tasks', projectId ? `/tasks/fields/many?projectId=${projectId}` : null);

  if (!projectId) return null;

  const selectedEvents = tasksData?.filter(record => {
    if (!record.task?.createdAt || !selectedDate) return false;
    return normalizeDate(new Date(record.task.createdAt)) === normalizeDate(selectedDate);
  }) ?? [];

  const upcomingEvents = tasksData
    ? tasksData
      .filter(record => record.task.createdAt && new Date(record.task.createdAt) >= new Date())
      .sort((a, b) => new Date(a.task.createdAt!).getTime() - new Date(b.task.createdAt!).getTime())
      .slice(0, 5)
    : [];

  if (tasksLoading) return <Loader2 className="animate-spin" />;

  if (!tasksData) return <h1>No tasks</h1>;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Calendar View</h1>
        <p className="text-muted-foreground">Project Tasks on Calendar</p>
      </div>

      <div className="flex flex-row gap-10">
        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </CardTitle>
                <div className="flex gap-1">
                  <SecondaryButton
                    label=""
                    className="bg-gray-100 rounded-full h-10 w-10 hover:bg-gray-200"
                    startIcon={<ChevronLeft className="h-4 w-4" />}
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  />
                  <SecondaryButton
                    label=""
                    className="bg-gray-100 rounded-full h-10 w-10 hover:bg-gray-200"
                    startIcon={<ChevronRight className="h-4 w-4" />}
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                className="rounded-md border w-full"
                modifiers={{
                  hasEvents: tasksData.map(record => new Date(record.task.createdAt!)),
                }}
                modifiersClassNames={{
                  hasEvents: 'bg-primary/20 text-primary-foreground',
                }}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 w-full">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {selectedDate ? `Events on ${selectedDate.toLocaleDateString()}` : 'Select a date'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedEvents.length > 0 ? (
                <div className="space-y-3">
                  {selectedEvents.map(record => (
                    <div key={record.task.id} className="p-3 border rounded-lg gap-5 flex flex-col">
                      <div className="flex items-start justify-between mb-2 flex flex-col">
                        <h4 className="font-bold text-md">{record.task.title}</h4>
                        <h4 className="text-sm">{record.task.description}</h4>
                      </div>
                      <div className="flex gap-2">
                        {
                          record.task.priority && (
                            <Badge className={cn(priorityFieldsGenerator(record.task.priority).color, 'rounded-full text-[11px]')}>{priorityFieldsGenerator(record.task.priority).label}</Badge>
                          )
                        }
                        <Badge className='bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700 text-[11px]'>{record.column.name}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No events scheduled</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
              <CardDescription>Next 5 events in this project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map(record => (
                  <div key={record.task.id} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{record.task.title}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {new Date(record.task.createdAt!).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2">
                      {
                        record.task.priority && (
                          <Badge className={cn(priorityFieldsGenerator(record.task.priority).color, 'rounded-full')}>{priorityFieldsGenerator(record.task.priority).label}</Badge>
                        )
                      }
                      <Badge>{record.column.name}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
