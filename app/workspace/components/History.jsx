"use client"
import React, { useState } from 'react'
import Image from 'next/image';
import { Button } from '@mui/material';
function History() {
    const [userHistory, SetUserHistory] = useState([]);
    return (
        <div className='mt-5 border rounded-2xl p-5'>
            <h2 className='font-bold text-lg'>Previous History</h2>
            <p>What Your previously work on,You can find here</p>
            {userHistory?.length == 0 &&
                <div>
                    <div className='flex justify-center items-center m-2'>
                        <Image src={'/idea.png'} alt='bulb' width={50} height={50} />
                    </div>
                    <div className='flex justify-center items-center m-2'>
                        <Button variant='contained'>Nothing yet</Button>
                    </div>
                </div>}
        </div>
    )
}

export default History
