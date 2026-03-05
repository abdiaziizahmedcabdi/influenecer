import { cn } from "@/lib/utils";

interface SectionTitleProps {
    title: string;
    subtitle?: string;
    className?: string;
}

export function SectionTitle({ title, subtitle, className }: SectionTitleProps) {
    return (
        <div className={cn("text-center", className)}>
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            {subtitle && (
                <p className="mt-2 text-lg text-gray-600">{subtitle}</p>
            )}
        </div>
    );
}
