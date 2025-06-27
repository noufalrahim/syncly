import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface BadgeComponentProps {
    title: string;
    icon: LucideIcon;
    bgColor?: string;
    textColor?: string;
}

export default function BadgeComponent({
    title,
    icon: Icon,
    bgColor = "bg-green-100",
    textColor = "text-green-700"
}: BadgeComponentProps) {
    return (
        <span className={cn(
            "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs",
            bgColor,
            textColor
        )}>
            <Icon size={12} />
            {title}
        </span>
    );
}
