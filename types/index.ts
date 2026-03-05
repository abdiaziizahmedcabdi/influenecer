/* -------------------------------------------------- */
/*  Shared TypeScript interfaces for the landing page  */
/* -------------------------------------------------- */

export interface NavLinkItem {
    label: string;
    href: string;
}

export interface BenefitBlock {
    title: string;
    description: string;
    icon: string; // SVG path or emoji
}

export interface ContactInfo {
    email: string;
    phone: string;
}
