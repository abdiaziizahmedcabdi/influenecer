import { TRUST } from "@/lib/constants";
import { Container } from "@/components/ui";

export function TrustReassurance() {
    return (
        <section className="py-8">
            <Container className="text-center">
                <div className="mx-auto flex max-w-xl items-center justify-center gap-3">
                    <svg
                        className="h-6 w-6 shrink-0 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                        />
                    </svg>
                    <p className="text-sm text-body sm:text-base">{TRUST}</p>
                </div>
            </Container>
        </section>
    );
}
