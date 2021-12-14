import * as React from 'react';
import {
    Alert,
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {CharacterEditorPage} from "./Common/CharacterEditorPage";

const fields: { name: string, title: string }[] = [
    "characterName",
    "religions",
    "occupation",
    "specialty",
    "enhancement",
    "homeChapter",
    "publicStory",
    "privateStory",

    // Editor - Gifts
    "courage",
    "dexterity",
    "empathy",
    "passion",
    "prowess",
    "wisdom",

    // Editor - Skills
    "purchasedSkills",
    "chosenSkills",
    "skillTokens",

    // Editor - Craft Skills
    "craftSkills",

    // Editor - (Dis)advantages
    "advantages",
    "disadvantages",

    // Editor - Spells
    "spells",

    // Editor - Other
    "flavorTraits",
    "unusualFeatures",
    "cures",
    "documents",
    "notes",
].map(n => ({name: n, title: n}))

export default class ReviewEditor extends CharacterEditorPage {
    render() {
        const oldSheet: any = this.props.originalSheet;
        const newSheet: any = this.props.sheet;

        function diff(props: { name: string, title: string }): ({ name: string, old: string, new: string, diff: string }) {
            const ov = oldSheet[props.name];
            const nv = newSheet[props.name];

            return {
                name: props.title,
                old: ov,
                new: nv,
                diff: ov === nv ? "none" : "diff"
            };
        }

        const rows = fields.map(f => diff(f));

        return <Box component="form">
            <Alert sx={{my: 4}} severity="info">
                Please carefully review your changes. Once you submit your draft for review, an administrator will review your changes.
            </Alert>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight:"bold"}}>Trait</TableCell>
                            <TableCell sx={{fontWeight:"bold"}}>Original</TableCell>
                            <TableCell sx={{fontWeight:"bold"}}>Difference</TableCell>
                            <TableCell sx={{fontWeight:"bold"}}>New</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .filter(row=>row.diff !== "none")
                            .map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row" sx={{fontWeight:"bold"}}>{row.name}</TableCell>
                                <TableCell>{row.old}</TableCell>
                                <TableCell>{row.diff}</TableCell>
                                <TableCell>{row.new}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Box>;
    }
}