import * as React from "react";
import {
    Avatar, Button, Container, Chip,
    List, ListItem, ListItemAvatar,
    ListItemButton, ListItemText, Typography, Box,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import CreateIcon from '@mui/icons-material/Create';
import {Link} from "react-router-dom";
import SessionContext from "../Session/SessionContext";
import {Character} from "../Session/Session";

function CharacterItems(props: { characters: Character[] }): any {
    const items = props.characters.map(c =>
        <ListItem key={c.id} secondaryAction={
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
                    secondary={(<Box>{c.subtitle} <Chip label={c.status}/></Box>)}
                />
            </ListItemButton>
        </ListItem>);

    return <List>{items}</List>;
}

export default function CharacterList() {
    return (
        <SessionContext.Consumer>
            {context => (
                <Container maxWidth="sm">
                    <Typography variant="h4" sx={{mt: 2}} align="center">Your Characters</Typography>
                    <CharacterItems characters={context.characters}/>
                </Container>
            )}
        </SessionContext.Consumer>
    );
}