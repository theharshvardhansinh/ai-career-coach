import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TurboNode from './turboNode';

const nodeType = {
    turbo: TurboNode
}
export default function RoadmapCanvas({ initialEdges, initialNodes }) {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={initialNodes}
                edges={initialEdges}
                nodeTypes={nodeType}
            />
        </div>
    );
}