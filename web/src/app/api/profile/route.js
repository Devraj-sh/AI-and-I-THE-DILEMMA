import { auth } from "@/auth";
import sql from "@/app/api/utils/sql";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profiles = await sql`
      SELECT * FROM user_profiles WHERE user_id = ${session.user.id}
    `;

    if (profiles.length === 0) {
      return Response.json({ profile: null });
    }

    return Response.json({ profile: profiles[0] });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { nickname, avatar_url, age_group, parental_consent } = await request.json();

    // Check if profile already exists
    const existingProfiles = await sql`
      SELECT id FROM user_profiles WHERE user_id = ${session.user.id}
    `;

    let profile;
    if (existingProfiles.length > 0) {
      // Update existing profile
      const updated = await sql`
        UPDATE user_profiles 
        SET nickname = ${nickname}, avatar_url = ${avatar_url}, age_group = ${age_group}, 
            parental_consent = ${parental_consent}, updated_at = NOW()
        WHERE user_id = ${session.user.id}
        RETURNING *
      `;
      profile = updated[0];
    } else {
      // Create new profile
      const created = await sql`
        INSERT INTO user_profiles (user_id, nickname, avatar_url, age_group, parental_consent)
        VALUES (${session.user.id}, ${nickname}, ${avatar_url}, ${age_group}, ${parental_consent})
        RETURNING *
      `;
      profile = created[0];

      // Initialize default skills
      const defaultSkills = [
        'creativity', 'problem_solving', 'critical_thinking', 'communication',
        'pattern_recognition', 'digital_literacy', 'collaboration', 'adaptability'
      ];

      for (const skill of defaultSkills) {
        await sql`
          INSERT INTO user_skills (user_id, skill_name, skill_value)
          VALUES (${session.user.id}, ${skill}, 0.0)
        `;
      }
    }

    return Response.json({ profile });
  } catch (error) {
    console.error("Error creating/updating profile:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}