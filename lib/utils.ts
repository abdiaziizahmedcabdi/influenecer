/**
 * Utility: conditional class-name joiner.
 * Filters out falsy values and joins the rest with a space.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
    return classes.filter(Boolean).join(" ");
}
