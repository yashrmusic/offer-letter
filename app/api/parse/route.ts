import { NextRequest, NextResponse } from "next/server";
import { AIService } from "@/lib/services/ai-service";

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();

        if (!prompt || typeof prompt !== "string") {
            return NextResponse.json(
                { success: false, message: "No prompt provided" },
                { status: 400 }
            );
        }

        const aiService = new AIService();
        const candidateData = await aiService.parseCandidatePrompt(prompt);

        return NextResponse.json({ success: true, data: candidateData });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("API Parse Error:", message);
        return NextResponse.json(
            { success: false, message },
            { status: 500 }
        );
    }
}
