"use client"
import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import EmptyState from '../components/EmptyState';
import { useState } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown'
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

function Aichat() {
    const [que, setQuetion] = useState("");
    const [message, setMessage] = useState([]);
    const [loading, setLoading] = useState(false);
    const { chatid } = useParams();

    async function getMessage() {
        try {
            const result = await axios.get(`/api/history?recordId=${chatid}`);
            setMessage(result.data.content);
            console.log(result.data.content);
        } catch (e) {
            console.log(e);
        }
    }
    async function onSend() {
        try {
            setLoading(true);
            setMessage(prev => [...prev, {
                content: que,
                role: 'user',
                type: 'text'
            }]);
            const result = await axios.post('/api/ai-chat-agent', { userInput: que });
            console.log(result.data);
            setMessage(prev => [...prev, result.data]);
            setLoading(false);
        } catch (err) {
            console.error("Error calling API:", err);
            setLoading(false);
        }
    }
    useEffect(() => {
        message.length > 0 && updatedList();
    }, [message]);
    useEffect(() => {
        chatid && getMessage();
    }, [chatid])
    const updatedList = async () => {
        const result = await axios.put('/api/history', {
            content: message,
            recordId: chatid
        })
    }

    const id = uuidv4();
    const router = useRouter();
    async function newChat() {
        try {
            const result = await axios.post('/api/history', {
                recordId: id,
                content: []
            })
            console.log(result.data);
        }
        catch (e) {
            console.log(e);
        }
        router.replace('/workspace/ai-tool/ai-chat/' + id);
    }
    return (
        <div className='px-10 py-10 md:px-24 lg:px-36 xl:px-48 h-[75vh] overflow-auto'>
            <div className='flex items-center justify-between'>
                <div>
                    <h2 className='font-bold text-lg'>AI Career Q/A Chat</h2>
                    <p className='text-gray-400'>Smarter career decision start here</p>
                </div>
                <Button variant="contained" onClick={() => newChat()}>+ New Chat</Button>
            </div>
            <div className=' flex flex-col h-[80vh]'>
                {message.length == 0 && <div className='mt-3'>
                    <EmptyState setQuetion={setQuetion} />
                </div>}
                <div className='flex-1 mt-3'>
                    {message.length > 0 && message.map((msg, idx) => (
                        <div key={idx} className={`flex mb-2 ${msg.role == 'user' ? 'justify-end' : 'justify-start'}`}>
                            < div className={`p-3 rounded-lg gap-2 ${msg.role == 'user' ? 'bg-gray-200 text-black rounded-lg' : 'bg-gray-50 text-black'}`}>
                                <Markdown>
                                    {msg.content}
                                </Markdown>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-center items-center gap-6 absolute bottom-5 w-[50%]'>
                    <TextField id="outlined-basic" label="Type here" variant="outlined" className="w-full" value={que} onChange={(e) => (setQuetion(e.target.value))} />
                    {loading ? <Button loading variant="outlined">
                        loading...
                    </Button> : <SendIcon onClick={() => onSend()} />}
                </div>
            </div>
        </div >
    )
}

export default Aichat
