import { CandidateData, TemplateId } from "../../types";
import { AVAILABLE_TEMPLATES, COMPANY_MAPPINGS, DEFAULT_TEMPLATE } from "../constants";
import { config, validateConfig } from "../config";

const SYSTEM_PROMPT = `You are a high-end HR Intelligence Agent for StructCrew. Your task is to extract candidate data from unstructured text and map it to the correct company template.

CRITICAL COMPANY MAPPING RULES:
1. "Hookkapaani", "Hookkapani", "HK", "Hookkapaani Studios" MUST map to template ID: "hookkapaani". 
2. "Melange" MUST map to template ID: "melange".
3. "Decoarte" MUST map to template ID: "decoarte".
4. "Urbanmistrii", "Urban Mistrii" MUST map to template ID: "urbanmistrii".
5. For "Melange" or "Urbanmistrii", if the position is senior (e.g. Senior, Manager, Director, Lead, VP, Chief), use the "_senior" suffix (e.g. "melange_senior").

If you pick "melange" when the text says "Hookkapaani", you have failed. Be extremely precise.

JSON Fields to extract:
- name: Full name
- email: Email address (or "")
- phone: Phone number (or "")
- position: Job title
- start_date: Joining date (e.g. "1 March, 2026")
- salary: Monthly salary string (e.g. "45,000")
- company: Exact company name from text
- template: One of: ${AVAILABLE_TEMPLATES.join(", ")}

Output ONLY raw JSON.`;

export class AIService {
    private apiKey: string;

    constructor() {
        validateConfig();
        this.apiKey = config.openRouterKey!;
    }

    async parseCandidatePrompt(prompt: string): Promise<CandidateData> {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": config.siteUrl,
                "X-Title": config.siteName,
            },
            body: JSON.stringify({
                model: "google/gemini-2.0-flash-001",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: `Candidate Text: ${prompt}` },
                ],
                temperature: 0.1,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error?.error?.message || "AI parsing failed");
        }

        const result = await response.json();
        let text = result.choices?.[0]?.message?.content?.trim() || "";

        // Clean JSON
        if (text.startsWith("```json")) text = text.slice(7);
        if (text.startsWith("```")) text = text.slice(3);
        if (text.endsWith("```")) text = text.slice(0, -3);
        text = text.trim();

        const parsed = JSON.parse(text);

        // Final sanity check for template
        const companyLower = parsed.company?.toLowerCase() || "";
        for (const [key, val] of Object.entries(COMPANY_MAPPINGS)) {
            if (companyLower.includes(key)) {
                parsed.template = val;
                // Senior logic fallback
                if (this.isSenior(parsed.position) && (val === "melange" || val === "urbanmistrii")) {
                    parsed.template = `${val}_senior` as TemplateId;
                }
                break;
            }
        }

        if (!AVAILABLE_TEMPLATES.includes(parsed.template)) {
            parsed.template = DEFAULT_TEMPLATE;
        }

        return parsed as CandidateData;
    }

    private isSenior(position: string): boolean {
        const seniorKeywords = ["senior", "lead", "manager", "director", "head", "vp", "chief", "principal"];
        const pos = position.toLowerCase();
        return seniorKeywords.some(key => pos.includes(key));
    }
}
