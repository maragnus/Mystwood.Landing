import * as React from "react";
import {Typography, Box} from "@mui/material";
import {mockCharacters} from "../Session/Mocks";

export default function CharacterView(params: { id?: string }) {
    const character = mockCharacters()[parseInt(params.id ?? "0")];

    return (
        <Box>
            <Typography>{character.sheet.characterName}</Typography>


        </Box>
    );
}