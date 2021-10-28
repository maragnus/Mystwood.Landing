import {CharacterEditorPage} from "../CharacterEditorPage";
import {
    CharacterChosenSkill,
    CharacterSheet,
    CharacterSkill,
    CharacterSkillChoice
} from "../../Reference/CharacterSheet";
import {Box, Chip, Paper, Stack, Typography} from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {SkillList, SkillListItem} from "./SkillList";


function SkillChip(props: { skill: CharacterSkill, isFilled?: boolean }) {
    return <Chip label={props.skill.name} variant={props.isFilled ? undefined : "outlined"}/>;
}


function SkillChoice(props: { skill: CharacterSkill, isFilled?: boolean, toggleSkill: (skill: CharacterSkill) => void }) {
    const icon = props.isFilled ? <CheckCircleIcon/> : <RadioButtonUncheckedIcon/>;
    return <Chip onClick={() => props.toggleSkill(props.skill)}
                 label={props.skill.name} icon={icon}
                 variant={!props.isFilled ? undefined : "outlined"}/>
}


function SkillChoices(props: { skills: CharacterSkillChoice, toggleSkill: (skill: CharacterSkill) => void, isSkillChecked: (skill: CharacterSkill) => boolean }) {
    const skills = props.skills.choices.map((skill, index) =>
        <SkillListItem key={index}>
            <SkillChoice skill={skill} isFilled={props.isSkillChecked(skill)} toggleSkill={props.toggleSkill}/>
        </SkillListItem>);

    return (
        <Paper sx={{p: 1.5, mx: 0, my: 2}}>
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


export class OccupationSkillsEditor extends CharacterEditorPage {
    render() {
        CharacterSheet.populateSkills(this.state.sheet);

        const occupationSkills = this.state.sheet.occupationSkills;
        const occupationChoices = this.state.sheet.occupationSkillsChoices;
        const chosenSkills = this.state.sheet.chosenSkills;

        // Skill Choices
        const isSkillChecked = (skill: CharacterSkill): boolean => chosenSkills.some(i => i.name === skill.name);
        const toggleSkill = (skill: CharacterSkill) => {
            const newState = {...this.state};
            if (chosenSkills.some(i => i.name === skill.name))
                newState.sheet.chosenSkills = chosenSkills.filter(i => i.name !== skill.name)
            else
                newState.sheet.chosenSkills = [...chosenSkills, {name: skill.name} as CharacterChosenSkill];
            this.setState(newState);
            this.handleChange("chosenSkills", newState.sheet.chosenSkills)
        };

        const skills = occupationSkills.map(skill => <SkillChip skill={skill}/>);
        const choices = occupationChoices.map(choice => <SkillChoices skills={choice} isSkillChecked={isSkillChecked}
                                                                      toggleSkill={toggleSkill}/>);

        return <Box component="form">
            <Typography variant="h6" sx={{pt: 2}}>{this.state.sheet.occupation?.name}</Typography>
            <SkillList body={skills}/>
            {choices}
        </Box>;
    }
}