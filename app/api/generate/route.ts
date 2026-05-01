import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { notes } = await req.json();

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Turn study notes into short, catchy, easy-to-remember lyrics for students.",
        },
        {
          role: "user",
          content: notes,
        },
      ],
    });

    return Response.json({
      lyrics: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to generate lyrics" },
      { status: 500 }
    );
  }
}