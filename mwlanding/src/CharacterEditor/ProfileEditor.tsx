import React from 'react';
import {Autocomplete, Box, Grid, TextField} from "@mui/material";
import {HomeChapters, Religions} from '../Reference/CharacterSheet';
import {Enhancements, Occupations, OccupationType} from '../Reference/Occupations';
import {CharacterEditorPage} from "./CharacterEditorPage";

const occupationTypes: OccupationType[] = [OccupationType.Youth, OccupationType.Basic, OccupationType.Advanced, OccupationType.Plot];

export default class ProfileEditor extends CharacterEditorPage {
    render() {
        return <Box component="form">
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <TextField id="characterName"
                               fullWidth required aria-required={true}
                               label="Character Name"
                               defaultValue={this.state.sheet.characterName} variant="standard"
                               onChange={(e) => this.handleInputChange(e)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Autocomplete
                        id="home"
                        options={HomeChapters} aria-required={true}
                        getOptionLabel={(option) => option.title ?? ""}
                        defaultValue={HomeChapters.find(item => item.name === this.state.sheet.homeChapter?.name)}
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
                    <Autocomplete
                        id="occupation" aria-required={true}
                        options={Occupations.sort((a, b) => occupationTypes.indexOf(a.type) - occupationTypes.indexOf(b.type))}
                        groupBy={(option) => option.type as string}
                        getOptionLabel={(option) => option.name ?? ""}
                        defaultValue={Occupations.find(item => item.name === this.state.sheet.occupation?.name)}
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
                        id="enhancement"
                        options={Enhancements}
                        getOptionLabel={(option) => option.name ?? ""}
                        defaultValue={Enhancements.find(item => item.name === this.state.sheet.enhancement?.name)}
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
                        multiple
                        id="religions" aria-required={true}
                        options={Religions}
                        getOptionLabel={(option) => option.title ?? ""}
                        defaultValue={Religions.filter(item => this.state.sheet.religions?.some(value => value.name === item.name))}
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
                               value={this.state.sheet.publicStory} onChange={(e) => this.handleInputChange(e)}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth multiline id="privateStory" label="Private Story" variant="filled"
                               value={this.state.sheet.privateStory} onChange={(e) => this.handleInputChange(e)}/>
                </Grid>
            </Grid>
        </Box>;
    }
}

