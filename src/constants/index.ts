import { SidebarItemType, UrlEnum } from "@/types";
import { ClipboardList, HelpCircle, Home, Settings2, Users2 } from "lucide-react";

export const PRIMARY_SIDEBAR_ITEMS: SidebarItemType[] = [
    {
        title: 'Home',
        url: UrlEnum.home,
        icon: Home,
    },
    {
        title: 'My Tasks',
        url: UrlEnum.task,
        icon: ClipboardList,
    },
    {
        title: 'Settings',
        url: UrlEnum.settings,
        icon: Settings2,
    },
    {
        title: 'Members',
        url: UrlEnum.members,
        icon: Users2,
    },
];

export const SECONDARY_SIDEBAR_ITEMS: SidebarItemType[] = [
    {
        title: "Help & Support",
        icon: HelpCircle,
        url: UrlEnum.default,
    },
];