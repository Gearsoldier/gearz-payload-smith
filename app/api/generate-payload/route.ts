// app/api/generate-payload/route.ts
import { NextResponse } from "next/server";
import { getAIClient } from "@/lib/ai";

export async function POST(req: Request) {
  const { prompt, mode } = await req.json();
  const model = "llama3";

  const systemPrompt = `You are PayloadSmith, an elite AI that generates precise payloads for ethical hacking.
You provide 3–5 payloads per request based on the vulnerability description.
Mode: ${mode} (Beginner or Advanced)
Respond ONLY with payloads in plain text list format.`;

  const client = getAIClient(model);
  const response = await client.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ],
    model,
  });

  const text = response.choices?.[0]?.message?.content || "No payloads found.";
  return NextResponse.json({ payloads: text.split("\n").filter(p => p.trim()) });
}
