import React, {ChangeEvent} from 'react';
import {Autocomplete, Box, Grid, TextField} from "@mui/material";
import {CharacterEditorPropsBase} from "./CharacterEditorPropsBase";
import {HomeChapters, Religions} from '../Reference/CharacterSheet';
import {Enhancements, Occupations, OccupationType} from '../Reference/Occupations';

const occupationTypes: OccupationType[] = [OccupationType.Youth, OccupationType.Basic, OccupationType.Advanced, OccupationType.Plot];

export default function ProfileEditor(props: CharacterEditorPropsBase) {
    function handleInputChange(event: ChangeEvent) {
        const target: any = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.id;

        console.log(event);
        props.handleSheetChange({
            [name]: value
        })
    }

    function handleChange(name: string, value: string) {
        props.handleSheetChange({
            [name]: value
        })
    }

    return (
        <Box component="form">
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <TextField id="characterName"
                               fullWidth required aria-required={true}
                               label="Character Name"
                               defaultValue={props.sheet.characterName} variant="standard"
                               onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Autocomplete
                        id="home"
                        options={HomeChapters} aria-required={true}
                        getOptionLabel={(option) => option.title ?? ""}
                        defaultValue={HomeChapters.find(item => item.name === props.sheet.homeChapter?.name)}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        onChange={(e, value?: any) => handleChange("homeChapter", value)}
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
                        defaultValue={Occupations.find(item => item.name === props.sheet.occupation?.name)}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        onChange={(e, value?: any) => handleChange("occupation", value)}
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
                        defaultValue={Enhancements.find(item => item.name === props.sheet.enhancement?.name)}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        onChange={(e, value?: any) => handleChange("enhancement", value)}
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
                        defaultValue={Religions.filter(item => props.sheet.religions?.some(value => value.name === item.name))}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        onChange={(e, value?: any) => handleChange("religions", value)}
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
                               value={props.sheet.publicStory} onChange={handleInputChange}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth multiline id="privateStory" label="Private Story" variant="filled"
                               value={props.sheet.privateStory} onChange={handleInputChange}/>
                </Grid>
            </Grid>
        </Box>
    );
}

