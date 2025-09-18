import { db } from "@/config/db";
import { usersTable } from "@/config/scema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, name } = body;

        console.log("📥 API Called with:", body);

        const users = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email));
        if (!users || users.length === 0) {
            const res = await db
                .insert(usersTable)
                .values({
                    name,
                    email,
                })
                .returning();

            console.log("✅ User created:", res[0]);
            return NextResponse.json(res[0]);
        }

        console.log("🔁 User exists:", users[0]);
        return NextResponse.json(users[0]);
    } catch (err) {
        console.error(" ERROR:", err.message, err.stack);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
