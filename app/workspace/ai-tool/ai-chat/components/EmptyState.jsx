"use client"
import React, { useState } from 'react'
const questionList = [
    "What skills do I need for a data analyst role?",
    "How do I switch careers to UX design?"
]
function EmptyState({ setQuetion }) {
    return (
        <div>
            <h2 className='font-bold text-xl  text-center'>Ask anything to AI career Agent</h2>
            <div >
                {questionList.map((que, idx) => (
                    <div key={idx} className='border cursor-pointer hover:shadow-lg my-4 text-center p-4 rounded-2xl' onClick={() => setQuetion(que)}>{que}</div>
                ))}
            </div>
        </div>
    )
}

export default EmptyState
