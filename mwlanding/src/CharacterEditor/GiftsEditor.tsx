import {Avatar, Box, Chip, Grid, IconButton, Rating, Stack, styled, Tooltip, Typography} from "@mui/material";
import * as React from "react";
import {CharacterAbility, CharacterProperty, CharacterSheet} from "../Reference/CharacterSheet";
import {CharacterEditorPage, CharacterEditorPageState} from "./CharacterEditorPage";
import CloseIcon from '@mui/icons-material/Close';

const GiftMap: { [name: string]: { label: string, color: string, name: string, title: string } } = {
    "courage": {label: "C", color: "#399BC6", name: "courage", title: "Courage"},
    "dexterity": {label: "D", color: "#C66439", name: "dexterity", title: "Dexterity"},
    "empathy": {label: "E", color: "#55C639", name: "empathy", title: "Empathy"},
    "passion": {label: "Pa", color: "#C6399B", name: "passion", title: "Passion"},
    "prowess": {label: "Pr", color: "#9BC639", name: "prowess", title: "Prowess"},
    "wisdom": {label: "W", color: "#AA39C6", name: "wisdom", title: "Wisdom"},
};

type GiftEditorProps = {
    title: string;
    name: string;
    value: number;
    onChange: ((name: string, value: number) => void);
};

// Rating Picker for a Gift
function GiftEditor(props: GiftEditorProps) {
    const name = props.name;
    let value = props.value;

    function handleChange(newValue: number) {
        value = newValue;
        props.onChange(name, newValue);
    }

    const gift = GiftMap[name.toLowerCase()];

    return <Box>
        <Stack direction="column" spacing={1} alignItems="center" justifyContent="center">
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                <Avatar sx={{bgcolor: gift.color, color: "#fff", width: 28, height: 28}}>{gift.label}</Avatar>
                <Typography variant="h6" display="block">{props.title} {value}</Typography>
            </Stack>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Rating
                    name={props.name}
                    value={value}
                    precision={1}
                    max={10}
                    onChange={(e, value?: any) => handleChange(value ?? 0)}
                    getLabelText={(value: number) => `${value} Level${value !== 1 ? 's' : ''}`}
                />
                <IconButton onClick={(e) => handleChange(0)}><CloseIcon/></IconButton>
            </Box>
        </Stack>
    </Box>
}

type GiftInfoProps = {
    name: string;
    abilities: CharacterAbility[];
    properties: CharacterProperty[];
};

const ListItem = styled('li')(({theme}) => ({
    margin: theme.spacing(0.5),
}));

// List of Abilities and Properties for a Gift
function GiftInfo(props: GiftInfoProps) {
    const abilities = props.abilities.filter(a => a.source === props.name);
    const properties = props.properties.filter(a => a.source === props.name);

    return <Stack direction="column">
        <Box sx={{display: 'flex', flexWrap: 'wrap', listStyle: 'none', p: 0.5, m: 0}} component="ul">
            {properties.map(property => {
                const label = <Stack direction="row" alignItems="center">{property.name} <Typography variant="subtitle1"
                                                                                                     sx={{pl: 1}}>{property.value}</Typography></Stack>;
                return <ListItem key={property.name}>
                    <Chip label={label} variant="outlined"/>
                </ListItem>
            })}

            {abilities.map(ability => {
                const label = <Stack direction="row" alignItems="center">{ability.title}</Stack>;
                return <ListItem key={ability.name}>
                    <Chip label={label}/>
                </ListItem>
            })}
        </Box>
    </Stack>;
}

// Displays a circled number with title
const Score = React.forwardRef(function Score(props: { label: string, value: number, delta?: boolean }, ref: any) {
    return <Box {...props}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 0.5,
                    px: 2
                }}
                component="div" ref={ref}>
        <Avatar>{props.delta && props.value >= 0 ? "+" + props.value : props.value}</Avatar>
        <Typography variant="h6">{props.label}</Typography>
    </Box>;
});

// The page for editing Gifts
export default class GiftsEditor extends CharacterEditorPage {
    afterChange(state: CharacterEditorPageState, name?: string, value?: string): void {
        CharacterSheet.populate(state.sheet);
    };

    render() {
        let displayInline: boolean = true;

        // Create all the gift editors
        const sheet: any = this.state.sheet;
        const gifts: any[] = Object.keys(GiftMap).map(key => {
            const gift = GiftMap[key];
            const info = !displayInline ? undefined :
                <GiftInfo name={gift.title} abilities={this.state.sheet.abilities}
                          properties={this.state.sheet.properties}/>;
            return <Grid item xs={6} md={4}>
                <GiftEditor title={gift.title} name={gift.name} value={sheet[gift.name]}
                            onChange={(name, value) => this.handleChange(name, value)}/>
                {info}
            </Grid>
        });

        // If {displayInline}, create the ability list
        const bottomAbilities = displayInline ? undefined :
            <Grid item md={12} lg={6}>
                <Typography variant="h6" display="block" gutterBottom={true}>Abilities</Typography>
                <Box sx={{display: 'flex', flexWrap: 'wrap', listStyle: 'none', p: 0.5, m: 0}} component="ul">
                    {this.state.sheet.abilities
                        .sort((a, b) => a.source < b.source ? -1 : 1)
                        .map(ability => {
                            const gift = GiftMap[ability.source.toLowerCase()];
                            const label = <Typography variant="subtitle1">{ability.title}</Typography>;
                            return <ListItem key={ability.name}><Chip label={label} variant="outlined"
                                                                      avatar={<Avatar
                                                                          sx={{bgcolor: gift.color, color: "#fff"}}><Box
                                                                          sx={{color: "#fff"}}>{gift.label}</Box></Avatar>}/>
                            </ListItem>
                        })}
                </Box>
            </Grid>;

        // If {displayInline}, create the property list
        const bottomProperties = displayInline ? undefined :
            <Grid item md={12} lg={6}>
                <Stack direction="column">
                    <Typography variant="h6" display="block" gutterBottom={true}>Properties</Typography>
                    <Box sx={{display: 'flex', flexWrap: 'wrap', listStyle: 'none', p: 0.5, m: 0}} component="ul">
                        {this.state.sheet.properties.map(property => {
                            const gift = GiftMap[property.source.toLowerCase()];
                            const label = <Stack direction="row" alignItems="center"><Typography variant="subtitle1"
                                                                                                 sx={{pr: 1}}>{property.name}</Typography>
                                <Typography variant="h6">{property.value}</Typography></Stack>;
                            return <ListItem key={property.name}>
                                <Chip label={label} variant="outlined"
                                      avatar={<Avatar sx={{bgcolor: gift.color, color: "#fff"}}><Box
                                          sx={{color: "#fff"}}>{gift.label}</Box></Avatar>}/>
                            </ListItem>
                        })}
                    </Box>
                </Stack>
            </Grid>;

        return <Box component="form">
            <Box sx={{p: 1.5, m: 2}}>
                <Box sx={{
                    display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
                }} component="div">

                    <Score value={this.state.sheet.currentLevel} label="Level"/>

                    <Tooltip title="This is the total Moonstone cost of all of your Gifts" arrow>
                        <Score value={this.state.sheet.giftCost} label="MS Cost"/>
                    </Tooltip>

                    <Tooltip title="This is the change to your Moonstone balance with all of your changes" arrow>
                        <Score value={this.state.sheet.startingMoonstone - this.state.sheet.moonstoneSpent}
                               label="MS Delta" delta={true}/>
                    </Tooltip>
                </Box>

                <Box>Your starting level is {this.state.sheet.startingLevel}</Box>
            </Box>
            <Grid container spacing={2}>
                {gifts}
                {bottomAbilities}
                {bottomProperties}
            </Grid>

        </Box>;
    }
}