import React from 'react';
import {Alert, Box, Grid} from "@mui/material";
import {CharacterEditorPage} from "./Common/CharacterEditorPage";

export default class SpellsEditor extends CharacterEditorPage {
    render() {
        return <Box component="form">
            <Grid container spacing={2}>
                <Grid item>
                    <Alert severity="info">Spells are not implemented</Alert>
                </Grid>
            </Grid>
        </Box>;
    }
}