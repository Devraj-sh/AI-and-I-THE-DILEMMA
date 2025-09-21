import { auth } from "@/auth";
import sql from "@/app/api/utils/sql";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessions = await sql`
      SELECT * FROM game_sessions 
      WHERE user_id = ${session.user.id}
      ORDER BY completed_at DESC
      LIMIT 20
    `;

    return Response.json({ sessions });
  } catch (error) {
    console.error("Error fetching game sessions:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { 
      game_type, 
      mode, 
      score, 
      ai_score, 
      responses, 
      ai_explanations, 
      duration_seconds 
    } = await request.json();

    const gameSession = await sql`
      INSERT INTO game_sessions 
      (user_id, game_type, mode, score, ai_score, responses, ai_explanations, duration_seconds)
      VALUES (${session.user.id}, ${game_type}, ${mode}, ${score}, ${ai_score}, 
              ${JSON.stringify(responses)}, ${JSON.stringify(ai_explanations)}, ${duration_seconds})
      RETURNING *
    `;

    return Response.json({ session: gameSession[0] });
  } catch (error) {
    console.error("Error saving game session:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}