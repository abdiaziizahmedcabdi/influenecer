import { cn } from "@/lib/utils";

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export function Card({ children, className }: CardProps) {
    return (
        <div
            className={cn(
                "rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md",
                className
            )}
        >
            {children}
        </div>
    );
}
