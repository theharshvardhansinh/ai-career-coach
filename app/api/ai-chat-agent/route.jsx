import { NextResponse } from "next/server";
import { inngest } from "@/inngest/client";
import axios from "axios";
import { AiCareerAgent } from "@/inngest/functions";

export async function POST(req) {
    const { userInput } = await req.json();
    const resultIds = await inngest.send({
        name: 'AiCareerAgent',
        data: {
            userInput: userInput
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
    return NextResponse.json(runStatus.data?.[0].output?.output[0]);
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