'use client'
import React from 'react'
import Image from 'next/image'
import { Button } from '@mui/material'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Content } from 'next/font/google';
import { useRouter } from 'next/navigation';
import ResumeUploadDialog from './ResumeDail'
import SkillRoadmapDialog from './roadmapDail'
function AiToolCard({ tool, idx }) {
    const id = uuidv4();
    const router = useRouter();
    async function onClickButton() {
        try {
            const result = await axios.post('/api/history', {
                recordId: id,
                content: [],
                aiAgentType: tool.path
            })
            console.log(result.data);
        }
        catch (e) {
            console.log(e);
        }
        router.push(tool.path + '/' + id);
    }
    return (
        <div className='p-3 shadow-lg rounded-lg border-gray-400'>
            <div><Image src={tool.icon} width={50} height={40} alt={tool.name} />
            </div>
            <h2 className='font-bold mt-2'>{tool.name}</h2>
            <p className='text-gray-400 mb-3'>{tool.desc}</p>
            {
                tool.name !== 'AI Resume Analyzer' && tool.name !== 'Career Roadmap Generator' ? (
                    <Button
                        variant="contained"
                        className="w-full"
                        onClick={() => onClickButton()}
                    >
                        {tool.button}
                    </Button>
                ) : tool.name === 'AI Resume Analyzer' ? (
                    <ResumeUploadDialog />
                ) : (
                    <SkillRoadmapDialog />
                )
            }

        </div>
    )
}

export default AiToolCard
