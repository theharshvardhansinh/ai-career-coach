import * as React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    Typography,
    Box,
} from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { useRouter } from "next/navigation";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ResumeUploadDialog() {
    const [open, setOpen] = React.useState(false);
    const [file, setFile] = React.useState(null);
    const fileInputRef = React.useRef(null);
    const router = useRouter();
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setFile(null);
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (file) {
            const recordId = uuidv4();
            const formData = new FormData();
            formData.append('recordid', recordId);
            formData.append('resumeFile', file);
            // formData.append('aiAgentType', 'workspace/ai-tool/ai-resume-analyzer')
            try {
                const result = await axios.post('/api/ai-resume-agent', formData);
                console.log(result.data);
            } catch (e) {
                console.log("not run" + e);
            }
            //alert(`Uploaded: ${file.name}`);
            setOpen(false);
            router.push('/workspace/ai-tool/ai-resume-analyzer/' + recordId);
        }
    };

    return (
        <>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{ px: 3 }}
                className="w-full">
                Upload Resume
            </Button>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Upload Your Resume</DialogTitle>
                <DialogContent>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        p={3}
                        sx={{
                            border: "2px dashed #1976d2",
                            borderRadius: "12px",
                            textAlign: "center",
                        }}
                    >
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                        <Button
                            variant="outlined"
                            onClick={() => fileInputRef.current.click()}
                            sx={{ borderRadius: 2 }}
                        >
                            Choose File
                        </Button>

                        {file ? (
                            <Typography mt={2} fontWeight="bold" color="green">
                                ✅ {file.name}
                            </Typography>
                        ) : (
                            <Typography mt={2} color="text.secondary">
                                No file selected
                            </Typography>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleUpload}
                        disabled={!file}
                    >
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
