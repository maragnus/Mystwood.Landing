import React from 'react';
import {Box, Grid, TextField} from "@mui/material";
import {CharacterEditorPage} from "./CharacterEditorPage";

export default class OtherEditor extends CharacterEditorPage {
    render() {
        const sheet = this.state.sheet;

        return <Box component="form">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField fullWidth multiline id="cures" label="Unusual Features" variant="filled"
                               value={sheet.unusualFeatures} onChange={(e) => this.handleInputChange(e)}/>
                </Grid>

                <Grid item xs={12}>
                    <TextField fullWidth multiline id="cures" label="Cures" variant="filled"
                               value={sheet.cures} onChange={(e) => this.handleInputChange(e)}/>
                </Grid>

                <Grid item xs={12}>
                    <TextField fullWidth multiline id="documents" label="Documents" variant="filled"
                               value={sheet.documents} onChange={(e) => this.handleInputChange(e)}/>
                </Grid>

                <Grid item xs={12}>
                    <TextField fullWidth multiline id="notes" label="Notes" variant="filled"
                               value={sheet.notes} onChange={(e) => this.handleInputChange(e)}/>
                </Grid>

            </Grid>
        </Box>;
    }
}