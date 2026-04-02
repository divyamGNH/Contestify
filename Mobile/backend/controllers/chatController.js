import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

const normalizeModelName = (model) => {
  if (!model) return "gemini-2.5-flash";
  return model.replace(/^models\//, "");
};

const buildLeetCodePrompt = (userPrompt) => {
  return [
    "You are a competitive programming coach.",
    "Recommend LeetCode questions based on the user input.",
    "Return valid JSON only.",
    "Output format:",
    "{",
    '  "assistantMessage": "short coaching response",',
    '  "recommendations": [',
    "    {",
    '      "title": "string",',
    '      "difficulty": "Easy|Medium|Hard",',
    '      "topics": ["string"],',
    '      "reason": "short reason",',
    '      "url": "https://leetcode.com/problems/.../"',
    "    }",
    "  ]",
    "}",
    "Return 3 to 6 recommendations.",
    "Keep reasons concise and practical.",
    `User input: ${userPrompt}`,
  ].join("\n");
};

const parseModelJson = (rawText) => {
  const cleaned = rawText
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (!match) return null;

    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
};

export const suggestLeetCodeQuestions = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required.",
      });
    }

    if (!GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Gemini API key is not configured.",
      });
    }

    const modelName = normalizeModelName(GEMINI_MODEL);
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;

    const geminiResponse = await axios.post(
      endpoint,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: buildLeetCodePrompt(prompt.trim()) }],
          },
        ],
        generationConfig: {
          temperature: 0.6,
          topP: 0.95,
          maxOutputTokens: 1500,
          responseMimeType: "application/json",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const rawText =
      geminiResponse?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const parsed = parseModelJson(rawText);

    if (!parsed || !Array.isArray(parsed.recommendations)) {
      return res.status(502).json({
        success: false,
        message: "Could not parse recommendations from Gemini response.",
      });
    }

    const recommendations = parsed.recommendations
      .filter((item) => item && item.title)
      .map((item) => ({
        title: String(item.title),
        difficulty: String(item.difficulty || "Medium"),
        topics: Array.isArray(item.topics)
          ? item.topics.map((topic) => String(topic))
          : [],
        reason: String(item.reason || "Recommended based on your input."),
        url: String(item.url || "https://leetcode.com/problemset/"),
      }));

    return res.json({
      success: true,
      data: {
        assistantMessage:
          parsed.assistantMessage ||
          "Here are tailored LeetCode suggestions for your goals.",
        recommendations,
      },
    });
  } catch (error) {
    const status = error?.response?.status || 500;
    const details = error?.response?.data || error.message;
    const providerMessage =
      error?.response?.data?.error?.message ||
      error?.response?.data?.message ||
      error.message;

    return res.status(status).json({
      success: false,
      message: providerMessage || "Failed to generate suggestions.",
      error: details,
    });
  }
};
