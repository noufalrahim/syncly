import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCreateData } from '@/hooks/useCreateData';
import { LabelType } from '@/types';
import { PrimaryButton } from '@/components/Button';
import { labelFormSchema } from './schema';

interface LabelFormType {
    projectId: string;
    refetch: () => void;
    setOpenModal: (openModal: boolean) => void;
}

export default function LabelForm({ projectId, refetch, setOpenModal }: LabelFormType) {

    const { mutate: createLabelMutate, isPending: createLabelIsPending } = useCreateData<Omit<LabelType, 'id'>>('/labels');

    const form = useForm<z.infer<typeof labelFormSchema>>({
        resolver: zodResolver(labelFormSchema),
        defaultValues: {
            title: '',
        },
    });

    async function onSubmit(values: z.infer<typeof labelFormSchema>) {
        const newLabel: Omit<LabelType, 'id'> = {
            title: values.title,
            projectId: projectId
        };

        createLabelMutate(newLabel, {
            onSuccess: () => {
                console.log('label added');
                refetch();
                setOpenModal(false);
            },
            onError: (err) => {
                console.log('An error occured', err);
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Label Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Label Title" {...field} />
                            </FormControl>
                            <FormMessage className='text-red-500' />
                        </FormItem>
                    )}
                />
                <PrimaryButton label='Create Label' loading={createLabelIsPending} type='submit' />
            </form>
        </Form>
    );
};
