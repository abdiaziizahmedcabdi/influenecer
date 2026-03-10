import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
    size?: "xs" | "sm" | "md" | "lg";
}

export function Button({
    variant = "primary",
    size = "md",
    className,
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 ease-in-out cursor-pointer",
                variant === "primary" &&
                "bg-accent text-white hover:bg-neutral-800",
                variant === "secondary" &&
                "border border-border bg-transparent text-heading hover:bg-gray-50",
                size === "xs" && "px-3 py-1.5 text-xs",
                size === "sm" && "px-4 py-2 text-sm",
                size === "md" && "px-6 py-3 text-base",
                size === "lg" && "px-8 py-3.5 text-lg",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
