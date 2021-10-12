import React, {ChangeEvent} from 'react';
import {Box, Grid, TextField, Autocomplete} from "@mui/material";
import {CharacterEditorPropsBase} from "./CharacterEditorPropsBase";
import {Religions, HomeChapters, Occupations, Enhancements, Trait} from './CharacterSheet';

const occupationTypes = ["Youth", "Basic", "Advanced", "Plot"];

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
                        defaultValue={HomeChapters.find(item => item.name === props.sheet.home)}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        onChange={(e, value?: any) => handleChange("home", value?.name)}
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
                        options={Occupations.sort((a, b) => occupationTypes.indexOf(a.type ?? "") - occupationTypes.indexOf(b.type ?? ""))}
                        groupBy={(option) => option.type ?? ""}
                        getOptionLabel={(option) => option.title ?? ""}
                        defaultValue={Occupations.find(item => item.name === props.sheet.occupation)}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        onChange={(e, value?: any) => handleChange("occupation", value?.name)}
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
                        getOptionLabel={(option) => option.title ?? ""}
                        defaultValue={Enhancements.find(item => item.name === props.sheet.enhancement)}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        onChange={(e, value?: any) => handleChange("enhancement", value?.name)}
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
                        defaultValue={Religions.filter(item => props.sheet.religions?.some(value => value === item.name))}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        onChange={(e, value?: any) => handleChange("religions", value?.map((item: any) => item.name))}
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

