import React from 'react'
import AiToolCard from './AiToolCard';

const aiTool = [
    {
        name: 'AI Career Q&A Chat',
        desc: 'Chat with AI Agent',
        icon: '/chatbot.png',
        button: 'Lets chat',
        path: '/workspace/ai-tool/ai-chat'
    },
    {
        name: "AI Resume Analyzer",
        desc: "Improve your resume",
        icon: "/resume.png",
        button: "Analyze Now",
        path: "/workspace/ai-tool/ai-resume-analyzer",
    },
    {
        name: "Career Roadmap Generator",
        desc: "Build your roadmap",
        icon: "/roadmap.png",
        button: "Generate Now",
        path: "/workspace/ai-tool/career-roadmap-generator",
    }
];
function AiTool() {
    return (
        <div className='mt-7 p-6 bg-white border rounded-2xl'>
            <h2 className='font-bold text-lg'>Available AI Tools</h2>
            <p className='mb-4'>Start Building ans Shape Your Career with this ai tool</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                {aiTool.map((tool, idx) => (
                    <AiToolCard tool={tool} key={idx} />
                ))}
            </div>
        </div>
    )
}

export default AiTool
