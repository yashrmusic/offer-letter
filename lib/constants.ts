import { TemplateId } from "@/types";

export const AVAILABLE_TEMPLATES: TemplateId[] = [
    "hookkapaani",
    "decoarte",
    "melange",
    "melange_senior",
    "urbanmistrii",
    "urbanmistrii_senior",
];

export const COMPANY_MAPPINGS: Record<string, TemplateId> = {
    "hookkapaani": "hookkapaani",
    "hookkapani": "hookkapaani",
    "hookkapaani studios": "hookkapaani",
    "decoarte": "decoarte",
    "melange": "melange",
    "urbanmistrii": "urbanmistrii",
    "urban mistrii": "urbanmistrii",
    "urbanmistri": "urbanmistrii",
};

export const DEFAULT_TEMPLATE: TemplateId = "hookkapaani";
