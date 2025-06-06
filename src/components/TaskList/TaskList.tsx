// import * as React from 'react';
// import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
// import { ChevronDown, Download, MoreHorizontal, PlusIcon } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
// import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
// import { Input } from '@/components/ui/input';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Task } from './types';
// import { AppBar } from '../AppBar';
// import { Modal } from '../Modal';
// import { TaskListForm } from './components/TaskListForm';
// import { getTasks } from './api/getTasks';
// import { useSelector } from 'react-redux';
// import { AppState } from '@/redux/store';
// import { DateFormater } from '@/lib/DateFormater';
// import { deleteTask } from './api/deleteTask';

// const TaskList: React.FC = () => {
//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
//   const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
//   const [rowSelection, setRowSelection] = React.useState({});
//   const [openModal, setOpenModal] = React.useState(false);
//   const [data, setData] = React.useState<Task[]>([]);
//   const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);

//   const projectId = useSelector((state: AppState) => {
//     return state.selectedProjectId;
//   });

//   const handleDelete = async (task: Task) => {
//     console.log(projectId, selectedTask?.id);
//     const deleteResponse = await deleteTask(projectId, parseInt(task.id.toString()));
//     console.log(deleteResponse);
//     fetchData();
//   };

//   const handleEditTask = (task: Task) => {
//     setSelectedTask(task);
//     setOpenModal(true);
//   };

//   const columns: ColumnDef<Task>[] = [
//     {
//       id: 'select',
//       header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
//       cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
//       enableSorting: false,
//       enableHiding: false,
//     },
//     {
//       accessorKey: 'title',
//       header: 'Title',
//       cell: ({ row }) => <div className="capitalize">{row.getValue('title')}</div>,
//     },
//     {
//       accessorKey: 'status',
//       header: 'Status',
//       cell: ({ row }) => <div className="capitalize">{row.getValue('status')}</div>,
//     },
//     {
//       accessorKey: 'dueDate',
//       header: 'Due Date',
//       cell: ({ row }) => <div className="capitalize">{DateFormater({ dateString: row.getValue('dueDate') })}</div>,
//     },
//     {
//       accessorKey: 'assignee',
//       header: 'Assignee',
//       cell: ({ row }) => <div className="capitalize">{row.getValue('assignee')}</div>,
//     },
//     {
//       accessorKey: 'priority',
//       header: 'Priority',
//       cell: ({ row }) => <div className="capitalize">{row.getValue('priority')}</div>,
//     },
//     {
//       id: 'actions',
//       enableHiding: false,
//       cell: ({ row }) => {
//         const task = row.original;
//         return (
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="h-8 w-8 p-0">
//                 <span className="sr-only">Open menu</span>
//                 <MoreHorizontal />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="bg-white">
//               <DropdownMenuLabel>Actions</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem
//                 onClick={() => {
//                   handleEditTask(task);
//                 }}
//               >
//                 Edit Task
//               </DropdownMenuItem>
//               <DropdownMenuItem
//                 onClick={() => {
//                   handleDelete(task);
//                 }}
//               >
//                 Delete Task
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         );
//       },
//     },
//   ];

//   const fetchData = async () => {
//     const tasks = await getTasks(projectId);
//     setData(tasks);
//   };

//   React.useEffect(() => {
//     fetchData();
//   }, [projectId]);

//   const table = useReactTable({
//     data,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//   });

//   return (
//     <>
//       <div className="min-h-screen w-full px-5">
//         <AppBar
//           title="Tasks"
//           description="Manage your tasks efficiently"
//           buttons={[
//             {
//               title: 'Create Task',
//               onClick: () => {
//                 setSelectedTask(null);
//                 setOpenModal(true);
//               },
//               icon: <PlusIcon size={15} />,
//             },
//             { title: 'Download', onClick: () => {}, icon: <Download size={15} /> },
//           ]}
//         />
//         <div className="flex items-center py-4">
//           <Input placeholder="Filter tasks..." value={(table.getColumn('title')?.getFilterValue() as string) ?? ''} onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)} className="max-w-sm" />
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="ml-auto">
//                 Columns <ChevronDown />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="bg-white">
//               {table
//                 .getAllColumns()
//                 .filter((column) => column.getCanHide())
//                 .map((column) => {
//                   return (
//                     <DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
//                       {column.id}
//                     </DropdownMenuCheckboxItem>
//                   );
//                 })}
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//         <div className="rounded-md border border-2">
//           <Table>
//             <TableHeader>
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <TableRow key={headerGroup.id}>
//                   {headerGroup.headers.map((header) => {
//                     return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
//                   })}
//                 </TableRow>
//               ))}
//             </TableHeader>
//             <TableBody>
//               {table.getRowModel().rows?.length ? (
//                 table.getRowModel().rows.map((row) => (
//                   <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className="cursor-pointer border border-2 border-l-0 border-r-0 border-t-0 border-dashed">
//                     {row.getVisibleCells().map((cell) => (
//                       <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
//                     ))}
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={columns.length} className="h-24 text-center">
//                     No results.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>
//         <div className="flex items-center justify-end space-x-2 py-4">
//           <div className="text-muted-foreground flex-1 text-sm">
//             {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
//           </div>
//           <div className="space-x-2">
//             <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
//               Previous
//             </Button>
//             <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
//               Next
//             </Button>
//           </div>
//         </div>
//       </div>
//       <Modal
//         isOpen={openModal}
//         onClose={() => {
//           setOpenModal(false);
//         }}
//         title={`${selectedTask ? 'Edit' : 'Create'} Task`}
//       >
//         <TaskListForm task={selectedTask} fetchTasks={fetchData} onClose={() => setOpenModal(false)} />
//       </Modal>
//     </>
//   );
// };

// export default TaskList;

export default function TaskList() {
  return (
    <div>TaskList</div>
  )
}
