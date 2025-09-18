'use client'
import { Button } from '@mui/material'
import React from 'react'
import AiTool from './AiiTool'
import History from './History'
function WelcomeBanner() {
    return (
        <div>
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#BE575F] via-[#A338E3] to-[#AC76D6] shadow-md">
                <h2 className="font-bold text-2xl mb-2 text-white">AI Career Coach Agent</h2>
                <p className="text-sm opacity-90 mb-3 text-white">Smarter career decisions start here</p>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "white",
                        color: "black",
                        fontWeight: "bold",
                    }}>Let's Get Started</Button>
            </div>
            <div>
                <AiTool />
                <History />
            </div>
        </div>
    )
}

export default WelcomeBanner
