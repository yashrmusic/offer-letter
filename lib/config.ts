/**
 * Environment Configuration Validator
 * Ensures all required environment variables are present before the app attempts logic.
 */

export const config = {
    openRouterKey: process.env.OPENROUTER_API_KEY,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://structcrew.online",
    siteName: "StructCrew Platform",
};

export function validateConfig() {
    const missing: string[] = [];

    if (!config.openRouterKey) missing.push("OPENROUTER_API_KEY");

    if (missing.length > 0) {
        throw new Error(`CRITICAL: Missing environment variables: ${missing.join(", ")}`);
    }
}
