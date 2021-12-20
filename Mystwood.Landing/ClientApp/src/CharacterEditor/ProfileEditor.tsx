import React from 'react';
import {Autocomplete, Box, Grid, TextField} from "@mui/material";
import CharacterSheet from '../Reference/CharacterSheet';
import {Enhancements, Occupations, OccupationType} from '../Reference/Occupations';
import {CharacterEditorPage, CharacterEditorPageState} from "./Common/CharacterEditorPage";
import {HomeChapters} from "../Reference/HomeChapter";
import {Religions} from "../Reference/Religion";

const occupationTypes: OccupationType[] = [OccupationType.Youth, OccupationType.Basic, OccupationType.Advanced, OccupationType.Plot];

export default class ProfileEditor extends CharacterEditorPage {
    dutyField: any;
    liveryField: any;
    specialtyField: any;

    afterChange(state: CharacterEditorPageState, name?: string, value?: string) {
        CharacterSheet.populateProfile(state.sheet);
    }

    render() {
        const sheet = this.state.sheet;

        return <Box component="form">
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <TextField id="characterName"
                               fullWidth required aria-required={true}
                               label="Character Name"
                               defaultValue={sheet.characterName} variant="standard"
                               onChange={(e) => this.handleInputChange(e)}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField id="homeland"
                               fullWidth required aria-required={true}
                               label="Homeland"
                               defaultValue={sheet.homeland} variant="standard"
                               onChange={(e) => this.handleInputChange(e)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Autocomplete
                        id="occupation" aria-required={true}
                        options={Occupations.sort((a, b) => occupationTypes.indexOf(a.type) - occupationTypes.indexOf(b.type))}
                        groupBy={(option) => option.type as string}
                        getOptionLabel={(option) => option.name ?? ""}
                        value={Occupations.find(item => item.name === sheet.occupation)}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        onChange={(e, value?: any) => this.handleChange("occupation", value.name)}
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
                        options={Enhancements.map(e => e.name)}
                        getOptionLabel={(option) => option ?? ""}
                        value={sheet.enhancement}
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
                        value={HomeChapters.find(item => item.name === sheet.homeChapter)}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        onChange={(e, value?: any) => this.handleChange("homeChapter", value.name)}
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
                        defaultValue={Religions.filter(item => sheet.religions?.some(value => value === item.name))}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        onChange={(e, value?: any) => this.handleChange("religions", value.map((x: any) => x.name))}
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

