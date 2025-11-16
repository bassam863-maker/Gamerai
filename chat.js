import { OpenAI } from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {
    const { game, question } = req.body;

    const client = new OpenAI({
      baseURL: "https://api.aimlapi.com/v1",
      apiKey: process.env.AIML_API_KEY
    });

    const result = await client.chat.completions.create({
      model: "deepseek/deepseek-chat",
      messages: [
        { role: "system", content: "You are a gaming assistant." },
        { role: "user", content: `Game: ${game}. Question: ${question}` }
      ],
    });

    const answer = result.choices[0].message.content;
    res.status(200).json({ answer });
  } catch (e) {
    res.status(500).json({ error: "server error", details: e.toString() });
  }
}
