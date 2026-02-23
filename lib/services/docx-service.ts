import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import * as fs from "fs";
import * as path from "path";
import { CandidateData } from "../../types";

export class DOCXService {
    async generateOfferLetter(candidateData: CandidateData): Promise<Buffer> {
        const templateId = candidateData.template || "hookkapaani";
        const companyDir = path.join(process.cwd(), "templates", templateId);

        console.log(`[DOCX] Processing template for ID: "${templateId}"`);

        let finalPath = "";

        // Branded Template Discovery (Priority: Largest .docx file in company dir)
        if (fs.existsSync(companyDir)) {
            const files = fs.readdirSync(companyDir)
                .filter(f => f.toLowerCase().endsWith(".docx"))
                .map(f => ({
                    name: f,
                    path: path.join(companyDir, f),
                    size: fs.statSync(path.join(companyDir, f)).size
                }))
                .sort((a, b) => b.size - a.size); // Largest first

            if (files.length > 0) {
                finalPath = files[0].path;
                console.log(`[DOCX] Found ${files.length} potential templates. Selected largest: "${files[0].name}" (${files[0].size} bytes)`);
            }
        }

        // Fallback to default if no company-specific template found
        if (!finalPath || !fs.existsSync(finalPath)) {
            finalPath = path.join(process.cwd(), "templates", "offer_template.docx");
            console.log(`[DOCX] No company-specific template found. Using default fallback.`);
        }

        if (!fs.existsSync(finalPath)) {
            throw new Error(`Offer template not found for ${templateId}`);
        }

        const fileStats = fs.statSync(finalPath);
        console.log(`[DOCX] FINAL template path: "${finalPath}"`);
        console.log(`[DOCX] FINAL template size: ${fileStats.size} bytes`);

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
