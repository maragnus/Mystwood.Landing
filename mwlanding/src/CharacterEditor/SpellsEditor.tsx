import React from 'react';
import {
    Autocomplete,
    Box,
    Card, CardContent,
    CardHeader,
    Divider,
    Grid,
    IconButton,
    TextField,
    Typography
} from "@mui/material";
import {CharacterEditorPage} from "./Common/CharacterEditorPage";
import {Spell, SpellByName, Spells} from "../Reference/Spells";
import {Close} from "@mui/icons-material";

export default class SpellsEditor extends CharacterEditorPage {
    render() {
        const sheet = this.state.sheet;

        const spells: Spell[] = sheet.spells.map(x => SpellByName(x));
        const availableSpells = Spells.filter(s => !sheet.spells.some(name => s.name === name));

        const addSpell = (spell: Spell): void => {
            this.handleChange("spells", [...sheet.spells, spell.name]);
            this.savePage();
        };

        const spellCards = spells.map(x => (
            <Grid item xs={6} sm={4} md={3} sx={{m: -0.5}}>
                <Card sx={{height: "100%"}}>
                    <CardHeader
                        action={
                            <IconButton aria-label="settings">
                                <Close/>
                            </IconButton>
                        }
                        title={x.name}
                        subheader={`${x.type}, ${x.mana} Mana`}
                    />
                    <CardContent>{x.effect}</CardContent>
                </Card>
            </Grid>
        ));

        return <Box component="form">
            <Grid container spacing={2} alignItems="stretch" justifyContent="flex-start" sx={{gap: "10px"}}>
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{pt: 2}}>Add Spell</Typography>
                    <Autocomplete
                        id="spells" sx={{my: 2}}
                        options={availableSpells}
                        getOptionLabel={(option) => option.name}
                        groupBy={(o) => o.category}
                        onChange={(e, value?: any) => addSpell(value as Spell)}
                        renderInput={(params) => (
                            <TextField {...params} variant="filled" label="Add Spell"
                                      helperText="Search in this box to add a spell"
                            />
                        )}
                    />
                    <Divider/>
                </Grid>
                {spellCards}
            </Grid>

        </Box>;
    }
}