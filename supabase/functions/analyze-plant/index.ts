
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const systemPrompt = `
You are an expert agricultural scientist and plant pathologist
specializing in crop diseases common in India.

Analyze the provided plant image and return ONLY valid JSON
with this exact structure:

{
  "isHealthy": true,
  "diseaseName": "",
  "confidence": 0.95,
  "description": "Detailed plant condition",
  "cures": [
    {
      "name": "Treatment name",
      "description": "How to apply the treatment",
      "isRecommended": true,
      "reason": "Why this treatment is recommended"
    }
  ]
}

Consider Rice Blast, Bacterial Leaf Blight, Late Blight,
Cotton Leaf Curl, Wheat Rust, Powdery Mildew, Downy Mildew,
Fusarium Wilt and Anthracnose.

Provide practical treatments, including organic options.
Do not invent a diagnosis if the image is unclear.
Explain uncertainty in the description.
Confidence must be between 0 and 1.
Return JSON only, without Markdown.
`;

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { image } = await req.json();

    if (!image || typeof image !== "string") {
      throw new Error("No valid image provided");
    }

    const apiKey = Deno.env.get("GEMINI_API_KEY");

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    // Extract image MIME type and Base64 data.
    const imageMatch = image.match(
      /^data:(image\/[a-zA-Z0-9.+-]+);base64,([\s\S]+)$/
    );

    if (!imageMatch) {
      throw new Error("Invalid image format");
    }

    const mimeType = imageMatch[1];
    const base64Data = imageMatch[2];

    const supportedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/heic",
      "image/heif",
      "image/gif",
      "image/avif",
    ];

    if (!supportedTypes.includes(mimeType)) {
      throw new Error("Unsupported image format");
    }

    console.log("Analyzing plant image with Gemini...");

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: "Analyze this plant image and provide its disease diagnosis and treatment recommendations.",
                },
                {
                  inlineData: {
                    mimeType: mimeType,
                    data: base64Data,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.2,
          },
        }),
      }
    );

    if (!response.ok) {
  const errorText = await response.text();

  console.error("Gemini API Status:", response.status);
  console.error("Gemini API Response:", errorText);

  throw new Error(
    `Gemini API Error ${response.status}: ${errorText}`
  );
}

    const aiResponse = await response.json();

    const content = aiResponse.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text || "")
      .join("");

    if (!content) {
      throw new Error("Gemini returned an empty response");
    }

    const analysisResult = JSON.parse(content);

    if (
      typeof analysisResult.isHealthy !== "boolean" ||
      typeof analysisResult.confidence !== "number" ||
      typeof analysisResult.description !== "string" ||
      !Array.isArray(analysisResult.cures)
    ) {
      throw new Error("Invalid diagnosis format returned by Gemini");
    }

    const result = {
      isHealthy: analysisResult.isHealthy,
      diseaseName: analysisResult.diseaseName || "",
      confidence: Math.max(
        0,
        Math.min(1, analysisResult.confidence)
      ),
      description: analysisResult.description,
      cures: analysisResult.cures,
    };

    return new Response(JSON.stringify(result), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });

  } catch (error) {
    console.error("Plant analysis error:", error);

    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Unknown error occurred",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
