'use client'
import { Button } from '@mui/material';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import RoadmapCanvas from './roadmapCanvas';
function AiRoadmapAgent() {
    const { roadmapId } = useParams();
    const [roadmap, setRoadmap] = useState();
    useEffect(() => {
        roadmapId && getRoadmap()
    }, [roadmapId])
    async function getRoadmap() {
        try {
            const result = await axios.get('/api/history?recordId=' + roadmapId);
            setRoadmap(result.data.content);
        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-10'>
            <div className='border rounded-lg p-5 h-fit'>
                <h2 className='text-2xl font-bold'>{roadmap?.roadmapTitle}</h2>
                <p className='mt-3 text-gray-500'>{roadmap?.description}</p>
                <h2 className='text-blue-400 mt-3'>Duration :{roadmap?.duration}</h2>
            </div>
            <div className='md:grid-cols-2'>
                <RoadmapCanvas initialNodes={roadmap?.initialNodes} initialEdges={roadmap?.initialEdges} />

            </div>
        </div>
    )
}

export default AiRoadmapAgent
