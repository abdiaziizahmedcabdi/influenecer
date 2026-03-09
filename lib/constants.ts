import type { BenefitBlock, ContactInfo } from "@/types";

/* -------------------------------------------------- */
/*  Site-wide                                          */
/* -------------------------------------------------- */

export const SITE_NAME = "Keydsolutions";

/* -------------------------------------------------- */
/*  Hero                                               */
/* -------------------------------------------------- */

export const HERO = {
    headline: "Schedule Your Personalized Demo",
    subheadline:
        "Discover how our toktify platform transforms business operations with real-time intelligence and centralized control.",
    primaryCta: "Book Your Demo",
};

/* -------------------------------------------------- */
/*  Why Book a Demo                                    */
/* -------------------------------------------------- */

export const WHY_BOOK: BenefitBlock[] = [
    {
        title: "Real-Time Operational Insights",
        description:
            "Monitor every aspect of your business as it happens — from sales trends to inventory levels — with live dashboards and instant alerts.",
        icon: "chart",
    },
    {
        title: "Unified Multi-Location Management",
        description:
            "Control all your locations from a single pane of glass. Standardise processes, compare performance, and act fast across every site.",
        icon: "globe",
    },
    {
        title: "Scalable Growth & Financial Intelligence",
        description:
            "Unlock forecasting, margin analysis, and growth modelling tools that scale with you — from a single outlet to a nationwide network.",
        icon: "trending",
    },
];

/* -------------------------------------------------- */
/*  Booking Form                                       */
/* -------------------------------------------------- */

export const BOOKING = {
    title: "Book Your Demo",
    subtitle: "Choose a time that works for you and we'll tailor the session to your business.",
    cta: "Confirm My Demo",
    timeSlots: [
        "9:00 AM",
        "10:00 AM",
        "11:00 AM",
        "1:00 PM",
        "2:00 PM",
        "3:00 PM",
    ],
};

/* -------------------------------------------------- */
/*  Booking restrictions (Calendly-style)             */
/* -------------------------------------------------- */

export const BOOKING_CONFIG = {
    /** Minimum minutes from *now* before a slot is bookable */
    MIN_LEAD_MINUTES: 120, // 2 hours
    /** Maximum days into the future that can be booked */
    MAX_ADVANCE_DAYS: 60,
    /** Work-hour boundaries (24-h) */
    WORK_START_HOUR: 9,
    WORK_END_HOUR: 17,
};

/* -------------------------------------------------- */
/*  Trust Reassurance                                  */
/* -------------------------------------------------- */

export const TRUST =
    "No commitment required. Free 30-minute strategy session. Secure and confidential.";

/* -------------------------------------------------- */
/*  Contact                                            */
/* -------------------------------------------------- */

export const CONTACT: ContactInfo = {
    email: "info@keydsolutions.com",
    phone: "+252 619 921183",
};
