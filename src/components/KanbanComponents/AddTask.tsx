import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { TaskType } from '@/types';
import { useCreateData } from '@/hooks/useCreateData';
import { Loader } from 'lucide-react';

interface AddTaskProps {
  projectId: string;
  columnId: string;
  refetch: () => void;
}

export default function AddTask({ projectId, columnId, refetch }: AddTaskProps) {
  const [text, setText] = useState('');
  const [adding, setAdding] = useState(false);

  const { mutate, isPending } = useCreateData<Omit<TaskType, 'id'>>('/tasks');


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newTask: Omit<TaskType, 'id'> = {
      title: text.trim(),
      columnId: columnId,
      projectId: projectId
    };

    mutate(newTask, {
      onSuccess() {
        console.log("Task added");
        refetch();
      },
      onError: (err) => {
        console.log("Error", err);
      }
    })

    setAdding(false);
  };

  if(isPending){
    return <Loader className='animate-spin'/>
  }

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea onChange={(e) => setText(e.target.value)} autoFocus placeholder="Add new task..." className="w-full my-2 rounded border border-violet-400 p-3 text-sm text-black placeholder-violet-300 focus:outline-0" />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button onClick={() => setAdding(false)} className="px-3 py-1.5 text-xs text-neutral-400 transition-colors">
              Close
            </button>
            <button type="submit" className="flex items-center gap-1.5 rounded-full bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors">
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button layout onClick={() => setAdding(true)} className="my-2 flex w-full items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-neutral-700 transition-colors duration-200">
          <span>Add Task</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};

