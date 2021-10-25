import React from 'react';
import {Box, Chip, Stack, Paper, styled, Typography} from "@mui/material";
import {CharacterEditorPage} from "./CharacterEditorPage";
import {CharacterSheet, CharacterSkill, CharacterSkillChoice, PurchasedSkill} from "../Reference/CharacterSheet";

const ListItem = styled('li')(({theme}) => ({
    margin: theme.spacing(0.5),
}));

function SkillChip(props: { skill: CharacterSkill }) {
    return <Chip label={props.skill.name} variant="outlined"/>
}

function PurchasedSkillChip(props: { skill: PurchasedSkill }) {
    return <Chip label={props.skill.name} variant="outlined"/>
}

function SkillChoice(props: { skills: CharacterSkillChoice }) {
    const skills = props.skills.choices.map(skill => <ListItem key={skill.name}><SkillChip skill={skill}/></ListItem>);

    return (
        <Paper>
            <Stack direction="row" sx={{my: 1}} alignItems="center">
                <Box sx={{p: 1, whiteSpace: "nowrap"}}>
                    Choose {props.skills.count}:
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'left',
                        flexWrap: 'wrap',
                        listStyle: 'none',
                        p: 0.5,
                        m: 0,
                    }}
                    component="ul">
                    {skills}
                </Box>
            </Stack>
        </Paper>
    );
}


export default class SkillsEditor extends CharacterEditorPage {
    render() {
        CharacterSheet.populateSkills(this.state.sheet);

        const purchasedSkills = this.state.sheet.purchasedSkills;
        const occupationSkills = this.state.sheet.occupationSkills;
        const occupationChoices = this.state.sheet.occupationSkillsChoices;

        const skills = occupationSkills.map(skill => <SkillChip skill={skill}/>);
        const choices = occupationChoices.map(choice => <SkillChoice skills={choice}/>);
        const purchased = purchasedSkills.map(skill => <PurchasedSkillChip skill={skill}/>);

        return <Box component="form">
            <Typography variant="h6">{this.state.sheet.occupation?.name}</Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'left',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    p: 0.5,
                    mx: 0,
                    my: 2,
                }}
                component="ul">
                {skills}
            </Box>

            {choices}

            <Typography variant="h6">Purchased</Typography>
            {purchased}
        </Box>;
    }
}