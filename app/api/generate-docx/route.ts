import { NextRequest, NextResponse } from "next/server";
import { DOCXService } from "@/lib/services/docx-service";
import { CandidateData } from "@/types";

export async function POST(req: NextRequest) {
    try {
        const candidateData: CandidateData = await req.json();

        if (!candidateData || !candidateData.name) {
            return NextResponse.json(
                { success: false, message: "Missing candidate data" },
                { status: 400 }
            );
        }

        const docxService = new DOCXService();
        const buf = await docxService.generateOfferLetter(candidateData);

        const nameClean = candidateData.name.replace(/\s+/g, "_");
        const filename = `offer_letter_${nameClean}.docx`;

        return new NextResponse(new Uint8Array(buf), {
            status: 200,
            headers: {
                "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "Content-Disposition": `attachment; filename="${filename}"`,
            },
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("DOCX Generation Error:", message);
        return NextResponse.json(
            { success: false, message },
            { status: 500 }
        );
    }
}
