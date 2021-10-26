import React from 'react';
import {Autocomplete, Box, Chip, IconButton, Paper, Stack, styled, TextField, Typography} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {CharacterEditorPage} from "./CharacterEditorPage";
import {
    CharacterChosenSkill,
    CharacterSheet,
    CharacterSkill,
    CharacterSkillChoice,
    PurchasedSkill
} from "../Reference/CharacterSheet";
import {Skill, SkillClass, SkillRanks, Skills} from "../Reference/Skills";

const ListItem = styled('li')(({theme}) => ({
    margin: theme.spacing(0.5),
}));

function SkillChip(props: { skill: CharacterSkill, isFilled?: boolean }) {
    return <Chip label={props.skill.name} variant={props.isFilled ? undefined : "outlined"}/>;
}

enum SkillAction {
    Delete,
    Increase,
    Decrease
}

function PurchasedSkillChip(props: { skill: PurchasedSkill, changeSkill: (skill: PurchasedSkill, action: SkillAction) => void }) {
    let label: JSX.Element;

    if (props.skill.info.ranks === SkillRanks.Once) {
        label = <Box>{props.skill.name} {props.skill.rank === 0 ? "" : props.skill.rank}</Box>;
    } else { // SkillRanks.Multiple
        label = <Box>{props.skill.name} {props.skill.rank}
            <IconButton size="small" sx={{p: 0, ml: 2}}
                        onClick={() => props.changeSkill(props.skill, SkillAction.Increase)}>
                <AddIcon fontSize="inherit"/>
            </IconButton>
            <IconButton size="small" sx={{p: 0}} onClick={() => props.changeSkill(props.skill, SkillAction.Decrease)}
                        disabled={props.skill.rank === 1}>
                <RemoveIcon fontSize="inherit"/>
            </IconButton>
        </Box>;
    }

    return <Chip label={label} variant="outlined" onDelete={() => props.changeSkill(props.skill, SkillAction.Delete)}/>;
}

function SkillChoice(props: { skill: CharacterSkill, isFilled?: boolean, toggleSkill: (skill: CharacterSkill) => void }) {
    const icon = props.isFilled ? <CheckCircleIcon/> : <RadioButtonUncheckedIcon/>;
    return <Chip onClick={() => props.toggleSkill(props.skill)}
                 label={props.skill.name} icon={icon}
                 variant={!props.isFilled ? undefined : "outlined"}/>
}

function SkillChoices(props: { skills: CharacterSkillChoice, toggleSkill: (skill: CharacterSkill) => void, isSkillChecked: (skill: CharacterSkill) => boolean }) {
    const skills = props.skills.choices.map((skill, index) =>
        <ListItem key={index}>
            <SkillChoice skill={skill} isFilled={props.isSkillChecked(skill)} toggleSkill={props.toggleSkill}/>
        </ListItem>);

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

const SkillList = function (props: { body: any[] }) {
    return <Paper
        sx={{
            display: 'flex',
            justifyContent: 'left',
            flexWrap: 'wrap',
            listStyle: 'none',
            p: 1.5,
            mx: 0,
            my: 2,
        }}
        component="ul">
        {props.body.map((v, index) => <ListItem key={index}>{v}</ListItem>)}
    </Paper>
}

export default class SkillsEditor extends CharacterEditorPage {
    render() {
        CharacterSheet.populateSkills(this.state.sheet);

        // Lazy state access
        const purchasedSkills = this.state.sheet.purchasedSkills;
        const occupationSkills = this.state.sheet.occupationSkills;
        const occupationChoices = this.state.sheet.occupationSkillsChoices;
        const chosenSkills = this.state.sheet.chosenSkills;

        const free = Skills.filter(s => s.class === SkillClass.Free)
            .map(s => ({name: s.name, rank: 0, source: "free"} as CharacterSkill))
            .map(skill => <SkillChip skill={skill}/>);

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

        // Purchasable Skills
        const changeSkill = (skill: PurchasedSkill, action: SkillAction): void => {
            const newState = {...this.state};
            const newSkill = newState.sheet.purchasedSkills.find(i => i.name === skill.name);
            if (!newSkill) return;
            const info = Skills.find(s => s.name === skill.name);

            if (action === SkillAction.Delete) {
                newState.sheet.purchasedSkills = purchasedSkills.filter(i => i.name !== skill.name)
            } else if (action === SkillAction.Increase) {
                newSkill.rank += info?.rank ?? 1;
            } else if (action === SkillAction.Decrease) {
                newSkill.rank -= info?.rank ?? 1;
            }

            this.setState(newState);
            this.handleChange("purchasedSkills", newState.sheet.purchasedSkills)
        };
        const addSkill = (skill: Skill): void => {
            const newState = {...this.state};

            newState.sheet.purchasedSkills.push({
                name: skill.name,
                rank: skill.rank ?? 0,
                cost: skill.cost ?? 0,
                info: skill
            });

            this.setState(newState);
            this.handleChange("purchasedSkills", newState.sheet.purchasedSkills)
        };
        const purchased = purchasedSkills.map(skill => <PurchasedSkillChip skill={skill} changeSkill={changeSkill}/>);
        const purchasableSkills = Skills.filter(s => !purchasedSkills.some(p => p.name === s.name) && (s?.cost ?? 0) > 0);

        return <Box component="form">
            <Typography variant="h6" sx={{pt: 2}}>Free</Typography>
            <SkillList body={free}/>

            <Typography variant="h6" sx={{pt: 2}}>{this.state.sheet.occupation?.name}</Typography>
            <SkillList body={skills}/>
            {choices}

            <Typography variant="h6" sx={{pt: 2}}>Purchased</Typography>
            <Autocomplete
                id="skills"
                options={purchasableSkills}
                getOptionLabel={(option) => option.title + "   [" + option.class + ", " + option.cost + " MS, " + option.ranks + "]"}
                //isOptionEqualToValue={(option, value) => option.name === value.name}
                onChange={(e, value?: any) => addSkill(value as Skill)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Purchase New Skill"
                    />
                )}
            />

            <SkillList body={purchased}/>

        </Box>;
    }
}