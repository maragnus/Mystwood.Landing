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
import {Link, NavLink, useNavigate} from "react-router-dom";
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
                    secondary={(<Box component="span">{c.summary} <Chip component="span" label={c.status}/></Box>)}
                />
            </ListItemButton>
        </ListItem>);

    return <List>
        {items}
        <ListItem key={1000}>
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
        {sessionService.isAdmin() && <ListItem key={1001}>
            <Button
                type="button"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{mb: 2}}
                component={NavLink}
                to="/characters/search"
            >
                Manage Characters
            </Button>
        </ListItem>}
    </List>;
}

export default function CharacterList() {
    const navigate = useNavigate();
    const [busy, setBusy] = React.useState(true);
    const [characters, setCharacters] = React.useState<CharacterSummary[]>([]);

    useMountEffect(async () => {
        try {
            const characters = await sessionService.getCharacters();
            setCharacters(characters);
        }
        catch (e) {
            alert(e);
            navigate("/login");
        }
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