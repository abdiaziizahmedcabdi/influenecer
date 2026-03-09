import { HERO } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Hero() {
    return (
        <section className="relative z-0 overflow-hidden py-10 sm:py-14 sm:pb-20">

            <Container className="text-center">
                <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-heading sm:text-5xl lg:text-6xl">
                    {HERO.headline}
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-base text-body sm:text-lg">
                    {HERO.subheadline}
                </p>
                <div className="mt-6 flex flex-col items-center gap-3">
                    <a href="#book">
                        <Button size="lg">{HERO.primaryCta}</Button>
                    </a>
                    <p className="text-sm text-body/60">
                        30-minute personalized session · No commitment required
                    </p>
                </div>
            </Container>
        </section>
    );
}
