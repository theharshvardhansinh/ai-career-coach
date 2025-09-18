import { inngest } from '@/inngest/client';
import { currentUser } from '@clerk/nextjs/server';
import { WebPDFLoader } from '@langchain/community/document_loaders/web/pdf'
import axios from 'axios';
import { NextResponse } from 'next/server';
export async function POST(req) {
    const Formdata = await req.formData();
    const resumeFile = Formdata.get('resumeFile');
    const recordId = Formdata.get('recordid');
    const user = await currentUser();
    const loader = new WebPDFLoader(resumeFile);
    const docs = await loader.load();
    console.log(docs[0]);

    const arrayBuffer = await resumeFile.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    try {
        const resultIds = await inngest.send({
            name: 'AiResumeAgent',
            data: {
                recordId: recordId,
                base64ResumeFile: base64,
                pdfText: docs[0]?.pageContent,
                aiAgentType: '/workspace/ai-tool/ai-resume-analyzer',
                userEmail: user?.primaryEmailAddress?.emailAddress
            },
        });
        const runId = resultIds?.ids[0];
        let runStatus;
        while (true) {
            runStatus = await getRun(runId);
            if (runStatus?.data[0]?.status == 'Completed')
                break;
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        return NextResponse.json(runStatus.data?.[0]?.output ?? {});
    }
    catch (e) {
        return console.log(e);
    }
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