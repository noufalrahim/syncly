import { PrimaryButton, SecondaryButton } from '@/components/Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCreateData } from '@/hooks/useCreateData';
import { ColumnType, ProjectType, TaskType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { taskFormSchema } from './schema';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useModifyData } from '@/hooks/useModifyData';
import { useReadData } from '@/hooks/useReadData';
import { Loader2 } from 'lucide-react';

interface TaskFormProps {
    refetch: (colId: string) => void;
    setOpenModal: (openModal: boolean) => void;
    editItem: {
        task: TaskType;
        column: ColumnType;
        project: ProjectType;
    } | undefined;
    projectId: string;
}

export default function TaskForm({ refetch, setOpenModal, editItem, projectId }: TaskFormProps) {

    const { data:columnData, isLoading: columnDataIsLoading } = useReadData<ColumnType[]>('columns', `/columns/fields/many?projectId=${editItem?.project.id}`);

    const { mutate: createTaskMutate, isPending: createTaskMutateIsPending } = useCreateData<Omit<TaskType, 'id'>>('/tasks');
    const { mutate: editTaskMutate, isPending: editTaskIsPending } = useModifyData<TaskType>('/tasks');

    const form = useForm<z.infer<typeof taskFormSchema>>({
        resolver: zodResolver(taskFormSchema),
        defaultValues: {
            title: editItem?.task.title || "",
            description: editItem?.task.description || "",
            priority: editItem?.task.priority || "",
            projectId: editItem?.project.name || "",
            columnId: editItem?.task.columnId || "",
        },
    });

    async function onSubmit(values: z.infer<typeof taskFormSchema>) {
        if (editItem) {
            editTaskMutate({
                id: editItem.task.id!,
                title: values.title,
                description: values.description,
                priority: values.priority,
                projectId: projectId,
                columnId: values.columnId
            }, {
                onSuccess: () => {
                    console.log('task updated');
                    refetch(editItem.column.id);
                    refetch(values.columnId);
                    setOpenModal(false);
                },
                onError: (err) => {
                    console.log('An error occured', err);
                }
            })
        }
        else {
            const newTask: Omit<TaskType, 'id'> = {
                title: values.title,
                description: values.description,
                priority: values.priority,
                projectId: projectId,
                columnId: values.columnId,
            };

            createTaskMutate(newTask, {
                onSuccess: (data) => {
                    console.log('task added');
                    refetch(data.columnId);
                    setOpenModal(false);
                },
                onError: (err) => {
                    console.log('An error occured', err);
                }
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Task Title" {...field} />
                            </FormControl>
                            <FormMessage className='text-red-500' />
                        </FormItem>
                    )}
                />

                <div className='flex flex-row gap-5 w-full'>
                    <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Priority</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent className='bg-white'>
                                            <SelectItem value="very_low">Very Low</SelectItem>
                                            <SelectItem value="low">Low</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                            <SelectItem value="very_high">Very High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="columnId"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent className='bg-white'>
                                            {
                                                columnData && columnData.map((record) => (
                                                    <SelectItem value={record.id} key={record.id}>{record.name}</SelectItem>
                                                ))
                                            }
                                            {
                                                columnDataIsLoading && (
                                                    <div className='items-center flex flex-col py-1'>
                                                        <Loader2 className='animate-spin text-sm'/>
                                                    </div>
                                                )
                                            }
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="projectId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project</FormLabel>
                            <FormControl>
                                <Input placeholder="Project Title" {...field} disabled />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Task Description" {...field} className='h-32' />
                            </FormControl>
                            <FormMessage className='text-red-500' />
                        </FormItem>
                    )}
                />
                <div className='flex flex-row gap-2 items-center justify-center'>
                    <SecondaryButton label={'Cancel'} onClick={() => setOpenModal(false)} />
                    <PrimaryButton label={editItem ? 'Edit Task' : 'Create Task'} loading={createTaskMutateIsPending || editTaskIsPending} type='submit' />
                </div>
            </form>
        </Form>
    )
}
