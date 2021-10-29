import {Character} from "../../Session/Session";
import {useHistory} from "react-router-dom";
import {Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";

function SubmittedModal(props: { character: Character }) {
    const history = useHistory();

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
        history.push('/characters');
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
                <h2 id="child-modal-title">Draft Already Submitted</h2>
                <p id="child-modal-description">
                    You have already submitted the draft for {props.character.name}?
                </p>
                <p>
                    You cannot make changes to your character until it has been reviewed.
                    Your draft has been submitted for approval. If approved, the draft
                    will be closed and the changes applied to your character sheet.
                </p>
                <Button onClick={handleExit} sx={{mx: 1}}>Cancel</Button>
            </Box>
        </Modal>
    );
}

export default ContinueDraftModal;