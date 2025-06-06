import { SidebarItemType, UrlEnum } from "@/types";
import { BellIcon, ClipboardList, HelpCircle, Home, Inbox, Settings } from "lucide-react";

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
        title: 'Inbox',
        url: UrlEnum.inbox,
        icon: Inbox,
    },
    {
        title: 'Notifications',
        url: UrlEnum.notification,
        icon: BellIcon,
    },
];

export const SECONDARY_SIDEBAR_ITEMS: SidebarItemType[] = [
    {
        title: "Settings",
        icon: Settings,
        url: UrlEnum.default,
    },
    {
        title: "Help & Support",
        icon: HelpCircle,
        url: UrlEnum.default,
    },
];