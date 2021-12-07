import {Character} from "../../Session/Session";
import { useNavigate  } from "react-router-dom";
import {Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";

function StartDraftModal(props: { character: Character, onEdit: () => void }) {
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
                <p id="child-modal-description">
                    Would you like to start a new draft of changes to {props.character.name}?
                </p>
                <p>
                    Once you complete your draft, you can submit your changes for review. If approved, the draft
                    will be closed and the changes applied to your character sheet. You can pause and resume your
                    draft at any time.
                </p>
                <Button onClick={props.onEdit} variant="contained" sx={{mx: 1}}>Make Changes</Button>
                <Button onClick={handleExit} sx={{mx: 1}}>Cancel</Button>
            </Box>
        </Modal>
    );
}

export default StartDraftModal;