import React from 'react';
import {Autocomplete, Box, Grid, TextField} from "@mui/material";
import CharacterSheet, {HomeChapters, Religions} from '../Reference/CharacterSheet';
import {Enhancements, Occupations, OccupationType} from '../Reference/Occupations';
import {CharacterEditorPage, CharacterEditorPageState} from "./Common/CharacterEditorPage";

const occupationTypes: OccupationType[] = [OccupationType.Youth, OccupationType.Basic, OccupationType.Advanced, OccupationType.Plot];

export default class ProfileEditor extends CharacterEditorPage {
    dutyField: any;
    liveryField: any;
    specialtyField: any;

    afterChange(state: CharacterEditorPageState, name?: string, value?: string) {
        CharacterSheet.populateProfile(state.sheet);
        if (name === "occupation") {
            // this.dutyField.value = state.sheet.duty;
            // this.liveryField.value = state.sheet.livery;
            // this.specialtyField.value = state.sheet.specialty;
        }
    }

    render() {
        const sheet = this.state.sheet;

        return <Box component="form">
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <TextField id="characterName"
                               fullWidth required aria-required={true}
                               label="Character Name"
                               defaultValue={sheet.characterName} variant="standard"
                               onChange={(e) => this.handleInputChange(e)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Autocomplete
                        id="occupation" aria-required={true}
                        options={Occupations.sort((a, b) => occupationTypes.indexOf(a.type) - occupationTypes.indexOf(b.type))}
                        groupBy={(option) => option.type as string}
                        getOptionLabel={(option) => option.name ?? ""}
                        value={Occupations.find(item => item.name === sheet.occupation?.name)}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        onChange={(e, value?: any) => this.handleChange("occupation", value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="Occupation"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Autocomplete
                        id="specialty" aria-required={true}
                        options={sheet.specialties}
                        value={sheet.specialty}
                        onChange={(e, value?: any) => this.handleChange("specialty", value)}
                        ref={x => this.specialtyField = x}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="Occupational Specialty"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Autocomplete
                        id="enhancement"
                        options={Enhancements}
                        getOptionLabel={(option) => option.name ?? ""}
                        value={Enhancements.find(item => item.name === sheet.enhancement?.name)}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        onChange={(e, value?: any) => this.handleChange("enhancement", value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="Occupational Enhancement"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Autocomplete
                        id="home"
                        options={HomeChapters} aria-required={true}
                        getOptionLabel={(option) => option.title ?? ""}
                        value={HomeChapters.find(item => item.name === sheet.homeChapter?.name)}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        onChange={(e, value?: any) => this.handleChange("homeChapter", value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="Home Chapter"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth multiline id="duty" label="Duty" variant="standard"
                               value={sheet.duty ?? ''} ref={x => this.dutyField = x}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth multiline id="livery" label="Livery" variant="standard"
                               value={sheet.livery ?? ''} ref={x => this.liveryField = x}/>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Autocomplete
                        multiple
                        id="religions" aria-required={true}
                        options={Religions}
                        getOptionLabel={(option) => option.title ?? ""}
                        defaultValue={Religions.filter(item => sheet.religions?.some(value => value.name === item.name))}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        onChange={(e, value?: any) => this.handleChange("religions", value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="Religions"
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField fullWidth multiline id="publicStory" label="Public Story" variant="filled"
                               value={sheet.publicStory} onChange={(e) => this.handleInputChange(e)}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth multiline id="privateStory" label="Private Story" variant="filled"
                               value={sheet.privateStory} onChange={(e) => this.handleInputChange(e)}/>
                </Grid>
            </Grid>
        </Box>;
    }
}

