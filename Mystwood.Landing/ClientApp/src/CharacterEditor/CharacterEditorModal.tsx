import * as React from "react";
import { useNavigate  } from "react-router-dom";
import {Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function CharacterEditorModal(props: { children: React.ReactNode }) {
    const navigate = useNavigate();

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    function handleExit(): void {
        navigate('/characters');
    }

    return (
        <Modal
            hideBackdrop
            open={true}
            onClose={handleExit}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box sx={{...style}}>
                <h2 id="child-modal-title">Draft Changes to Character?</h2>
                {props.children}
                <Button onClick={handleExit} sx={{mx: 1}}>Cancel</Button>
            </Box>
        </Modal>
    );
}