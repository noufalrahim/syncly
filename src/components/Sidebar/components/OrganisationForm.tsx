import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCreateData } from '@/hooks/useCreateData';
import { PrimaryButton } from '@/components/Button';
import { OrganisationType } from '@/types/OrganisationType';
import { orgFormSchema } from '../schema/orgFormSchema';

interface OrganisationFormType {
    refetch: () => void;
    setOpenModal: (openModal: boolean) => void;
}

export default function OrganisationForm({ refetch, setOpenModal }: OrganisationFormType) {

    const { mutate: createOrgMutate, isPending: createOrgIsPending } = useCreateData<Omit<OrganisationType, 'id'>>('/organisations');

    const form = useForm<z.infer<typeof orgFormSchema>>({
        resolver: zodResolver(orgFormSchema),
        defaultValues: {
            name: '',
        },
    });

    async function onSubmit(values: z.infer<typeof orgFormSchema>) {
        const newOrg: Omit<OrganisationType, 'id'> = {
            name: values.name,
        };

        createOrgMutate(newOrg, {
            onSuccess: () => {
                console.log('Org added');
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Project Title" {...field} />
                            </FormControl>
                            <FormDescription>Provide a name for your organisation.</FormDescription>
                            <FormMessage className='text-red-500' />
                        </FormItem>
                    )}
                />
                <PrimaryButton label='Create Organisation' loading={createOrgIsPending} type='submit' />
            </form>
        </Form>
    );
};
