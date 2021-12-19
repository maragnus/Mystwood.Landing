import * as React from "react";
import sessionService, {CharacterSummary} from "../Session/SessionService";
import {useMountEffect} from "../Pages/UseMountEffect";
import {
    Alert,
    Avatar, Box,
    Checkbox, Chip,
    Container, FormControlLabel, IconButton, InputBase, List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText, Paper,
    Typography
} from "@mui/material";
import AwesomeSpinner from "../Common/AwesomeSpinner";
import {Link, NavLink, useNavigate} from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import {CharacterStatus} from "../Session/Session";

function CharacterItems(props: { characters: CharacterSummary[] }): any {
    const items = props.characters.map((c, index) =>
        <ListItem key={index}>
            <ListItemButton component={Link} to={`/characters/${c.id}/manage`}>
                <ListItemAvatar>
                    <Avatar>
                        {c?.player?.match(/\b([A-Z])/gi)?.join('')}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={<span>{c.name} <Chip component="span" label={c.status}/></span>}
                    secondary={(
                        <span><strong>{c.player}</strong> ({c.summary})</span>)}
                />
            </ListItemButton>
        </ListItem>);

    if (items.length === 0) {
        items.push(<Alert severity="info">No players found</Alert>)
    }

    return <List>
        {items}
    </List>;
}

export default function CharacterSearch() {
    const navigate = useNavigate();
    const [busy, setBusy] = React.useState(true);
    const [characters, setCharacters] = React.useState<CharacterSummary[]>([]);
    const [query, setQuery] = React.useState<string>("");
    const [stateFilter, setStateFilter] = React.useState<CharacterStatus[]>([]);

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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let q: string = (data.get('q') as string ?? "").trim();
        const stateFilter: CharacterStatus[] = [];
        if (data.get('new') !== null) stateFilter.push(CharacterStatus.New);
        if (data.get('draft') !== null) stateFilter.push(CharacterStatus.Draft);
        if (data.get('review') !== null) stateFilter.push(CharacterStatus.Review);
        if (data.get('live') !== null) stateFilter.push(CharacterStatus.Live);

        setQuery(q.toUpperCase());
        setStateFilter(stateFilter);
    };

    const filteredCharacters =
        characters
            .filter(x => stateFilter.some(s => x.status === s))
            .filter(x => x.name.toUpperCase().includes(query)
                || x.player.toUpperCase().includes(query));

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" sx={{mt: 2}} align="center">Search Characters</Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <Paper sx={{mt: 4, p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%"}}>
                    <InputBase sx={{ml: 1, flex: 1}} placeholder="Search Characters" name="q" autoFocus/>
                    <IconButton type="submit" sx={{p: '10px'}} aria-label="search">
                        <SearchIcon/>
                    </IconButton>
                </Paper>
                <Box sx={{mt: 4, p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%"}}>
                    <FormControlLabel control={<Checkbox/>} label="New" name="new"/>
                    <FormControlLabel control={<Checkbox/>} label="Draft" name="draft"/>
                    <FormControlLabel control={<Checkbox defaultChecked/>} label="Review" name="review"/>
                    <FormControlLabel control={<Checkbox/>} label="Live" name="live"/>
                    <NavLink to="/characters/table">Table View</NavLink>
                </Box>
            </Box>
            {busy && <AwesomeSpinner/>}
            {!busy && <CharacterItems characters={filteredCharacters}/>}
        </Container>
    );
}