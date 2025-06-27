import { MoreVerticalIcon, Trash2, UserCog, UserPlus } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SettingsPeopleList() {
    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
            <div className="border-b border-dashed border-gray-400 pb-3 mb-4 flex items-center justify-between">
                <p className="text-xl font-semibold text-gray-800">Team</p>
                <div className="bg-white border border-gray-300 hover:bg-gray-200 px-3 py-1.5 rounded-md flex items-center gap-2 cursor-pointer">
                    <UserPlus size={16} className="text-gray-700" />
                    <span className="text-gray-700 text-sm">Add Member</span>
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/3">Member</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Joined On</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6 bg-gray-300 text-gray-700">
                                    <AvatarFallback className="text-xs">
                                        N
                                    </AvatarFallback>
                                </Avatar>
                                <span className="font-semibold text-sm">Noufal Rahim</span>
                            </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">noufal@nitc.ac.in</TableCell>
                        <TableCell className="text-sm text-green-700 font-medium">Admin</TableCell>
                        <TableCell className="text-sm text-gray-500">May 22, 2025</TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="p-1 rounded-full hover:bg-gray-300 cursor-pointer inline-block">
                                        <MoreVerticalIcon size={20} className="text-gray-700" />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-44 bg-white" align="end">
                                    <DropdownMenuItem onClick={() => console.log('change-role')} className="flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
                                        <UserCog size={16} />
                                        <span>Change Role</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => console.log('remove-user')} className="flex items-center gap-2 text-red-500 hover:bg-red-100 cursor-pointer">
                                        <Trash2 size={16} />
                                        <span>Remove</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>

                    {/* Example of another member */}
                    <TableRow>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6 bg-gray-300 text-gray-700">
                                    <AvatarFallback className="text-xs">
                                        A
                                    </AvatarFallback>
                                </Avatar>
                                <span className="font-semibold text-sm">Aisha Khan</span>
                            </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">aisha@example.com</TableCell>
                        <TableCell className="text-sm text-blue-700 font-medium">Editor</TableCell>
                        <TableCell className="text-sm text-gray-500">Jun 10, 2025</TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="p-1 rounded-full hover:bg-gray-300 cursor-pointer inline-block">
                                        <MoreVerticalIcon size={20} className="text-gray-700" />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-44 bg-white" align="end">
                                    <DropdownMenuItem onClick={() => console.log('change-role')} className="flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
                                        <UserCog size={16} />
                                        <span>Change Role</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => console.log('remove-user')} className="flex items-center gap-2 text-red-500 hover:bg-red-100 cursor-pointer">
                                        <Trash2 size={16} />
                                        <span>Remove</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
