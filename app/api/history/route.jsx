import { db } from "@/config/db";
import { HistoryTable, usersTable } from "@/config/scema";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
export async function POST(req) {
    const { content, recordId, aiAgentType } = await req.json();
    const user = await currentUser();
    try {
        const result = await db.insert(HistoryTable).values({
            recordId: recordId,
            content: content,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            aiAgentType: aiAgentType
        }).returning();
        console.log(result);
        return NextResponse.json({ message: "record added", data: result });
    } catch (e) {
        return NextResponse.json(e);
    }
}

export async function PUT(req) {
    const { content, recordId } = await req.json();
    try {
        const result = await db.update(HistoryTable).set({
            content: content
        }).where(eq(HistoryTable.recordId, recordId)).returning();
        return NextResponse.json({ message: "record added", data: result });
    }
    catch (e) {
        return NextResponse.json(e);
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const recordId = searchParams.get('recordId');
    try {
        if (recordId) {
            const result = await db.select().from(HistoryTable).where(eq(HistoryTable.recordId, recordId));
            console.log(result);
            if (result.length > 0) {
                return NextResponse.json(result[0]);
            }
        }
        return NextResponse.json([]);
    } catch (e) {
        return NextResponse.json(e);
    }
}