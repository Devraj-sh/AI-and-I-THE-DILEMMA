import { auth } from "@/auth";
import sql from "@/app/api/utils/sql";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const skills = await sql`
      SELECT * FROM user_skills WHERE user_id = ${session.user.id}
      ORDER BY skill_name
    `;

    return Response.json({ skills });
  } catch (error) {
    console.error("Error fetching skills:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { skill_updates } = await request.json();

    // Update multiple skills in a transaction
    const results = await sql.transaction(
      skill_updates.map(({ skill_name, skill_value }) => 
        sql`
          INSERT INTO user_skills (user_id, skill_name, skill_value)
          VALUES (${session.user.id}, ${skill_name}, ${skill_value})
          ON CONFLICT (user_id, skill_name) 
          DO UPDATE SET skill_value = ${skill_value}, updated_at = NOW()
          RETURNING *
        `
      )
    );

    return Response.json({ skills: results.flat() });
  } catch (error) {
    console.error("Error updating skills:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}