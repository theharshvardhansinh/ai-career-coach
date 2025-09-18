import { inngest } from "@/inngest/client";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { NextResponse } from "next/server";
import { AiRoadmapAgent } from "@/inngest/functions";
export async function POST(req) {
    const { roadmapId, userInput } = await req.json();
    const user = await currentUser();
    const resultIds = await inngest.send({
        name: 'AiRoadmapAgent',
        data: {
            userInput: userInput,
            roadmapId: roadmapId,
            userEmail: user?.primaryEmailAddress?.emailAddress
        }
    });
    const runId = resultIds?.ids[0];
    let runStatus;
    while (true) {
        runStatus = await getRun(runId);
        if (runStatus?.data[0]?.status == 'Completed')
            break;
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    console.log(
        "Run Output:",
        JSON.stringify(runStatus.data?.[0]?.output, null, 2)
    );

    return NextResponse.json(runStatus.data?.[0]?.output ?? {});
}
export async function getRun(runId) {
    const result = await axios.get(
        `${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`,
        {
            headers: {
                Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
            },
        }
    );

    return result.data;
}