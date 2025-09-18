import { Handle, Position } from '@xyflow/react'
import React from 'react'
import Link from 'next/link'
function TurboNode({ data }) {
    return (
        <div className='rounded-lg border-gray-300 bg-yellow-50 shadow-sm w-64'>
            <div className='font-bold text-lg text-gray-800'>{data.title}</div>
            <p className='text-sm text-gray-500 mt-2 line-clamp-2'>{data.description}</p>
            <Link href={data?.link} className='text-blue-600 underline text-sm mt-2 inline-block'>Learn More</Link>
            <Handle type='target' position={Position.Top} />
            <Handle type='trget' position={Position.Bottom} />
        </div>
    )
}

export default TurboNode
