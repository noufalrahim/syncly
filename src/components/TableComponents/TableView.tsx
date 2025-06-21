
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Filter, Loader2, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useReadData } from '@/hooks/useReadData';
import { ColumnType, ProjectType, TaskType } from '@/types';
import { PrimaryButton } from '../Button';
import { priorityFieldsGenerator } from '@/lib';
import { cn } from '@/lib/utils';

interface TableView {
  projectId: string | undefined;
};

export default function TableView({ projectId }: TableView) {

  if(!projectId){
    return;
  }

  const { data: tasksData, isLoading: tasksLoading } = useReadData<{
    task: TaskType;
    project: ProjectType;
    column: ColumnType;
  }[]>('tasks', `/tasks/fields/many?projectId=${projectId}`);

  if(tasksLoading){
    return <Loader2 className='animate-spin'/>
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{tasksData && tasksData[0]?.project.name} - Issues</h1>
        {/* <p className="text-muted-foreground mb-4">{tasksData && tasksData[0]?.project.}</p> */}

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search issues..."
                className="pl-10"
              />
            </div>
            {/* <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button> */}
            <PrimaryButton label='Filter' className='max-w-24' startIcon={<Filter />}/>
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Create Issue
          </Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasksData && tasksData.length > 0 && tasksData.map((record) => (
              <TableRow key={record.task.id!} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium">{record.task.title}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 bg-blue-600 text-white">
                      <AvatarFallback className="text-xs">
                        {/* {task.assignee.split(' ').map(n => n[0]).join('')} */}
                        N
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </TableCell>
                <TableCell>
                  {
                    record.task.priority && (
                      <Badge
                        className={cn(priorityFieldsGenerator(record.task.priority).color, 'rounded-full text-[11px]')}
                      >
                        {priorityFieldsGenerator(record.task.priority).label}
                      </Badge>
                    )
                  }
                </TableCell>
                <TableCell>
                <Badge
                    className={'bg-blue-600 text-white hover:bg-blue-700 rounded-full text-[11px]'}
                  >
                    {record.column.name}
                    </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {record?.task?.createdAt ? new Date(record.task.createdAt).toDateString() : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
