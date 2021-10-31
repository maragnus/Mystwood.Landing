import CharacterSheet, {CharacterSkill, CharacterSkillChoice} from "../../Reference/CharacterSheet";
import {SkillByName, SkillClass, Skills} from "../../Reference/Skills";
import {Box, Chip, Paper, Stack, Typography} from "@mui/material";
import React from "react";
import {SkillList, SkillListItem} from "./SkillList";
import {CharacterEditorPage} from "../Common/CharacterEditorPage";


function SkillChip(props: { skill: CharacterSkill }) {
    const rank = props.skill.rank === 0 ? ""
        : ((SkillByName(props.skill.name).rank ?? 1) * props.skill.rank);

    return <Chip label={`${props.skill.name} ${rank}`}/>;
}


function SkillChoices(props: { skills: CharacterSkillChoice }) {
    const skills = props.skills.choices.map((skill, index) =>
        <SkillListItem key={index}>
            <SkillChip skill={skill}/>
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


export class SkillsSummary extends CharacterEditorPage {
    render() {
        CharacterSheet.populateSkills(this.state.sheet);

        const occupationSkills = this.state.sheet.occupationSkills;
        const occupationChoices = this.state.sheet.occupationSkillsChoices;
        const chosenSkills = this.state.sheet.chosenSkills;
        const purchasedSkills = this.state.sheet.purchasedSkills;

        const free = Skills.filter(s => s.class === SkillClass.Free)
            .map(s => ({name: s.name, rank: 0, source: "free"} as CharacterSkill))
            .map(skill => <SkillChip skill={skill}/>);

        const skills = occupationSkills.map(skill => <SkillChip skill={skill}/>);
        const choices = occupationChoices
            .map(choice => ({
                count: choice.count,
                choices: choice.choices.filter(i => chosenSkills.some(cs => cs.name === i.name))
            }))
            .map(choice => <SkillChoices skills={choice}/>);

        const purchased = purchasedSkills.map(skill => <SkillChip
            skill={{name: skill.name, rank: skill.purchasedRank, source: "purchased"}}/>);

        return <Box component="form">
            <Typography variant="h6" sx={{pt: 2}}>Free</Typography>
            <SkillList body={free}/>

            <Typography variant="h6" sx={{pt: 2}}>{this.state.sheet.occupation?.name}</Typography>
            <SkillList body={skills}/>
            {choices}

            <Typography variant="h6" sx={{pt: 2}}>Purchased</Typography>
            <SkillList body={purchased}/>
        </Box>;
    }
}