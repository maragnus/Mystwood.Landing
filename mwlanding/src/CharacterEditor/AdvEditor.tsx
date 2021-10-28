import React from 'react';
import {Box, Grid} from "@mui/material";
import {CharacterEditorPage} from "./CharacterEditorPage";

export default class AdvEditor extends CharacterEditorPage {
    afterChange(state: CharacterEditorPageState, name?: string, value?: string) {
        CharacterSheet.populateVantages(state.sheet);
    }

    render() {
        const sheet = this.state.sheet;

        let warning: any = undefined;
        if (sheet.advantageScore > sheet.disadvantageScore)
            warning =
                <Alert severity="error">You must balance out Advantages with equal or greater Disadvantages.</Alert>
        else if (sheet.advantageScore < sheet.disadvantageScore)
            warning = <Alert severity="info">You have more Disadvantage than Advantage.</Alert>

        const physicalVantages = [...sheet.advantages, ...sheet.disadvantages]
            .map(x => VantageByTitle(`${x.name} ${x.rank}`)).filter(x => x.physical)
            .map(x => <Box component="li" key={x.title}><Chip label={x.title}/></Box>);

        const physicalSection: any = physicalVantages.length === 0 ? undefined :
            <Grid item xs={12} md={12}>
                <Paper>
                    <Typography variant="h6">Supernatural Heritage</Typography>
                    <Box component="ul"
                         sx={{
                             display: 'flex', justifyContent: 'left', flexWrap: 'wrap',
                             listStyle: 'none', p: 1.5, mx: 0, my: 2,
                         }}>
                        {physicalVantages}
                    </Box>
                    <Alert severity="info">The following advantages and disadvantages modify your physical
                        appearance.</Alert>
                </Paper>
            </Grid>;

        return <Box component="form">
            <Grid container spacing={2}>

            </Grid>
        </Box>;
    }
}