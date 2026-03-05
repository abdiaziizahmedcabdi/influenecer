import Image from "next/image";
import { Container, SectionTitle } from "@/components/ui";

const PLATFORM_FEATURES = [
    {
        title: "My Shops",
        description:
            "Manage all your stores from a single, unified screen.",
        icon: "shops",
    },
    {
        title: "Order Management",
        description:
            "Real-time tracking and fulfillment for every order.",
        icon: "orders",
    },
    {
        title: "Staff Management",
        description:
            "Full control over your team's access and performance.",
        icon: "staff",
    },
    {
        title: "Customer Insight",
        description:
            "Deep analytics on every customer to drive loyalty and repeat sales.",
        icon: "customers",
    },
    {
        title: "Revenue Analytics",
        description:
            "Visual data charts showing your profit margins and growth trends.",
        icon: "analytics",
    },
    {
        title: "Finance & PayPoint",
        description:
            "Track payments, refunds, and taxes with support for 6 payment methods.",
        icon: "finance",
    },
];

function FeatureIcon({ type }: { type: string }) {
    const iconClass = "w-6 h-6 text-accent";

    if (type === "shops") {
        return (
            <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
            </svg>
        );
    }
    if (type === "orders") {
        return (
            <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
            </svg>
        );
    }
    if (type === "staff") {
        return (
            <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
        );
    }
    if (type === "customers") {
        return (
            <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
            </svg>
        );
    }
    if (type === "analytics") {
        return (
            <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
        );
    }
    // finance
    return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
        </svg>
    );
}

export function PlatformShowcase() {
    return (
        <section id="platform" className="pt-10 pb-20 sm:pt-14 sm:pb-28 relative z-0 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[100px] -z-10 -translate-y-1/2 -translate-x-1/4 animate-fade-in"></div>

            <Container>
                <SectionTitle
                    title="One Platform. Total Command."
                    subtitle="Complete operational visibility across every part of your business."
                />

                {/* Platform image in a sleek, modern monitor mockup */}
                <div className="mt-8 flex justify-center relative z-10 group cursor-default">
                    <div className="relative w-full max-w-4xl px-4 sm:px-0 transition-transform duration-500 ease-out group-hover:-translate-y-2">
                        {/* Monitor frame (Sleek dark mode edge) */}
                        <div className="rounded-xl border border-heading/10 bg-[#0f1115] shadow-2xl overflow-hidden ring-4 ring-[#0f1115]/5 relative z-10 transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(46,109,174,0.3)] group-hover:border-accent/40 group-hover:ring-accent/10">
                            {/* Browser bar (Modern Chrome/Edge hybrid) */}
                            <div className="flex flex-col bg-[#dee1e6]">
                                {/* Tabs area */}
                                <div className="flex items-end px-3 pt-2 gap-2 h-10">
                                    <div className="flex items-center gap-1.5 px-2 pb-2 self-center">
                                        <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#ff5f56]/20"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#ffbd2e]/20"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#27c93f]/20"></div>
                                    </div>
                                    {/* Active Tab */}
                                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-t-lg shadow-[0_-2px_6px_rgba(0,0,0,0.02)] relative w-48 z-10">
                                        <div className="w-4 h-4 rounded bg-accent/10 flex items-center justify-center shrink-0">
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent"><path d="M13.5 10.5L21 3" /><path d="M16 3h5v5" /><path d="M21 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h5" /></svg>
                                        </div>
                                        <span className="text-xs text-[#3c4043] font-medium truncate">Tocktify</span>
                                        {/* Left tab curve */}
                                        <svg className="absolute w-2 h-2 text-white -left-2 bottom-0 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path d="M10 10H0C5.52285 10 10 5.52285 10 0V10Z" /></svg>
                                        {/* Right tab curve */}
                                        <svg className="absolute w-2 h-2 text-white -right-2 bottom-0 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path d="M0 10H10C4.47715 10 0 5.52285 0 0V10Z" /></svg>
                                    </div>
                                    <div className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-black/5 mb-1 cursor-pointer transition-colors">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
                                    </div>
                                </div>

                                {/* URL Bar area */}
                                <div className="flex items-center gap-3 bg-white px-4 py-2 border-b border-[#e5e5e5]">
                                    <div className="flex gap-4 text-[#5f6368]">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bdc1c6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6" /><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
                                    </div>
                                    <div className="flex-1 flex items-center gap-2 rounded-full bg-[#f1f3f4] px-4 py-1.5 text-sm text-[#202124] border border-transparent focus-within:bg-white focus-within:border-accent/40 focus-within:shadow-[0_0_0_2px_rgba(46,109,174,0.1)] transition-all">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                        <span className="font-mono mt-[1px]">app.tocktify.com</span>
                                    </div>
                                </div>
                            </div>

                            {/* Screenshot */}
                            <div className="bg-white border-t border-[#e2e8f0]">
                                <Image
                                    src="/platform-dashboard.png"
                                    alt="Tocktify platform dashboard"
                                    width={1200}
                                    height={700}
                                    className="w-full h-auto object-cover object-top"
                                    priority
                                />
                            </div>

                            {/* Bottom Monitor Bezel */}
                            <div className="h-6 bg-[#0f1115] w-full border-t border-white/5 relative flex items-center justify-center">
                                <div className="h-1 w-1 rounded-full bg-white/20 absolute right-6"></div>
                            </div>
                        </div>

                        {/* Elegant Monitor Stand */}
                        <div className="flex flex-col items-center relative z-0 -mt-2">
                            <div className="h-12 w-24 bg-gradient-to-b from-[#1c1d21] to-[#2c2f33] border-x border-[#3c4043] relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                            </div>
                            <div className="h-3 w-56 rounded-t-xl bg-gradient-to-b from-[#3c4043] to-[#2c2f33] shadow-[0_10px_20px_rgba(0,0,0,0.25)] border-t border-[#5f6368]/50 border-x border-[#1c1d21]"></div>
                        </div>
                    </div>
                </div>

                {/* Feature grid */}
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
                    {PLATFORM_FEATURES.map((feature, index) => (
                        <div
                            key={feature.title}
                            className="group flex items-start gap-4 rounded-xl border border-border bg-white p-5 transition-all duration-300 ease-out hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1"
                        >
                            {/* Icon */}
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-light transition-all duration-300 group-hover:bg-accent/15 group-hover:shadow-[0_0_20px_rgba(46,109,174,0.3)] group-hover:scale-110">
                                <FeatureIcon type={feature.icon} />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-heading">
                                    {feature.title}
                                </h3>
                                <p className="mt-1 text-xs leading-relaxed text-body">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
