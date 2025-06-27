import { useState } from 'react'
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Check, FlagIcon, GitBranch, Plus, Search } from 'lucide-react';
import { PriorityEnum } from '@/types';
import { priorityFieldsGenerator } from '@/lib';


export default function Toolbar() {
    const [priority] = useState<PriorityEnum | null>(null);

    return (
        <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-1">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search issues..."
                        className="pl-10"
                    />
                </div>
                <div className='gap-2 flex flex-row justify-start items-center'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="bg-white border border-gray-300 shadow-sm py-4" size="sm">
                                <FlagIcon className="text-gray-700" />
                                Priority
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
                                            console.log('priority');
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="bg-white border border-gray-300 shadow-sm py-4" size="sm">
                                <GitBranch className="text-gray-700" />
                                Status
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
                                            console.log('priority');
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
            </div>
            <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create Issue
            </Button>
        </div>
    )
}
