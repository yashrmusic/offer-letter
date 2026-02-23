export type TemplateId =
    | "hookkapaani"
    | "decoarte"
    | "melange"
    | "melange_senior"
    | "urbanmistrii"
    | "urbanmistrii_senior";

export interface CandidateData {
    name: string;
    email: string;
    phone: string;
    position: string;
    start_date: string;
    salary: string;
    company: string;
    template: TemplateId;
    probation_period?: string;
    probation_salary?: string;
    ongoing_salary?: string;
    test_date?: string;
    [key: string]: string | undefined;
}

export interface AIParseResponse {
    success: boolean;
    data?: CandidateData;
    message?: string;
}
