import { HistoryTable } from "@/config/scema";
import { inngest } from "./client";
import { createAgent, gemini } from "@inngest/agent-kit";
import ImageKit from "imagekit";
import { db } from "@/config/db";
// Example hello world function
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

// Define AI Career Chat Agent
export const AiCareerChatAgent = createAgent({
  name: "AiCareerChatAgent",
  description: "An AI Agent answers career related questions",
  system: `You are a helpful, professional AI Career Coach Agent. 
  Your role is to guide users with questions related to careers: 
  job search advice, interview preparation, resume improvement, 
  skill development, career transitions, and industry trends. 
  Always respond with clarity, encouragement, and actionable advice 
  tailored to the user's needs. 
  If the user asks something unrelated, politely say you are a career coach 
  and suggest relevant career-focused questions instead.`,
  model: gemini({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GEMINI_KEY,
  }),
});

// Inngest function to run the AI Agent
export const AiCareerAgent = inngest.createFunction(
  { id: "AiCareerAgent" },
  { event: "AiCareerAgent" },
  async ({ event, step }) => {
    const { userInput } = event?.data;
    const result = await AiCareerChatAgent.run(userInput);
    return result;
  }
);

export const AiResumeAnalyzerAgent = createAgent({
  name: "AiResumeAnalyzerAgent",
  description: "AI Resume Analyzer Agent help tp Return Report",
  system: `You are an advanced AI Resume Analyzer Agent.

Your task is to evaluate a candidate's resume and return a detailed analysis in the following structured JSON schema format.

The schema must include:
- overall_score (0-100)
- overall_feedback (short message like “Excellent” or “Needs improvement”)
- summary_comment (1-2 sentence evaluation summary)
- sections:
    - contact_info
    - experience
    - education
    - skills
  Each section includes:
    - score (0-100)
    - optional comment
- tips_for_improvement (3-5)
- whats_good (1-3)
- needs_improvement (1-3)

⚠️ Important: Always output only valid JSON. No extra text.`,
  model: gemini({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GEMINI_KEY,
  }),
});
var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_ENDPOINT_URL,
});
export const AiResumeAgent = inngest.createFunction(
  { id: "AiResumeAgent" },
  { event: "AiResumeAgent" },
  async ({ event, step }) => {
    const { recordId, base64ResumeFile, pdfText, aiAgentType, userEmail } =
      await event.data;

    const uploadFileUrl = await step.run("uploadImage", async () => {
      const imageKitFile = await imagekit.upload({
        file: base64ResumeFile,
        fileName: `${Date.now()}.pdf`,
        isPublished: true,
      });
      return imageKitFile.url;
    });

    const aiResumeReport = await AiResumeAnalyzerAgent.run(pdfText);
    const rawContent = aiResumeReport.output[0].content;
    const rawContentJson = rawContent.replace("```json", "").replace("```", "");
    const parseJson = JSON.parse(rawContentJson);

    const saveToDb = await step.run("SaveToDb", async () => {
      const result = await db.insert(HistoryTable).values({
        recordId: recordId,
        content: parseJson,
        aiAgentType: aiAgentType,
        userEmail: userEmail,
        metadata: uploadFileUrl,
      });
      console.log(result);
    });
    return parseJson;
  }
);

export const AiRoadmapGenratorAgent = createAgent({
  name: "AiRoadmapGenratorAgent",
  description: "Generate Details Tree Like Flow Roadmap",
  system: `Generate a structured learning roadmap in JSON format for the skill:

The roadmap should follow these rules:
- Output ONLY valid JSON, no extra text.
- Title: "roadmapTitle"
- Description: 3–5 lines summary of the roadmap and its purpose.
- Duration: Suggested time to complete the roadmap (e.g., 3 months, 6 months).
- Structure: Multi Edge tree layout (similar to roadmap.sh), arranged top to bottom.
- Each node must include:
  - id: unique string/number
  - type: "turbo"
  - data:
      - title: Name of the step
      - description: Short 1–2 line explanation of what this step covers
      - link: A helpful resource link
  - position: (x, y) coordinates so nodes are spaced properly (y increases as roadmap goes down).
- Branching allowed: If the roadmap diverges into specializations (e.g., Frontend, Backend), create branches with meaningful spacing in X coordinates.
- Edges:
  - id: "e1-2"
  - source: "1"
  - target: "2"

Format Example:
{
  "roadmapTitle": "Frontend Developer Roadmap",
  "description": "This roadmap guides learners from HTML fundamentals to advanced frontend frameworks...",
  "duration": "6 months",
  "initialNodes": [
    {
      "id": "1",
      "type": "turbo",
      "data": {
        "title": "Learn HTML",
        "description": "Covers HTML basics: elements, tags, attributes, and semantic structure.",
        "link": "https://developer.mozilla.org/en-US/docs/Web/HTML"
      },
      "position": { "x": 0, "y": 0 }
    },
    {
      "id": "2",
      "type": "turbo",
      "data": {
        "title": "Learn CSS",
        "description": "Learn styling, layouts, flexbox, grid, and responsive design.",
        "link": "https://developer.mozilla.org/en-US/docs/Web/CSS"
      },
      "position": { "x": 0, "y": 150 }
    }
  ],
  "initialEdges": [
    { "id": "e1-2", "source": "1", "target": "2" }
  ]
}
`,
  model: gemini({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GEMINI_KEY,
  }),
});

export const AiRoadmapAgent = inngest.createFunction(
  { id: "AiRoadmapAgent" },
  { event: "AiRoadmapAgent" },
  async ({ event, step }) => {
    const { roadmapId, userInput, userEmail } = await event?.data;

    const roadmapResult = await AiRoadmapGenratorAgent.run(userInput);

    const rawContent = roadmapResult.output[0].content;
    const rawContentJson = rawContent.replace("```json", "").replace("```", "");
    const parseJson = JSON.parse(rawContentJson);

    const saveToDb = await step.run("SaveToDb", async () => {
      const result = await db.insert(HistoryTable).values({
        recordId: roadmapId,
        content: parseJson,
        aiAgentType: "/workspace/ai-tool/career-roadmap-generator",
        userEmail: userEmail,
        metadata: userInput,
      });
      console.log(result);
    });

    return parseJson;
  }
);
