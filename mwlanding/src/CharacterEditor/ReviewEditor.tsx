import React from 'react';
import {Box, Typography} from "@mui/material";
import {CharacterEditorPage} from "./Common/CharacterEditorPage";

export default class ReviewEditor extends CharacterEditorPage {
    render() {

        return <Box component="form">
            <Typography sx={{mt: 2, mb: 1}}>
                Please carefully review your changes before submitting.
            </Typography>
        </Box>;
    }
}