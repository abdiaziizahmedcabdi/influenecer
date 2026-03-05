import { WHY_BOOK } from "@/lib/constants";
import { Container, SectionTitle } from "@/components/ui";

function BenefitIcon({ type }: { type: string }) {
    const iconClass = "w-8 h-8 text-accent";

    if (type === "chart") {
        return (
            <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
        );
    }
    if (type === "globe") {
        return (
            <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.467.732-3.558" />
            </svg>
        );
    }
    // trending
    return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.28m5.94 2.28-2.28 5.941" />
        </svg>
    );
}

export function WhyBookDemo() {
    return (
        <section id="why-book" className="py-28 sm:py-32">
            <Container>
                <SectionTitle
                    title="Why Book a Demo?"
                    subtitle="See first-hand how we solve real operational challenges."
                />
                <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {WHY_BOOK.map((benefit) => (
                        <div
                            key={benefit.title}
                            className="flex flex-col items-start gap-4 rounded-xl border border-border bg-white p-8 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-accent/50 hover:shadow-sm"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-accent/5">
                                <BenefitIcon type={benefit.icon} />
                            </div>
                            <h3 className="text-lg font-semibold text-heading">
                                {benefit.title}
                            </h3>
                            <p className="text-sm text-body leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
