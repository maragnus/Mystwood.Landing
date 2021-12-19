import * as React from "react";
import {Grid, Container} from "@mui/material";
import tree from '../tree.webp';
import {HomeChaptersByName} from "../Reference/HomeChapter";
import {ReligionByName} from "../Reference/Religion";
import {Star} from "@mui/icons-material";
import CharacterSheet from "../Reference/CharacterSheet";
import {useMountEffect} from "./UseMountEffect";
import sessionService from "../Session/SessionService";
import AwesomeSpinner from "../Common/AwesomeSpinner";
import {useNavigate} from "react-router-dom";

function Gift(params: { title: string, value: number }) {
    let i: number;
    const stars1: any[] = [];
    const stars2: any[] = [];
    for (i = 0; i < 5 && i < params.value; i++)
        stars1.push(<Star width="12%"/>);
    for (; i < params.value; i++)
        stars2.push(<Star/>);

    return (
        <Grid item lg={4} md={4} sm={6} xs={6}>
            <div style={{border: "1pt solid #777777", backgroundColor: "#f4f5f7", position: "relative"}}>
                <div style={{
                    position: "absolute", left: "0.5em", bottom: "-0.5em", width: "2em", height: "2em",
                    borderRadius: "50%", border: "1pt solid #777777", backgroundColor: "#ffffff", fontSize: "2em",
                    textAlign: "center", fontWeight: "bold", paddingTop: "0.2em", boxSizing: "border-box"
                }}>
                    {params.value}
                </div>
                <div style={{padding: "0.1em 0.5em", backgroundColor: "#ffffff", fontWeight: "bold"}}>
                    {params.title}
                </div>
                <div style={{paddingLeft: "40%", paddingTop: "0.5em", height: "4em", lineHeight: "1.5em"}}>
                    <div>{stars1}</div>
                    <div>{stars2}</div>
                </div>
            </div>
        </Grid>);
}

function Property(params: { title?: string, value: string | undefined }) {
    if (params.value === '-')
        return null;

    const value = params.value === undefined
        ? null
        : (<div style={{
            position: "absolute", right: "0.5em", bottom: "-0.5em", width: "1.75em", height: "1.75em",
            borderRadius: "50%", border: "1pt solid #777777", backgroundColor: "#ffffff", fontSize: "1em",
            textAlign: "center", fontWeight: "bold", paddingTop: "0.1em", boxSizing: "border-box"
        }}>
            {params.value}
        </div>);

    return (
        <Grid item xs={12}>
            <div style={{border: "1pt solid #777777", backgroundColor: "#ffffff", position: "relative"}}>
                {value}
                <div style={{padding: "0.25em 0.5em", fontWeight: "bold"}}>
                    {params.title}
                </div>
            </div>
        </Grid>);
}

function List(params: { title?: string, values: { title: string }[] }) {
    const items = (params.values.length === 0)
        ? [{title: "None"}]
        : params.values;

    return (
        <Grid item xs={12}>
            <div style={{
                border: "1pt solid #777777",
                backgroundColor: "#ffffff",
                position: "relative",
                paddingTop: "2em"
            }}>
                <div style={{
                    position: "absolute", left: "0.5em", top: "-0.5em",
                    border: "1pt solid #777777", backgroundColor: "#ffffff",
                    textAlign: "center", fontWeight: "bold", padding: "0.25em 0.5em", boxSizing: "border-box"
                }}>{params.title}</div>
                {items.map(x =>
                    (<div style={{padding: "0.25em 0.5em", fontWeight: "bold"}}>
                        {x.title}
                    </div>)
                )}
            </div>
        </Grid>);
}

function Block(params: { title?: string, text: string }) {
    const text = (params.text === "") ? "None" : params.text;

    return (
        <Grid item xs={12}>
            <div style={{
                border: "1pt solid #777777",
                backgroundColor: "#ffffff",
                position: "relative",
                paddingTop: "2em"
            }}>
                <div style={{
                    position: "absolute", left: "0.5em", top: "-0.5em",
                    border: "1pt solid #777777", backgroundColor: "#ffffff",
                    textAlign: "center", fontWeight: "bold", padding: "0.25em 0.5em", boxSizing: "border-box"
                }}>{params.title}</div>
                <div style={{padding: "0.25em 0.5em"}}>{text}</div>
            </div>
        </Grid>);
}

export default function CharacterView(params: { id?: string }) {
    const navigate = useNavigate();
    const [busy, setBusy] = React.useState(true);
    const [sheet, setSheet] = React.useState<CharacterSheet>({} as CharacterSheet);

    useMountEffect(async () => {
        try
        {
        const character = await sessionService.getCharacter(params.id!);
        let sheet = (character.live.characterName !== undefined)
            ? character.live  as CharacterSheet : character.draft as CharacterSheet;
        CharacterSheet.populate(sheet);
        setSheet(sheet);
        }
        catch (e) {
            alert(e);
            navigate("/login");
        }
        setBusy(false);
    });

    if (busy) {
        return (<AwesomeSpinner/>);
    }

    const homeChapter = HomeChaptersByName(sheet.homeChapter!).title;
    let religions = (sheet.religions ?? []).map(x => ReligionByName(x ?? "").title);
    if (religions.length === 0)
        religions = ["Not Religious"];

    const skills: { title: string, name: string, value: number }[] = [];
    sheet.skills.forEach(x => {
        let item = skills.find(s => s.name === x.name);
        if (item !== undefined)
            item.value += x.rank;
        else
            skills.push(item = {title: x.name, name: x.name, value: x.rank});
        if (item.value > 1)
            item.title = item.name + " " + item.value;
        else
            item.title = item.name;
    });

    return (
        <Container maxWidth="lg" style={{backgroundColor: "#f4f5f7"}}>
            <Grid container pt={2}>
                <Grid item>
                    <img src={tree} alt="Mystwood Logo"
                         style={{width: "auto", height: "4em", paddingRight: "1em"}}/>
                </Grid>
                <Grid item>
                    <div style={{fontSize: "1.75em"}}>
                        {sheet.characterName}
                    </div>
                    <div style={{fontSize: "1.2em"}}>
                        {homeChapter}, {sheet.specialty}, {religions.join(", ")}
                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={3} pt={2}>
                <Grid item container lg={8} md={12} spacing={3}>
                    <Gift title="Courage" value={sheet.courage}/>
                    <Gift title="Dexterity" value={sheet.dexterity}/>
                    <Gift title="Empathy" value={sheet.empathy}/>
                    <Gift title="Passion" value={sheet.passion}/>
                    <Gift title="Prowess" value={sheet.prowess}/>
                    <Gift title="Wisdom" value={sheet.wisdom}/>
                </Grid>
                <Grid item container lg={4} md={12} spacing={3}>
                    {sheet.properties.map(x => <Property title={x.name} value={x.value}/>)}
                </Grid>
            </Grid>
            <Grid container spacing={3} pt={4}>
                <Grid item lg={4} md={6} sm={12} xs={12} spacing={3}>
                    <List title="Abilities" values={sheet.abilities.map(x => ({title: x.title}))}/>
                </Grid>
                <Grid item lg={4} md={6} sm={12} xs={12} spacing={3}>
                    <List title="Skills" values={skills}/>
                </Grid>
                <Grid container item lg={4} md={12} xs={12} spacing={3}>
                    <Grid item lg={12} md={4} sm={12} xs={12}>
                        <List title="Advantages" values={sheet.advantages.map(x => ({title: x.name}))}/>
                    </Grid>
                    <Grid item lg={12} md={4} sm={12} xs={12}>
                        <List title="Disadvantages" values={sheet.disadvantages.map(x => ({title: x.name}))}/>
                    </Grid>
                    <Grid item lg={12} md={4} sm={12} xs={12}>
                        <Block title="Unusual Features" text={sheet.unusualFeatures}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={3} pt={4}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Block title="Cures" text={sheet.cures}/>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Block title="Documents" text={sheet.documents}/>
                </Grid>
            </Grid>
        </Container>
    );
}