import { SITE_NAME } from "@/lib/constants";
import { Container } from "@/components/ui";

export function Footer() {
    return (
        <footer className="border-t border-border py-8">
            <Container>
                <p className="text-center text-xs text-body/60">
                    &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
                </p>
            </Container>
        </footer>
    );
}
