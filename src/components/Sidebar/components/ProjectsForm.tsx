import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCreateData } from '@/hooks/useCreateData';
import { ProjectType } from '@/types';
import { PrimaryButton } from '@/components/Button';
import { projectFormSchema } from '../schema/projectFormSchema';

interface ProjectFormType {
  organisationId: string;
  refetch: () => void;
  setOpenModal: (openModal: boolean) => void;
}

export default function ProjectForm({ organisationId, refetch, setOpenModal }: ProjectFormType) {

  const { mutate: createProjectMutate, isPending: createProjectIsPending } = useCreateData<Omit<ProjectType, 'id'>>('/projects');

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof projectFormSchema>) {
    const newProject: Omit<ProjectType, 'id'> = {
      name: values.name,
      organisationId: organisationId
    };

    createProjectMutate(newProject, {
      onSuccess: () => {
        console.log('Project added');
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
              <FormDescription>Provide a name for your project.</FormDescription>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />
        {/* <Button type="submit">Create Project</Button> */}
        <PrimaryButton label='Create Project' loading={createProjectIsPending} type='submit' />
      </form>
    </Form>
  );
};
