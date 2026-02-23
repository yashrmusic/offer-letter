import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import * as fs from "fs";
import * as path from "path";
import { CandidateData } from "../types";

export class DOCXService {
    async generateOfferLetter(candidateData: CandidateData): Promise<Buffer> {
        const templateId = candidateData.template || "hookkapaani";

        // Path resolution: logic for production-ready path handling
        const templatePath = path.join(process.cwd(), "templates", templateId, "offer_template.docx");
        const fallbackPath = path.join(process.cwd(), "templates", "offer_template.docx");

        const finalPath = fs.existsSync(templatePath) ? templatePath : fallbackPath;

        if (!fs.existsSync(finalPath)) {
            throw new Error(`Offer template not found at ${finalPath}`);
        }

        const templateContent = fs.readFileSync(finalPath, "binary");
        const zip = new PizZip(templateContent);

        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
            delimiters: { start: "{{", end: "}}" },
        });

        const now = new Date();
        const currentDate = now.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        const data = {
            "Candidate Name": candidateData.name,
            "CANDIDATE_NAME": candidateData.name,
            "Job Title": candidateData.position,
            "JOB_TITLE": candidateData.position,
            "Joining Date": candidateData.start_date,
            "JOINING_DATE": candidateData.start_date,
            "Probation Monthly Salary": candidateData.salary,
            "MONTHLY_SALARY": candidateData.salary,
            "Probation Period Months": candidateData.probation_period || "3",
            "Probation period": candidateData.probation_period || "3",
            "Current Date": currentDate,
            "CURRENT_DATE": currentDate,
            "Interview Date": candidateData.test_date || currentDate,
            "INTERVIEW_DATE": candidateData.test_date || currentDate,
            "Acceptance Date": "",
            "Offer Validity Days": "7",
            "OFFER_EXPIRY_DAYS": "7",
            "ongoing_salary": candidateData.ongoing_salary || candidateData.salary,
            "ONGOING_SALARY": candidateData.ongoing_salary || candidateData.salary,
            "company": candidateData.company || "StructCrew",
            "COMPANY": candidateData.company || "StructCrew",
        };

        doc.render(data);

        return doc.getZip().generate({
            type: "nodebuffer",
            compression: "DEFLATE",
        });
    }
}
