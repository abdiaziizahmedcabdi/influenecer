import { SITE_NAME } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur">
            <Container className="flex items-center justify-between py-4">
                <span className="text-xl font-bold tracking-tight text-heading">
                    {SITE_NAME}
                </span>

                <div className="hidden sm:block">
                    <a href="#book">
                        <Button size="sm">Book Your Demo</Button>
                    </a>
                </div>
                <div className="sm:hidden">
                    <a href="#book">
                        <Button size="xs">Book Your Demo</Button>
                    </a>
                </div>
            </Container>
        </header>
    );
}
