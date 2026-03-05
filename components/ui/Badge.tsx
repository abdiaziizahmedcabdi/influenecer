import { cn } from "@/lib/utils";

interface BadgeProps {
    children: React.ReactNode;
    className?: string;
}

export function Badge({ children, className }: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700",
                className
            )}
        >
            {children}
        </span>
    );
}
