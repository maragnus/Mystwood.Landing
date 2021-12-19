import * as React from "react";
import {
    Container,
    Typography,
} from "@mui/material";
import { useNavigate} from "react-router-dom";
import AwesomeSpinner from "../Common/AwesomeSpinner";
import sessionService, {CharacterSummary} from "../Session/SessionService";
import {useMountEffect} from "../Pages/UseMountEffect";
import {DataGrid} from "@mui/x-data-grid";

function CharacterItems(props: { characters: CharacterSummary[] }): any {
    const navigate = useNavigate();

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 50,
        },
        {
            field: 'name',
            headerName: 'Character Name',
            width: 200,
        },
        {
            field: 'player',
            headerName: 'Player Name',
            width: 150,
        },
        {
            field: 'summary',
            headerName: 'Summary',
            width: 250,
            type: 'singleSelect',
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 50,
        },
    ];


    return      <div style={{minHeight: "400px", width: '100%'}}>
        <DataGrid
            autoHeight
            rows={props.characters}
            columns={columns}
        />
    </div>;
}


export default function CharacterSearch() {
    const navigate = useNavigate();
    const [busy, setBusy] = React.useState(true);
    const [characters, setCharacters] = React.useState<CharacterSummary[]>([]);

    useMountEffect(async () => {
        try {
            const characters = await sessionService.searchCharacters("");
            setCharacters(characters);
        } catch (e) {
            alert(e);
            navigate("/login");
        }
        setBusy(false);
    });

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" sx={{mt: 2}} align="center">Characters</Typography>
            {busy && <AwesomeSpinner/>}
            {!busy && <CharacterItems characters={characters}/>}
        </Container>
    );
}