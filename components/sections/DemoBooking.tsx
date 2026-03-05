"use client";

export function DemoBooking() {
    const url = process.env.NEXT_PUBLIC_BOOKINGS_URL;

    return (
        <section id="book" className="w-full py-6">
            <div className="mx-auto max-w-5xl px-4">
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                    <h2 className="text-2xl font-semibold">Book a Demo</h2>
                    <p className="mt-2 text-sm text-neutral-600">
                        Choose a time for an in-office meeting or a Microsoft Teams call. You’ll get confirmation + reminders automatically.
                    </p>

                    {!url ? (
                        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                            Missing <code>NEXT_PUBLIC_BOOKINGS_URL</code> in <code>.env.local</code>
                        </div>
                    ) : (
                        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <a
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-5 py-3 text-sm font-medium text-white hover:bg-neutral-800"
                            >
                                Book a Demo
                            </a>

                            <span className="text-xs text-neutral-500">
                                Opens Microsoft Bookings (Teams + Outlook)
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}