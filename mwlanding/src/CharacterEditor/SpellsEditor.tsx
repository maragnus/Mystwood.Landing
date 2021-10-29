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

const styles = {
    card: {
        // Provide some spacing between cards
        margin: 16,

        // Use flex layout with column direction for components in the card
        // (CardContent and CardActions)
        display: "flex",
        flexDirection: "column",

        // Justify the content so that CardContent will always be at the top of the card,
        // and CardActions will be at the bottom
        justifyContent: "space-between"
    }
};

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
            <Grid item sx={{m:1}} xs component={Card}>
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
            </Grid>
        ));

        return <Box component="form">
            <Grid container spacing={0} alignItems="stretch" justifyContent="flex-start" sx={{gap: "10px"}}>
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{pt: 2}}>Purchased</Typography>
                    <Autocomplete
                        id="spells" sx={{my: 2}}
                        options={availableSpells}
                        getOptionLabel={(option) => option.name}
                        groupBy={(o) => o.category}
                        onChange={(e, value?: any) => addSpell(value as Spell)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="Add Spell"
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