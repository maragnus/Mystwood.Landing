import {CharacterEditorPage} from "../CharacterEditorPage";
import {CharacterSheet, PurchasedSkill} from "../../Reference/CharacterSheet";
import {Skill, SkillByName, SkillRanks, Skills} from "../../Reference/Skills";
import {Autocomplete, Box, Chip, IconButton, TextField, Tooltip, Typography} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {SkillList} from "./SkillList";
import {Score} from "../Common/Score";

export enum SkillAction {
    Delete,
    Increase,
    Decrease
}

function PurchasedSkillChip(props: { skill: PurchasedSkill, changeSkill: (skill: PurchasedSkill, action: SkillAction) => void }) {
    let label: JSX.Element;

    const info = SkillByName(props.skill.name);

    if (info.ranks === SkillRanks.Once) {
        const rank = info.rank ?? 0;
        label = <Box>{props.skill.name} {rank <= 1 ? "" : rank}</Box>;
    } else { // SkillRanks.Multiple
        const rank = props.skill.purchasedRank * (info.rank ?? 1);
        label = <Box>{props.skill.name} {rank}
            <IconButton size="small" sx={{p: 0, ml: 2}}
                        onClick={() => props.changeSkill(props.skill, SkillAction.Increase)}>
                <AddIcon fontSize="inherit"/>
            </IconButton>
            <IconButton size="small" sx={{p: 0}} onClick={() => props.changeSkill(props.skill, SkillAction.Decrease)}
                        disabled={props.skill.purchasedRank <= 1}>
                <RemoveIcon fontSize="inherit"/>
            </IconButton>
        </Box>;
    }

    const count = props.skill.purchasedRank === 1
        ? `for ${info.cost ?? 0} moonstone`
        : `${props.skill.purchasedRank} times for ${info.cost ?? 0} moonstone each for a total of ${(info.cost ?? 0) * props.skill.purchasedRank} moonstone`;
    return <Tooltip title={`Purchased "${info.name}" ${count}`}>
        <Chip label={label} variant="outlined" onDelete={() => props.changeSkill(props.skill, SkillAction.Delete)}/>
    </Tooltip>;
}

export class PurchasedSkillsEditor extends CharacterEditorPage {
    render() {
        // Lazy state access
        const purchasedSkills = this.state.sheet.purchasedSkills;

        // Purchasable Skills
        const changeSkill = (skill: PurchasedSkill, action: SkillAction): void => {
            const newState = {...this.state};
            const newSkill = newState.sheet.purchasedSkills.find(i => i.name === skill.name);
            if (!newSkill) return;

            if (action === SkillAction.Delete) {
                newState.sheet.purchasedSkills = purchasedSkills.filter(i => i.name !== skill.name)
            } else if (action === SkillAction.Increase) {
                newSkill.purchasedRank += 1;
            } else if (action === SkillAction.Decrease) {
                newSkill.purchasedRank = Math.max(0, newSkill.purchasedRank - 1);
            }

            CharacterSheet.populateSkills(newState.sheet);

            this.setState(newState);
            this.handleChange("purchasedSkills", newState.sheet.purchasedSkills)
        };
        const addSkill = (skill: Skill): void => {
            const newState = {...this.state};

            newState.sheet.purchasedSkills.push({
                name: skill.name,
                purchasedRank: 1,
            });

            CharacterSheet.populateSkills(newState.sheet);

            this.setState(newState);
            this.handleChange("purchasedSkills", newState.sheet.purchasedSkills)
        };
        const purchased = purchasedSkills.map(skill => <PurchasedSkillChip skill={skill} changeSkill={changeSkill}/>);
        const purchasableSkills = Skills.filter(s => !purchasedSkills.some(p => p.name === s.name) && (s?.cost ?? 0) > 0);

        return <Box component="form">
            <Box sx={{p: 1.5, m: 2}}>
                <Box sx={{
                    display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
                }} component="div">
                    <Tooltip title="Number of skill purchases made" arrow>
                        <Score value={this.state.sheet.skillsPurchased} label="Skills"/>
                    </Tooltip>

                    <Tooltip title="This is the total Moonstone cost of all of your Purchased Skills" arrow>
                        <Score value={this.state.sheet.skillCost} label="Total"/>
                    </Tooltip>

                    <Tooltip title="This is the change to your Moonstone balance with all of your changes" arrow>
                        <Score value={this.state.sheet.moonstoneSpent - this.state.sheet.startingMoonstone}
                               label="Change" delta={true}/>
                    </Tooltip>
                </Box>
            </Box>
            <Typography variant="h6" sx={{pt: 2}}>Purchased</Typography>
            <Autocomplete
                id="skills"
                options={purchasableSkills}
                getOptionLabel={(option) => option.title + "   [" + option.class + ", " + option.cost + " MS, " + option.ranks + "]"}
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