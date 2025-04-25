import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient } from "mongodb";
import { subjectContexts } from "./config/subjectContexts.js";

dotenv.config();
console.log("🔍 Loaded MONGO_URI:", process.env.MONGO_URI?.slice(0, 40) + "...");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

// ✅ MongoDB Setup
const mongoUri = process.env.MONGO_URI;
const client = new MongoClient(mongoUri, { ssl: true });
const dbName = "AI-worksheet-gen";
let db;

// 🔢 Estimate token count
function estimateTokens(text) {
  const words = text.split(/\s+/).length;
  return Math.ceil(words / 0.75); // ~0.75 words/token
}

// 📝 Worksheet Generation Endpoint
app.post("/generate", async (req, res) => {
  const { subject, year, topic, difficulty, count } = req.body;
  const safeCount = Math.min(Math.max(parseInt(count) || 5, 1), 10);
  const subjectContext = subjectContexts[subject] || "";
  const timestamp = new Date();
  const start = performance.now();

  const prompt = `
You are an experienced teacher. Create exactly ${safeCount} scaffolded, curriculum-aligned questions for a worksheet on the topic "${topic}" for ${year} students in ${subject}.

Requirements:
- Difficulty: ${difficulty}
- Context: ${subjectContext}
- Format must be valid JSON only. No explanations or extra text.

Respond ONLY with a JSON object using this format:

{
  "questions": ["Question 1", "Question 2", "..."],
  "answers": ["Answer 1", "Answer 2", "..."]
}
`;

  try {
    const openAIRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    if (!openAIRes.ok) {
      const errorText = await openAIRes.text();
      console.error("❌ OpenAI API error:", openAIRes.status, errorText);
      return res.status(500).json({ error: "OpenAI API request failed" });
    }

    const data = await openAIRes.json();
    const content = data.choices?.[0]?.message?.content || "";
    console.log("🔍 OpenAI content:", content.slice(0, 300));

    if (!content.includes("{")) {
      console.error("❌ No JSON found in response.");
      return res.status(500).json({ error: "OpenAI returned invalid content." });
    }

    let parsed;
    try {
      const jsonStart = content.indexOf("{");
      const jsonEnd = content.lastIndexOf("}") + 1;
      parsed = JSON.parse(content.slice(jsonStart, jsonEnd));
    } catch (parseErr) {
      console.error("❌ Failed to parse OpenAI JSON:", parseErr.message);
      return res.status(500).json({ error: "Failed to parse AI response." });
    }

    // ✂️ Trim questions and answers to exact count
    const trimmed = {
      questions: parsed?.questions?.slice(0, safeCount) || [],
      answers: parsed?.answers?.slice(0, safeCount) || []
    };

    const duration = performance.now() - start;
    const tokens = estimateTokens(prompt + content);
    const cost = tokens / 1000 * 0.0015;

    await db.collection("sessions").insertOne({
      timestamp,
      subject,
      year,
      topic,
      difficulty,
      count: safeCount,
      durationMs: duration,
      estimatedTokens: tokens,
      estimatedCostUSD: cost,
      promptPreview: prompt.slice(0, 300),
      questionsGenerated: trimmed.questions.length
    });

    res.json(trimmed);
  } catch (err) {
    console.error("❌ Error generating worksheet:", err);
    res.status(500).json({ error: "Failed to generate worksheet." });
  }
});

// 💬 Feedback Submission
app.post("/feedback", async (req, res) => {
  const { rating, comment, topic, subject, year } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Invalid rating" });
  }

  try {
    await db.collection("feedback").insertOne({
      timestamp: new Date(),
      rating,
      comment: comment || "",
      topic,
      subject,
      year
    });

    res.status(200).json({ message: "Feedback recorded" });
  } catch (err) {
    console.error("❌ Feedback error:", err);
    res.status(500).json({ error: "Could not save feedback" });
  }
});

// 🚀 Launch server after DB connection
async function startServer() {
  try {
    await client.connect();
    db = client.db(dbName);
    console.log("✅ Connected to MongoDB Atlas (via working config)");
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
}

startServer();
