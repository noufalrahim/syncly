import { BadgeComponent } from "@/components/BadgeComponent";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Edit3, Tag } from "lucide-react";

export default function SettingsOverview() {
    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
            <div className="border-b border-dashed border-gray-400 pb-3 mb-4 flex items-start justify-between">
                <div>
                    <p className="text-xl font-semibold text-gray-800">Overview</p>
                    <p className="text-sm text-gray-600 mt-1 max-w-3xl">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies cursus nisl, nec rutrum libero facilisis sit amet.
                        Vestibulum consectetur, urna in euismod ultrices, purus erat egestas nulla, ut faucibus nulla urna sed massa.
                    </p>
                </div>
                <div className="bg-white border border-gray-300 hover:bg-gray-200 px-3 py-1.5 rounded-md flex items-center gap-2 cursor-pointer">
                    <Edit3 size={16} className="text-gray-700" />
                    <span className="text-gray-700 text-sm">Edit</span>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-700">
                <div className="flex items-center gap-4">
                    <span className="font-medium text-gray-500 w-28">Created By</span>
                    <div className="flex items-center gap-2 text-gray-700">
                        <Avatar className="w-6 h-6 bg-gray-300 text-gray-800">
                            <AvatarFallback className="text-xs">N</AvatarFallback>
                        </Avatar>
                        <span>Noufal Rahim</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <span className="font-medium text-gray-500 w-28">Due Date</span>
                    <span className="text-amber-600">Oct 12, Mon</span>
                </div>

                <div className="flex items-center gap-4">
                    <span className="font-medium text-gray-500 w-28">Status</span>
                    <span className="text-green-600 font-medium">In Progress</span>
                </div>

                <div className="flex items-center gap-4">
                    <span className="font-medium text-gray-500 w-28">Last Updated</span>
                    <span className="text-gray-600">Jun 26, 2025</span>
                </div>

                <div className="flex items-start gap-4">
                    <span className="font-medium text-gray-500 w-28 mt-1">Team</span>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <Avatar className="w-5 h-5 bg-gray-200 text-gray-800">
                                <AvatarFallback className="text-xs">A</AvatarFallback>
                            </Avatar>
                            <span>Ali John</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Avatar className="w-5 h-5 bg-gray-200 text-gray-800">
                                <AvatarFallback className="text-xs">S</AvatarFallback>
                            </Avatar>
                            <span>Sarah Mathews</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <span className="font-medium text-gray-500 w-28">Tags</span>
                    <div className="flex flex-wrap gap-2">
                        <BadgeComponent title={"React"} icon={Tag} bgColor={"bg-blue-100"} textColor={"text-blue-700"}/>
                        <BadgeComponent title={"Frontend"} icon={Tag} bgColor={"bg-green-100"} textColor={"text-green-700"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
