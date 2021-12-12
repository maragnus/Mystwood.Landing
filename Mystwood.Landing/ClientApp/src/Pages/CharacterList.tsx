import * as React from "react";
import {
    Avatar,
    Box,
    Button,
    Chip,
    Container,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import CreateIcon from '@mui/icons-material/Create';
import {Link, useNavigate} from "react-router-dom";
import AwesomeSpinner from "../Common/AwesomeSpinner";
import sessionService, {CharacterSummary} from "../Session/SessionService";
import {useMountEffect} from "./UseMountEffect";

function CharacterItems(props: { characters: CharacterSummary[] }): any {
    const navigate = useNavigate();

    const handleNew = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate("/characters/new");
        return;
    }

    const items = props.characters.map((c, index) =>
        <ListItem key={index} secondaryAction={
            <Button startIcon={<CreateIcon/>} component={Link} to={`/characters/${c.id}/draft`}>
                Edit
            </Button>
        }>
            <ListItemButton component={Link} to={`/characters/${c.id}`}>
                <ListItemAvatar>
                    <Avatar>
                        <PersonIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={c.name}
                    secondary={(<Box>{c.summary} <Chip label={c.status}/></Box>)}
                />
            </ListItemButton>
        </ListItem>);

    return <List>
        {items}
        <ListItem key={10000}>
            <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
                onClick={handleNew}
            >
                Create New Character
            </Button>
        </ListItem>
    </List>;
}

export default function CharacterList() {
    const [busy, setBusy] = React.useState(true);
    const [characters, setCharacters] = React.useState<CharacterSummary[]>([]);

    useMountEffect(async () => {
        const characters = await sessionService.getCharacters();
        setCharacters(characters);
        setBusy(false);
    });

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" sx={{mt: 2}} align="center">Your Characters</Typography>
            {busy && <AwesomeSpinner/>}
            {!busy && <CharacterItems characters={characters}/>}
        </Container>
    );
}