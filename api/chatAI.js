import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req, res) {
  try {
    const { message, emotion } = req.body;

    const prompt = `
    현재 감정: ${emotion}
    사용자가 말한 내용: ${message}
    친구처럼 다정하게 응답해줘.
    마지막 문장은 질문으로 끝내줘.
    이모지는 2개 이하로 사용.
    `;

    const result = await groq.chat.completions.create({
      model: "gemma-7b-it",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    res.status(200).json({ reply: result.choices[0].message.content });

  } catch (e) {
    res.status(500).json({ reply: "지금은 대답할 수 없어 😢" });
  }
}
