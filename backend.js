// index.js

import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";
import { subjectContexts } from "./config/subjectContexts.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.post("/generate", async (req, res) => {
  const { subject, year, topic, count, difficulty } = req.body;

  // ✅ Correct variable usage
  const safeCount = Math.min(Math.max(parseInt(count) || 5, 1), 10);
  const subjectContext = subjectContexts[subject] || "";

  const prompt = `
Return only valid JSON with no explanation.

{
  "questions": ["Question 1", "Question 2", "..."],
  "answers": ["Answer 1", "Answer 2", "..."]
}

Instructions:
- Subject: ${subject}
- Year Group: ${year}
- Topic: ${topic}
- Number of Questions: ${safeCount}
- Difficulty: ${difficulty}
- Context: ${subjectContext}

Design scaffolded, curriculum-aligned questions that build in difficulty. Format in plain English. Return only the JSON block.
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
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

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    const jsonStart = content.indexOf("{");
    const jsonEnd = content.lastIndexOf("}") + 1;
    const cleanJson = content.slice(jsonStart, jsonEnd);
    const parsed = JSON.parse(cleanJson);

    res.json(parsed);
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "Failed to generate worksheet." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
