import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
    size?: "sm" | "md" | "lg";
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
                "bg-accent text-white hover:bg-accent/85 hover:shadow-md",
                variant === "secondary" &&
                "border border-border bg-white text-heading hover:bg-gray-50",
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
