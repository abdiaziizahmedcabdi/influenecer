"use client";

import React, { useEffect, useMemo, useState } from "react";

type AvailabilityResponse = {
    ok: boolean;
    date: string;
    timeZone: string;
    slots: string[];
    error?: string;
};

type BookResponse =
    | { ok: true; meetLink?: string; eventId?: string }
    | { ok?: false; error: string };

function pad2(n: number) {
    return String(n).padStart(2, "0");
}

function toYMD(d: Date) {
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function startOfMonth(d: Date) {
    return new Date(d.getFullYear(), d.getMonth(), 1);
}

function endOfMonth(d: Date) {
    return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

function addMonths(d: Date, m: number) {
    return new Date(d.getFullYear(), d.getMonth() + m, 1);
}

function getMonthGrid(d: Date) {
    const first = startOfMonth(d);
    const last = endOfMonth(d);

    const startWeekday = first.getDay();
    const daysInMonth = last.getDate();

    const cells: (Date | null)[] = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let day = 1; day <= daysInMonth; day++) {
        cells.push(new Date(d.getFullYear(), d.getMonth(), day));
    }
    while (cells.length < 42) cells.push(null);

    const weeks: (Date | null)[][] = [];
    for (let i = 0; i < 6; i++) {
        weeks.push(cells.slice(i * 7, i * 7 + 7));
    }
    return weeks;
}

function formatTimeLocal(iso: string) {
    const dt = new Date(iso);
    return dt.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export function DemoBooking() {
    const [month, setMonth] = useState(() => startOfMonth(new Date()));
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedSlotISO, setSelectedSlotISO] = useState<string | null>(null);

    const [loadingSlots, setLoadingSlots] = useState(false);
    const [slots, setSlots] = useState<string[]>([]);
    const [timeZone, setTimeZone] = useState<string>("Africa/Nairobi");
    const [slotsError, setSlotsError] = useState<string | null>(null);

    const [step, setStep] = useState<"pick" | "details" | "success">("pick");

    const [meetingType, setMeetingType] = useState<"office" | "video">("office");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [companySize, setCompanySize] = useState("");
    const [role, setRole] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [challenge, setChallenge] = useState("");

    const [booking, setBooking] = useState(false);
    const [bookError, setBookError] = useState<string | null>(null);
    const [meetLink, setMeetLink] = useState<string | null>(null);

    const weeks = useMemo(() => getMonthGrid(month), [month]);
    const selectedYMD = useMemo(
        () => (selectedDate ? toYMD(selectedDate) : null),
        [selectedDate]
    );

    async function fetchSlots(dateYMD: string) {
        setLoadingSlots(true);
        setSlotsError(null);
        setSlots([]);
        setSelectedSlotISO(null);

        try {
            const res = await fetch(
                `/api/booking/availability?date=${encodeURIComponent(dateYMD)}`,
                {
                    method: "GET",
                    cache: "no-store",
                }
            );
            const data = (await res.json()) as AvailabilityResponse;

            if (!res.ok || !data.ok) {
                setSlotsError(data.error || "Failed to load availability.");
                return;
            }

            setTimeZone(data.timeZone || "Africa/Nairobi");
            setSlots(Array.isArray(data.slots) ? data.slots : []);
        } catch {
            setSlotsError("Network error while loading availability.");
        } finally {
            setLoadingSlots(false);
        }
    }

    useEffect(() => {
        if (selectedYMD) fetchSlots(selectedYMD);
    }, [selectedYMD]);

    async function submitBooking() {
        if (!selectedSlotISO) return;

        setBooking(true);
        setBookError(null);

        try {
            const res = await fetch("/api/booking/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    startISO: selectedSlotISO,
                    meetingType,
                    name,
                    email,
                    company,
                    companySize,
                    role,
                    whatsapp,
                    challenge,
                }),
            });

            const data = (await res.json()) as BookResponse;

            if (!res.ok || !("ok" in data) || data.ok !== true) {
                setBookError((data as any)?.error || "Booking failed.");
                return;
            }

            setMeetLink(data.meetLink || null);
            setStep("success");
        } catch {
            setBookError("Network error while booking.");
        } finally {
            setBooking(false);
        }
    }

    const canContinueToDetails = Boolean(selectedSlotISO);

    const canConfirm =
        Boolean(selectedSlotISO) &&
        name.trim().length >= 2 &&
        email.includes("@") &&
        company.trim().length >= 2 &&
        whatsapp.trim().length >= 6;

    const monthLabel = month.toLocaleDateString([], {
        month: "long",
        year: "numeric",
    });

    return (
        <section id="book" className="w-full py-12 bg-[#f8fafc]">
            <div className="mx-auto max-w-4xl px-4">
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold text-neutral-900">Book a Demo</h2>
                    <p className="mt-1 text-sm text-neutral-600">
                        Pick a time that works for you. In-office or Microsoft Teams.
                    </p>
                </div>

                {step !== "success" && (
                    <div className="mb-4 flex items-center gap-2 text-xs text-neutral-500">
                        <span
                            className={`rounded-full px-2 py-1 ${step === "pick" ? "bg-heading text-white" : "bg-accent-light text-body/80"
                                }`}
                        >
                            1. Date & Time
                        </span>
                        <span
                            className={`rounded-full px-2 py-1 ${step === "details" ? "bg-heading text-white" : "bg-accent-light text-body/80"
                                }`}
                        >
                            2. Your Details
                        </span>
                        <span
                            className="rounded-full px-2 py-1 bg-accent-light text-body/80"
                        >
                            3. Confirmed
                        </span>
                    </div>
                )}

                <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                    {step === "pick" && (
                        <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
                            {/* Calendar */}
                            <div className="rounded-xl border border-neutral-200 p-4">
                                <div className="mb-3 flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={() => setMonth((m) => addMonths(m, -1))}
                                        className="rounded-md border border-neutral-200 px-2 py-1 text-sm hover:bg-neutral-50"
                                    >
                                        ←
                                    </button>

                                    <div className="text-sm font-medium">{monthLabel}</div>

                                    <button
                                        type="button"
                                        onClick={() => setMonth((m) => addMonths(m, 1))}
                                        className="rounded-md border border-neutral-200 px-2 py-1 text-sm hover:bg-neutral-50"
                                    >
                                        →
                                    </button>
                                </div>

                                <div className="grid grid-cols-7 gap-1 text-center text-xs text-neutral-500">
                                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                                        <div key={d} className="py-1">
                                            {d}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-2 grid grid-cols-7 gap-1">
                                    {weeks.flat().map((cell, idx) => {
                                        if (!cell) return <div key={idx} className="h-9" />;

                                        const isSelected =
                                            selectedDate && toYMD(cell) === toYMD(selectedDate);

                                        const today = new Date();
                                        today.setHours(0, 0, 0, 0);
                                        const isPast = cell < today;

                                        return (
                                            <button
                                                key={idx}
                                                type="button"
                                                disabled={isPast}
                                                onClick={() => {
                                                    if (!isPast) {
                                                        setSelectedDate(cell);
                                                        setStep("pick");
                                                    }
                                                }}
                                                className={`h-9 rounded-md text-sm transition ${isPast
                                                    ? "opacity-30 cursor-not-allowed bg-transparent"
                                                    : isSelected
                                                        ? "bg-heading text-white"
                                                        : "border border-transparent hover:border-neutral-200 hover:bg-neutral-50"
                                                    }`}
                                            >
                                                {cell.getDate()}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="mt-4 rounded-lg bg-neutral-50 p-3">
                                    <div className="text-xs text-neutral-500">Selected</div>
                                    <div className="mt-1 text-sm font-medium text-neutral-800">
                                        {selectedDate
                                            ? selectedDate.toLocaleDateString([], {
                                                weekday: "long",
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })
                                            : "No date selected"}
                                    </div>
                                </div>
                            </div>

                            {/* Times */}
                            <div className="rounded-xl border border-neutral-200 p-4">
                                <div className="mb-3 text-sm font-medium">Available times</div>

                                {loadingSlots && (
                                    <div className="space-y-2">
                                        {Array.from({ length: 4 }).map((_, i) => (
                                            <div
                                                key={i}
                                                className="h-10 animate-pulse rounded-md bg-accent-light text-body/80"
                                            />
                                        ))}
                                    </div>
                                )}

                                {!loadingSlots && slotsError && (
                                    <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                                        {slotsError}
                                    </div>
                                )}

                                {!loadingSlots && !slotsError && slots.length === 0 && (
                                    <div className="rounded-md border border-neutral-200 bg-neutral-100 p-4 text-center">
                                        <p className="font-semibold text-neutral-800">This day is fully booked.</p>
                                        <p className="mt-1 text-sm text-neutral-600">Please select another date from the calendar to see available times.</p>
                                    </div>
                                )}

                                {!loadingSlots && !slotsError && slots.length > 0 && (
                                    <div className="space-y-2">
                                        {slots.map((iso) => {
                                            const active = selectedSlotISO === iso;
                                            return (
                                                <button
                                                    key={iso}
                                                    type="button"
                                                    onClick={() => setSelectedSlotISO(iso)}
                                                    className={`flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm ${active
                                                        ? "border-heading bg-heading text-white"
                                                        : "border-neutral-200 hover:bg-neutral-50"
                                                        }`}
                                                >
                                                    <span>{formatTimeLocal(iso)}</span>
                                                    <span className={active ? "text-white/80" : "text-neutral-500"}>
                                                        Select
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        disabled={!canContinueToDetails}
                                        onClick={() => setStep("details")}
                                        className={`w-full rounded-lg px-4 py-2 text-sm font-medium ${canContinueToDetails
                                            ? "bg-accent text-white hover:bg-heading"
                                            : "cursor-not-allowed bg-neutral-200 text-neutral-500"
                                            }`}
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === "details" && (
                        <div className="mx-auto max-w-2xl">
                            <div className="mb-5 rounded-lg bg-neutral-50 p-3 text-sm text-neutral-700">
                                <div>
                                    <span className="font-medium">Selected:</span>{" "}
                                    {selectedDate?.toLocaleDateString([], {
                                        weekday: "short",
                                        month: "short",
                                        day: "numeric",
                                    })}{" "}
                                    at {selectedSlotISO ? formatTimeLocal(selectedSlotISO) : ""}
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label className="mb-1 block text-sm font-medium text-neutral-700">
                                        Meeting type
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setMeetingType("office")}
                                            className={`rounded-lg border px-3 py-2 text-sm ${meetingType === "office"
                                                ? "border-heading bg-heading text-white"
                                                : "border-neutral-200 hover:bg-neutral-50"
                                                }`}
                                        >
                                            In-office
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setMeetingType("video")}
                                            className={`rounded-lg border px-3 py-2 text-sm ${meetingType === "video"
                                                ? "border-heading bg-heading text-white"
                                                : "border-neutral-200 hover:bg-neutral-50"
                                                }`}
                                        >
                                            Microsoft Teams
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-neutral-700">
                                        Full name
                                    </label>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-heading"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-neutral-700">
                                        Email
                                    </label>
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-heading"
                                        placeholder="you@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-neutral-700">
                                        Company
                                    </label>
                                    <input
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-heading"
                                        placeholder="Company name"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-neutral-700">
                                        Company size
                                    </label>
                                    <select
                                        value={companySize}
                                        onChange={(e) => setCompanySize(e.target.value)}
                                        className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-heading"
                                    >
                                        <option value="">Select...</option>
                                        <option value="1-10">1–10</option>
                                        <option value="11-50">11–50</option>
                                        <option value="51-200">51–200</option>
                                        <option value="200+">200+</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-neutral-700">
                                        Role / Title
                                    </label>
                                    <input
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-heading"
                                        placeholder="CEO, Manager..."
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-neutral-700">
                                        WhatsApp
                                    </label>
                                    <input
                                        value={whatsapp}
                                        onChange={(e) => setWhatsapp(e.target.value)}
                                        className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-heading"
                                        placeholder="+252..."
                                    />
                                </div>

                                {/* ADDED CAQABAD FIELD */}
                                <div className="sm:col-span-2">
                                    <label className="mb-1 block text-sm font-medium text-neutral-700">
                                        What is your biggest challenge / caqabad right now?
                                    </label>
                                    <textarea
                                        value={challenge}
                                        onChange={(e) => setChallenge(e.target.value)}
                                        rows={3}
                                        className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-heading resize-none"
                                        placeholder="Tell us about the problems you are trying to solve..."
                                    />
                                </div>
                            </div>

                            {bookError && (
                                <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                                    {bookError}
                                </div>
                            )}

                            <div className="mt-6 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setStep("pick")}
                                    className="rounded-lg border border-neutral-200 px-4 py-2 text-sm hover:bg-neutral-50"
                                >
                                    Back
                                </button>

                                <button
                                    type="button"
                                    disabled={!canConfirm || booking}
                                    onClick={submitBooking}
                                    className={`rounded-lg px-4 py-2 text-sm font-medium flex-1 ${canConfirm && !booking
                                        ? "bg-accent text-white hover:bg-heading"
                                        : "cursor-not-allowed bg-neutral-200 text-neutral-500"
                                        }`}
                                >
                                    {booking ? "Booking..." : "Confirm booking"}
                                </button>
                            </div>
                        </div>
                    )}

                    {step === "success" && (
                        <div className="mx-auto max-w-2xl text-center">
                            <h3 className="text-xl font-semibold text-neutral-900">
                                You’re booked ✅
                            </h3>

                            <p className="mt-3 text-sm text-neutral-600">
                                Your meeting has been scheduled successfully.
                            </p>

                            {meetLink && (
                                <div className="mt-5 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-left">
                                    <div className="text-xs font-medium text-neutral-500">
                                        Microsoft Teams Link
                                    </div>
                                    <a
                                        className="mt-2 block break-all text-sm font-medium text-[#3E6E9E] underline"
                                        href={meetLink}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {meetLink}
                                    </a>
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={() => {
                                    setStep("pick");
                                    setSelectedSlotISO(null);
                                    setMeetLink(null);
                                    setBookError(null);
                                    setMeetingType("office");
                                    setName("");
                                    setEmail("");
                                    setCompany("");
                                    setCompanySize("");
                                    setRole("");
                                    setWhatsapp("");
                                    setChallenge("");
                                    if (selectedYMD) fetchSlots(selectedYMD);
                                }}
                                className="mt-6 rounded-lg bg-[#3E6E9E] px-4 py-2 text-sm font-medium text-white hover:bg-[#355F8A]"
                            >
                                Book another time
                            </button>
                        </div>
                    )}
                </div>

                <div className="mt-6 text-center text-sm font-medium text-body/80">
                    Free personalized strategy session Secure and confidential.
                </div>
            </div>
        </section>
    );
}