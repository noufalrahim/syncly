import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { LabelType, PriorityEnum, TaskType } from '@/types';
import { useCreateData } from '@/hooks/useCreateData';
import { FlagIcon, Loader, TagIcon, CalendarIcon, Loader2, PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import TextareaAutosize from "react-textarea-autosize";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { parseDate } from "chrono-node";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { priorityFieldsGenerator } from '@/lib';
import { Check } from 'lucide-react';
import { DialogModal } from '../DialogModal';
import LabelForm from './LabelForm';
import { useReadData } from '@/hooks/useReadData';
interface AddTaskProps {
  projectId: string;
  columnId: string;
  refetch: () => void;
}

function formatDate(date: Date | undefined) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function AddTask({ projectId, columnId, refetch }: AddTaskProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [adding, setAdding] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("In 2 days");
  const [date, setDate] = useState<Date | undefined>(parseDate(value) || undefined);
  const [month, setMonth] = useState<Date | undefined>(date);
  const [openLabelModal, setOpenLabelModal] = useState<boolean>(false);
  const [selectedLabel, setSelectedLabel] = useState<LabelType | null>(null);
  const [priority, setPriority] = useState<PriorityEnum | null>(null);

  const { mutate, isPending } = useCreateData<Omit<TaskType, 'id'>>('/tasks');

  const { data: labelData, isLoading: labelDataIsLoading, refetch: refetchLabelData } = useReadData<LabelType[]>('labels', `/labels/fields/many?projectId=${projectId}`)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: Omit<TaskType, 'id'> = {
      title: title.trim(),
      description: description.trim(),
      columnId,
      projectId,
      dueDate: date?.toISOString(),
      priority: priority ?? undefined,
      labelId: selectedLabel?.id,
    };

    mutate(newTask, {
      onSuccess(data) {
        console.log("Task added", data);
        refetch();
        resetForm();
      },
      onError(err) {
        console.log("Error", err);
      }
    });
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate(parseDate("In 2 days") || undefined);
    setValue("In 2 days");
    setPriority(null);
    setAdding(false);
  };

  if (isPending) return <Loader className="animate-spin" />;

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <div className="w-full my-2 rounded border border-violet-400 p-2 text-sm text-black placeholder-violet-300 focus:outline-0">
            <TextareaAutosize
              minRows={1}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              placeholder="Title"
              className="focus:outline-0 w-full bg-transparent border-none shadow-none resize-none font-bold text-lg"
            />
            <TextareaAutosize
              minRows={1}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="focus:outline-0 w-full bg-transparent border-none shadow-none resize-none font-normal text-sm"
            />

            <div className="flex flex-col gap-2 mt-2">
              <div className="flex flex-row gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-white border border-gray-300 shadow-sm" size="sm">
                      <TagIcon className="text-gray-700" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white" align="start">
                    {
                      labelDataIsLoading && (
                        <div className='w-full py-2'>
                          <Loader2 className='animate-spin' />
                        </div>
                      )
                    }
                    {labelData && labelData.map((lbl) => {
                      const isSelected = selectedLabel?.id === lbl.id;

                      return (
                        <DropdownMenuItem
                          key={lbl.id}
                          onClick={() => setSelectedLabel(lbl)}
                          className="flex items-center justify-between"
                        >
                          <span>{lbl.title}</span>
                          {isSelected && <Check className="h-4 w-4 text-gray-800" />}
                        </DropdownMenuItem>
                      );
                    })}
                    {
                      !labelDataIsLoading && (
                        <DropdownMenuItem className='text-gray-700' onClick={() => setOpenLabelModal(true)}>
                          <PlusCircle />
                          <span>Add Label</span>
                        </DropdownMenuItem>
                      )
                    }
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-white border border-gray-300 shadow-sm" size="sm">
                      <FlagIcon className="text-gray-700" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white" align="start">
                    {Object.values(PriorityEnum).map((level) => {
                      const { label, color } = priorityFieldsGenerator(level);
                      const isSelected = priority === level;

                      return (
                        <DropdownMenuItem
                          key={level}
                          onClick={() => {
                            setPriority(level);
                          }}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <div className={`h-2 w-2 ${color} rounded-full`} />
                            <span>{label}</span>
                          </div>
                          {isSelected && <Check className="h-4 w-4 text-gray-800" />}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="date" className="px-1 text-gray-600">Schedule Date</Label>
                <div className="relative flex gap-2">
                  <Input
                    id="date"
                    value={value}
                    placeholder="Tomorrow or next week"
                    className="bg-background pr-10 border border-gray-300"
                    onChange={(e) => {
                      setValue(e.target.value);
                      const parsed = parseDate(e.target.value);
                      if (parsed) {
                        setDate(parsed);
                        setMonth(parsed);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setOpen(true);
                      }
                    }}
                  />
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" className="absolute top-1/2 right-2 size-6 -translate-y-1/2">
                        <CalendarIcon className="size-3.5" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0 bg-white" align="end">
                      <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        month={month}
                        onMonthChange={setMonth}
                        onSelect={(d) => {
                          if (d) {
                            setDate(d);
                            setValue(formatDate(d));
                            setOpen(false);
                          }
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button onClick={() => setAdding(false)} className="px-3 py-1.5 text-xs text-neutral-950 transition-colors">
              Close
            </button>
            <button type="submit" className="flex items-center gap-1.5 rounded-lg bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors border border-gray-300">
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="my-2 flex w-full items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-neutral-700 transition-colors duration-200"
        >
          <span>Add Task</span>
          <FiPlus />
        </motion.button>
      )}
      <DialogModal title='Label' description='Add a new label' open={openLabelModal} setOpen={setOpenLabelModal}>
        <LabelForm projectId={projectId} setOpenModal={setOpenLabelModal} refetch={refetchLabelData} />
      </DialogModal>
    </>
  );
}
