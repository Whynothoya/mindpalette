const functions = require("firebase-functions");
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.chatAI = functions.https.onRequest(async (req, res) => {
  try {
    const { message, emotion } = req.body;

    const prompt = `
      현재 감정: ${emotion}
      사용자가 말한 내용: ${message}

      아래 규칙을 따라 답하세요:
      - 공감 기반 감정 케어 톤
      - 문장은 너무 길지 않게
      - 마지막에 부드러운 질문 1개 포함 (대화 유지)
      - 이모지 1~2개만 사용
    `;

    const result = await groq.chat.completions.create({
      model: "gemma-7b-it",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    });

    res.json({ reply: result.choices[0].message.content });

  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(500).json({ reply: "잠시 오류가 발생했어요 😢 다시 시도해줄래요?" });
  }
});

