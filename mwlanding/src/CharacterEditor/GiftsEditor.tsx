import {Avatar, Box, Chip, Grid, Rating} from "@mui/material";
import * as React from "react";
import {CharacterSheet} from "../Reference/CharacterSheet";
import {CharacterEditorPage, CharacterEditorPageState} from "./CharacterEditorPage";

const GiftMap: { [name: string]: { label: string, color: string } } = {
    "courage": {label: "C", color: "#399BC6"},
    "dexterity": {label: "D", color: "#C66439"},
    "empathy": {label: "E", color: "#55C639"},
    "passion": {label: "Pa", color: "#C6399B"},
    "prowess": {label: "Pr", color: "#9BC639"},
    "wisdom": {label: "W", color: "#AA39C6"},
};

function GiftAvatar(props: { giftName: string, size?: number }): any {
    const giftProps = GiftMap[props.giftName.toLowerCase()];
    const sx: any = {
        bgcolor: giftProps.color,
        display: "inline-block",
    };
    if (props.size) {
        sx.width = props.size;
        sx.height = props.size;
    }

    return <Avatar sx={sx}>{giftProps.label}</Avatar>
}

type GiftEditorProps = {
    title: string;
    name: string;
    value: number;
    onChange: ((name: string, value: number) => void);
};

function GiftEditor(props: GiftEditorProps) {
    const name = props.name;
    let value = props.value;

    function handleChange(newValue: number) {
        value = newValue;
        props.onChange(name, newValue);
    }

    return <Box>
        <Box><GiftAvatar giftName={props.name} size={24}/> {props.title} {value}</Box>
        <Rating
            name={props.name}
            value={value}
            precision={1}
            max={10}
            onChange={(e, value?: any) => handleChange(value ?? 0)}
            getLabelText={(value: number) => `${value} Level${value !== 1 ? 's' : ''}`}
        />
    </Box>
}

export default class GiftsEditor extends CharacterEditorPage {
    afterChange(state: CharacterEditorPageState, name?: string, value?: string): void {
        CharacterSheet.populate(state.sheet);
    };

    render() {
        return <Box component="form">
            <Grid container spacing={2}>
                <Grid item md={6} lg={12}>
                    <Box>Starting Level: {this.state.sheet.startingLevel}</Box>
                    <Box>Current Level: {this.state.sheet.currentLevel}</Box>
                </Grid>
                <Grid item md={6} lg={12}>
                    <Box>Gift Moonstone Cost: {this.state.sheet.giftCost}</Box>
                    <Box>Total Moonstone Spent: {this.state.sheet.moonstoneSpent}</Box>
                </Grid>
                <Grid item xs={6} md={4}>
                    <GiftEditor title="Courage" name="courage" value={this.state.sheet.courage}
                                onChange={(name, value) => this.handleChange(name, value)}/>
                </Grid>
                <Grid item xs={6} md={4}>
                    <GiftEditor title="Dexterity" name="dexterity" value={this.state.sheet.dexterity}
                                onChange={(name, value) => this.handleChange(name, value)}/>
                </Grid>
                <Grid item xs={6} md={4}>
                    <GiftEditor title="Empathy" name="empathy" value={this.state.sheet.empathy}
                                onChange={(name, value) => this.handleChange(name, value)}/>
                </Grid>
                <Grid item xs={6} md={4}>
                    <GiftEditor title="Passion" name="passion" value={this.state.sheet.passion}
                                onChange={(name, value) => this.handleChange(name, value)}/>
                </Grid>
                <Grid item xs={6} md={4}>
                    <GiftEditor title="Prowess" name="prowess" value={this.state.sheet.prowess}
                                onChange={(name, value) => this.handleChange(name, value)}/>
                </Grid>
                <Grid item xs={6} md={4}>
                    <GiftEditor title="Wisdom" name="wisdom" value={this.state.sheet.wisdom}
                                onChange={(name, value) => this.handleChange(name, value)}/>
                </Grid>

                <Grid item lg={12}>
                    {this.state.sheet.abilities.map(ability => {
                        const gift = GiftMap[ability.source.toLowerCase()];

                        return <Chip label={ability.title} variant="outlined"
                                     avatar={<Avatar sx={{bgcolor: gift.color}}>{gift.label}</Avatar>}/>
                        // return <Chip label={ability.title} variant="outlined" avatar={<GiftAvatar giftName={ability.source} size={16} />}/>
                    })}
                </Grid>
            </Grid>
        </Box>;
    }
}