import { SITE_NAME } from "@/lib/constants";

interface LogoProps {
    className?: string;
}

export function Logo({ className }: LogoProps) {
    return (
        <span className={className ?? "text-xl font-bold tracking-tight"}>
            {SITE_NAME}
        </span>
    );
}
