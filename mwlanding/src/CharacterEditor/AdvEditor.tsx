import React from 'react';
import {Alert, Autocomplete, Box, Chip, Grid, Paper, TextField, Tooltip, Typography} from "@mui/material";
import {CharacterEditorPage, CharacterEditorPageState} from "./CharacterEditorPage";
import {CharacterSheet} from "../Reference/CharacterSheet";
import {Advantages, Disadvantages, VantageByTitle} from "../Reference/Advantages";
import {Score} from "./Common/Score";

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
            <Box sx={{p: 1.5, m: 2}}>
                <Box sx={{
                    display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
                }} component="div">

                    <Tooltip title="Sum of all advantages" arrow>
                        <Score value={sheet.advantageScore} label="Advantages"/>
                    </Tooltip>

                    <Tooltip title="This is your balance of advantages and disadvantages, it must be zero or negative."
                             arrow>
                        <Score value={sheet.advantageScore - sheet.disadvantageScore}
                               label="Balance" delta={true}/>
                    </Tooltip>

                    <Tooltip title="Sum of all disadvantages" arrow>
                        <Score value={sheet.disadvantageScore} label="Disadvantages"/>
                    </Tooltip>
                </Box>
                {warning}
            </Box>
            <Grid container spacing={2}>
                {physicalSection}

                <Grid item xs={12} md={6}>
                    <Typography variant="h6">Advantages</Typography>

                    <Autocomplete
                        multiple
                        id="advantages" aria-required={true}
                        options={Advantages.map(x => ({name: x.name, rank: x.rank}))}
                        getOptionLabel={(option) => `${option.name} ${option.rank}`}
                        defaultValue={sheet.advantages}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        onChange={(e, value?: any) => this.handleChange("advantages", value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="Advantages"
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h6">Disadvantages</Typography>

                    <Autocomplete
                        multiple
                        id="disadvantages" aria-required={true}
                        options={Disadvantages.map(x => ({name: x.name, rank: x.rank}))}
                        getOptionLabel={(option) => `${option.name} ${option.rank}`}
                        defaultValue={sheet.disadvantages}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        onChange={(e, value?: any) => this.handleChange("disadvantages", value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="Disadvantages"
                            />
                        )}
                    />
                </Grid>
            </Grid>
        </Box>;
    }
}