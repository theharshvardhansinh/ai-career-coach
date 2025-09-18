'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function SkillRoadmapDialog() {
    const [open, setOpen] = React.useState(false);
    const [skill, setSkill] = React.useState('');

    const router = useRouter();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSkill('');
    };

    const handleSubmit = async () => {

        const roadmapId = uuidv4();
        console.log(roadmapId, skill);
        try {
            const result = await axios.post('/api/ai-roadmap-agent', {
                roadmapId,
                userInput: skill,
            });

            console.log("Roadmap generated:", result.data);
            handleClose();
            router.push('/workspace/ai-tool/ai-roadmap-agent/' + roadmapId)
        } catch (e) {
            console.error("Error generating roadmap:", e);
            handleClose();
        }
    };

    return (
        <React.Fragment>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Generate Skill Roadmap
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter Your Skill</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter a skill (e.g., React, Node.js, Python) to get a learning roadmap.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="skill"
                        name="skill"
                        label="Skill"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={skill}
                        onChange={(e) => setSkill(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="skill-form" onClick={handleSubmit}>
                        Generate
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
